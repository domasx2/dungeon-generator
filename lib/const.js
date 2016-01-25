'use strict';

var _FACING_TO_STRING, _FACING_TO_MOD, _FACING_INVERSE, _FACING_MOD_RIGHT, _FACING_MOD_LEFT;

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOP = exports.TOP = 0;
var RIGHT = exports.RIGHT = 90;
var BOTTOM = exports.BOTTOM = 180;
var LEFT = exports.LEFT = 270;

var FACING = exports.FACING = [TOP, RIGHT, BOTTOM, LEFT];

var FACING_TO_STRING = exports.FACING_TO_STRING = (_FACING_TO_STRING = {}, _defineProperty(_FACING_TO_STRING, TOP, 'top'), _defineProperty(_FACING_TO_STRING, RIGHT, 'right'), _defineProperty(_FACING_TO_STRING, BOTTOM, 'bottom'), _defineProperty(_FACING_TO_STRING, LEFT, 'left'), _FACING_TO_STRING);

var FACING_TO_MOD = exports.FACING_TO_MOD = (_FACING_TO_MOD = {}, _defineProperty(_FACING_TO_MOD, TOP, [0, -1]), _defineProperty(_FACING_TO_MOD, RIGHT, [1, 0]), _defineProperty(_FACING_TO_MOD, BOTTOM, [0, 1]), _defineProperty(_FACING_TO_MOD, LEFT, [-1, 0]), _FACING_TO_MOD);

var FACING_INVERSE = exports.FACING_INVERSE = (_FACING_INVERSE = {}, _defineProperty(_FACING_INVERSE, TOP, BOTTOM), _defineProperty(_FACING_INVERSE, RIGHT, LEFT), _defineProperty(_FACING_INVERSE, BOTTOM, TOP), _defineProperty(_FACING_INVERSE, LEFT, RIGHT), _FACING_INVERSE);

var FACING_MOD_RIGHT = exports.FACING_MOD_RIGHT = (_FACING_MOD_RIGHT = {}, _defineProperty(_FACING_MOD_RIGHT, TOP, RIGHT), _defineProperty(_FACING_MOD_RIGHT, RIGHT, BOTTOM), _defineProperty(_FACING_MOD_RIGHT, BOTTOM, LEFT), _defineProperty(_FACING_MOD_RIGHT, LEFT, TOP), _FACING_MOD_RIGHT);

var FACING_MOD_LEFT = exports.FACING_MOD_LEFT = (_FACING_MOD_LEFT = {}, _defineProperty(_FACING_MOD_LEFT, TOP, LEFT), _defineProperty(_FACING_MOD_LEFT, RIGHT, TOP), _defineProperty(_FACING_MOD_LEFT, BOTTOM, RIGHT), _defineProperty(_FACING_MOD_LEFT, LEFT, BOTTOM), _FACING_MOD_LEFT);