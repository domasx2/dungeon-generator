import Room from './room';

export default class Corridor extends Room {

    constructor(options) {
        options = Object.assign({}, {
            length: 2,
            facing: 0,
            max_exits: 4
        }, options);

        options.size = (options.facing === 0 || options.facing === 180) ? [1, options.length] : [options.length, 1];

        super(options);

        var w = this.size[0] - 1;
        var h = this.size[1] - 1;
        
        //special perimeter: allow only 4 exit points, to keep this corridor corridor-like..
        if (this.facing === 180) this.perimeter = [      [[1, h],   0], [[0, 1],    90], [[2, 1],   270], [[1, 0], 180] ];
        else if (this.facing === 270) this.perimeter = [ [[0, 1],  90], [[w-1, 0], 180], [[w-1, 2],   0], [[w, 1], 270] ];
        else if (this.facing === 0) this.perimeter = [   [[1, 0], 180], [[2, h-1], 270], [[0, h-1],  90], [[1, h],   0] ];
        else if (this.facing === 90) this.perimeter = [  [[w, 1], 270], [[1, 2],     0], [[1, 0],   180], [[0, 1],  90] ];
    }
}