'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iter_adjacent = iter_adjacent;
exports.iter_2d = iter_2d;
exports.iter_range = iter_range;
exports.intersects = intersects;
exports.array_test = array_test;
exports.add = add;
exports.shift = shift;
exports.shift_left = shift_left;
exports.shift_right = shift_right;

var _const = require('../const');

function iter_adjacent(_ref, cb) {
    var _ref2 = _slicedToArray(_ref, 2);

    var x = _ref2[0];
    var y = _ref2[1];

    cb([x - 1, y]);
    cb([x, y - 1]);
    cb([x + 1, y]);
    cb([x, y + 1]);
}

function iter_2d(size, callback) {
    for (var y = 0; y < size[1]; y++) {
        for (var x = 0; x < size[0]; x++) {
            callback([x, y]);
        }
    }
}

function iter_range(from, to, callback) {
    var fx = undefined,
        fy = undefined,
        tx = undefined,
        ty = undefined;
    if (from[0] < to[0]) {
        fx = from[0];
        tx = to[0];
    } else {
        fx = to[0];
        tx = from[0];
    };
    if (from[1] < to[1]) {
        fy = from[1];
        ty = to[1];
    } else {
        fy = to[1];
        ty = from[1];
    };
    for (var x = fx; x <= tx; x++) {
        for (var y = fy; y <= ty; y++) {
            callback([x, y]);
        }
    }
}

function intersects(pos_1, size_1, pos_2, size_2) {
    return !pos_2[0] > pos_1[0] + size_1[0] || pos_2[0] + size_2[0] < pos_1[0] || pos_2[1] > pos_1[1] + size_1[1] || pos_2[1] + size_2[1] < size_1[1];
}

function array_test(array, test) {
    for (var i = 0; i < array.length; i++) {
        if (test(array[i])) {
            return true;
        }
    }
    return false;
}

function add(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}

function shift(pos, facing) {
    return add(pos, _const.FACING_TO_MOD[facing]);
}

function shift_left(pos, facing) {
    return shift(pos, (facing - 90 + 360) % 360);
}

function shift_right(pos, facing) {
    return shift(pos, (facing + 90 + 360) % 360);
}