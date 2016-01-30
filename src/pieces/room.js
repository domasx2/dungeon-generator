import Piece from './piece';
import {iter_range} from '../utils';

export default class Room extends Piece {

    constructor(options) {
        /*
        note, size to be provided is size without walls.
        */
        options.room_size = options.size;
        options.size = [options.size[0] + 2, options.size[1] + 2];

        options = Object.assign({}, {
            symmetric: false //if true, 
        }, options);

        super(options);

        this.walls.set_square([1, 1], this.room_size, false, true);

        if (!this.symmetric) { //any point at any wall can be exit
            this.add_perimeter([1, 0], [this.size[0] - 2, 0], 180);
            this.add_perimeter([0, 1], [0, this.size[1] - 2], 90);
            this.add_perimeter([1, this.size[1] - 1], [this.size[0] - 2, this.size[1] - 1], 0);
            this.add_perimeter([this.size[0] - 1, 1], [this.size[0] - 1, this.size[1] - 2], 270);
        } else { //only middle of each wall can be exit
            let [w, h] = this.get_center_pos();

            this.perimeter = [
                [[w, 0], 180],
                [[this.size[0]-1, h], 270],
                [[w, this.size[1]-1], 0],
                [[0, h], 90]
            ];
        }
    }
}