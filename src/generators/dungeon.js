import Generator from './generator';
import Corridor from '../pieces/corridor';
import Room from '../pieces/room';
import {FACING} from '../const';
import {shift_left, shift_right, shift} from '../utils';

export default class Dungeon extends Generator {

    constructor(options) {
        options = Object.assign({}, {
            size: [100, 100],
            rooms: {
                initial: {
                    min_size: [3, 3],
                    max_size: [3, 3],
                    max_exits: 1
                },
                any: {
                    min_size: [2, 2],
                    max_size: [5, 5],
                    max_exits: 4
                }
            },
            max_corridor_length: 6,
            min_corridor_length: 2,
            corridor_density: 0.5, //corridors per room
            symmetric_rooms: false, // exits must be in the middle of walls
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not guaranteed
            max_interconnect_length: 10,
            room_count: 10
        }, options);

        super(options);

        this.room_tags = Object.keys(this.rooms).filter(tag => (tag !== 'any' && tag !== 'initial'));

        for (let i = this.room_tags.length; i < this.room_count; i++) {
            this.room_tags.push('any');
        }

        this.rooms = [];
        this.corridors = [];
    }

    add_room(room, exit, add_to_room=null) {
        let g_add_to_room = add_to_room;
        //add a new piece, exit is local perimeter pos for that exit;
        let choices, old_room, i = 0;
        while (true) {
            //pick a placed room to connect this piece to
            if (add_to_room) {
                old_room = add_to_room;
                add_to_room = null;
            } else {
                choices = this.get_open_pieces(this.children);
                if (choices && choices.length) {
                    old_room = this.random.choose(choices);
                } else {
                    console.log('ran out of choices connecting');
                    break;
                }
            }
            
            //if exit is specified, try joining  to this specific exit
            if (exit) {
                //try joining the rooms
                if (this.join(old_room, exit, room)) {
                    return true;
                }
            //else try all perims to see
            } else {
                let perim = room.perimeter.slice();
                while (perim.length) {
                    if (this.join(old_room, this.random.choose(perim, true), room)) {
                        return true;
                    }
                }
            }

            if (i++ === 100) {
                console.log('failed to connect 100 times :(', room, exit, g_add_to_room);
                return false;
            }
        }
    }

    new_corridor() {
        return new Corridor({
            length: this.random.int(this.min_corridor_length, this.max_corridor_length),
            facing: this.random.choose(FACING)
        });
    }

    add_interconnect() {
        let perims = {},
            hash, exit, p;

        //hash all possible exits
        this.children.forEach(child => {
            if (child.exits.length < child.max_exits) {
                child.perimeter.forEach(exit => {
                    p = child.parent_pos(exit[0]);
                    hash = `${p[0]}_${p[1]}`;
                    perims[hash] = [exit, child];
                });
            }
        });

        //search each room for a possible interconnect, backwards
        let room, mod, length, corridor, room2;
        for (let i = this.children.length - 1; i --; i >= 0) {
            room = this.children[i];

            //if room has exits available
            if (room.exits.length < room.max_exits) {
                
                //iterate exits
                for (let k = 0; k < room.perimeter.length; k++) {
                    exit = room.perimeter[k];
                    p = room.parent_pos(exit[0]);
                    length = -1;

                    //try to dig a tunnel from this exit and see if it hits anything
                    while (length <= this.max_interconnect_length) {
                        //check if space is not occupied
                        if (!this.walls.get(p) ||
                            !this.walls.get(shift_left(p, exit[1])) ||
                            !this.walls.get(shift_right(p, exit[1]))) {
                            break;
                        }
                        hash = `${p[0]}_${p[1]}`;

                        //is there a potential exit at these coordiantes (not of the same room)
                        if (perims[hash] && perims[hash][1].id !== room.id) {
                            room2 = perims[hash][1];

                            //rooms cant be joined directly, add a corridor
                            if (length > -1) {
                                corridor = new Corridor({
                                    length,
                                    facing: exit[1]
                                });

                                if (this.join(room, corridor.perimeter[0], corridor, exit)) {
                                    this.join_exits(room2, perims[hash][0], corridor, corridor.perimeter[corridor.perimeter.length - 1]);
                                    return true;
                                } else {
                                    return false;
                                }
                            //rooms can be joined directly
                            } else {
                                this.join_exits(room2, perims[hash][0], room, exit);
                                return true;
                            }
                        }

                        //exit not found, try to make the interconnect longer
                        p = shift(p, exit[1]);
                        length ++;
                    }
                }
            }
        }
    }

    new_room(key) {
        //spawn next room
        key = key || this.random.choose(this.room_tags, false);

        let opts = this.options.rooms[key];


        let room = new Room({
            size: this.random.vec(opts.min_size, opts.max_size),
            max_exits: opts.max_exits,
            symmetric: this.symmetric_rooms,
            tag: key
        });

        this.room_tags.splice(this.room_tags.indexOf(key), 1);

        if (key === 'initial') {
            this.initial_room = room;
        }
        return room;
    }

    generate() {
        let no_rooms = this.options.room_count - 1,
            room = this.new_room(this.options.rooms.initial ? 'initial' : undefined),
            no_corridors = Math.round(this.corridor_density * no_rooms);

        this.add_piece(room, this.options.rooms.initial && this.options.rooms.initial.position ? this.options.rooms.initial.position :  this.get_center_pos());

        let k;

        while (no_corridors || no_rooms) {
            k = this.random.int(1, no_rooms + no_corridors);
            if (k <= no_corridors) {
                let corridor = this.new_corridor();
                let added = this.add_room(corridor, corridor.perimeter[0]);
                no_corridors --;

                //try to connect to this corridor next
                if (no_rooms > 0 && added) {
                    this.add_room(this.new_room(), null, corridor);
                    no_rooms --;
                }

            } else {
                this.add_room(this.new_room());
                no_rooms --;
            }
        }

        for (k = 0; k < this.interconnects; k++) {
            this.add_interconnect();
        }

        this.trim();

        if (this.initial_room) {
            this.start_pos = this.initial_room.global_pos(this.initial_room.get_center_pos());
        }
    }
}