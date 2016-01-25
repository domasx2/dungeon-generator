import {FACING_TO_MOD} from '../const';

export function iter_adjacent([x, y], cb) {
    cb([x - 1, y]);
    cb([x, y - 1]);
    cb([x + 1, y]);
    cb([x, y + 1]);
}

export function iter_2d(size, callback) {
    for (let y = 0; y < size[1]; y++) {
        for (let x =0; x < size[0]; x++) {
            callback([x, y]);
        }
    }
}

export function iter_range(from, to, callback) {
    let fx, fy, tx, ty;
    if(from[0]<to[0]){
        fx = from[0]; 
        tx = to[0];      
    } else {
        fx = to[0];
        tx = from[0];
    };
    if(from[1]<to[1]){
        fy = from[1]; 
        ty = to[1];      
    } else {
        fy = to[1];
        ty = from[1];
    };
    for(var x=fx;x<=tx;x++){
        for(var y=fy;y<=ty;y++){
            callback([x, y]);
        }
    } 
}

export function intersects(pos_1, size_1, pos_2, size_2) {
    return (!pos_2[0] > pos_1[0] + size_1[0] ||
            pos_2[0] + size_2[0] < pos_1[0] ||
            pos_2[1] > pos_1[1] + size_1[1] ||
            pos_2[1] + size_2[1] < size_1[1]);
}

export function array_test(array, test) {
    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            return true;
        }
    }
    return false;
}

export function add(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}

export function shift(pos, facing) {
    return add(pos, FACING_TO_MOD[facing]);
}

export function shift_left(pos, facing) {
    return shift(pos,(facing - 90 + 360) % 360);
}

export function shift_right(pos, facing) {
    return shift(pos, (facing + 90 + 360) % 360);
}