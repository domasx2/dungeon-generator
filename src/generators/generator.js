import Random from '../utils/random';
import Piece from '../pieces/piece';
import Rectangle from '../utils/rectangle';
import {FACING_INVERSE} from '../const';

export default class Generator extends Piece {

    constructor(options) {
        super(options);

        this.random = new Random(this.seed);

        this.start_pos = [0, 0];
        this.minx = this.size[0];
        this.maxx = 0;
        this.miny = this.size[1];
        this.maxy = 0;
    }

    add_piece(piece, position) {
        super.add_piece(piece, position);

        this.minx = Math.min(this.minx, piece.position[0]);
        this.maxx = Math.max(this.maxx, piece.position[0] + piece.size[0]);

        this.miny = Math.min(this.miny, piece.position[1]);
        this.maxy = Math.max(this.maxy, piece.position[1] + piece.size[1]);
    }

    trim() {
        this.size = [this.maxx - this.minx, this.maxy - this.miny];
        this.children.forEach(child => {
            child.position = [child.position[0] - this.minx, child.position[1] - this.miny];
        });

        this.start_pos = [this.start_pos[0] - this.minx, this.start_pos[1] - this.miny];
        this.walls = this.walls.get_square([this.minx, this.miny], this.size);

        this.minx = 0;
        this.maxx = this.size[0];

        this.miny = 0;
        this.maxy = this.size[1];
    }

    generate() {
        throw new Error('not implemented');
    }

    fits(piece, position) {
        let p, x, y;
        for (x = 0; x < piece.size[0]; x++) {
            for (y = 0; y < piece.size[1]; y++) {
                p = this.walls.get([position[0] + x, position[1] + y]);
                if (p === false || p === null || p === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    join_exits(piece1, piece1_exit, piece2, piece2_exit) {
        /*
        register an exit with each piece, remove intersecting perimeter tiles
        */
        
        piece1.add_exit(piece1_exit, piece2);
        piece2.add_exit(piece2_exit, piece1);

        let ic = piece1.rect.intersection(piece2.rect);
        if (ic) {
            piece1.remove_perimeter(new Rectangle(piece1.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
            piece2.remove_perimeter(new Rectangle(piece2.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
        }
    }

    join(piece1, piece2_exit, piece2, piece1_exit) {
        /*
        join piece 1 to piece2 provided at least one exit.
        piece1 should already be placed
        */
        if (!piece1_exit) {
            piece1_exit = this.random.choose(piece1.get_perimeter_by_facing(FACING_INVERSE[piece2_exit[1]]));
        }

        //global piece2 exit pos
        let piece2_exit_pos = piece1.parent_pos(piece1_exit[0]);

        //figure out piece2 position
        let piece2_pos = [
            piece2_exit_pos[0] - piece2_exit[0][0],
            piece2_exit_pos[1] - piece2_exit[0][1]
        ];

        if (!this.fits(piece2, piece2_pos)) {
            return false;
        }

        this.join_exits(piece1, piece1_exit, piece2, piece2_exit);
        this.add_piece(piece2, piece2_pos);

        return true;
    }

    get_open_pieces(pieces) {
        //filter out pieces
        return pieces.filter(piece => {
            return piece.exits.length < piece.max_exits && piece.perimeter.length;
        });
    }
}