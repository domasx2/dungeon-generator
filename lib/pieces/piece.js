'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array2d = require('../utils/array2d');

var _array2d2 = _interopRequireDefault(_array2d);

var _rectangle = require('../utils/rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var next_piece_id = 0;

//base dungeon piece class, to be extended

var Piece = function () {
    function Piece(options) {
        _classCallCheck(this, Piece);

        options = Object.assign({
            size: [1, 1],
            position: [0, 0],
            parent: null,
            max_exits: 10,
            tag: ''
        }, options);

        Object.assign(this, options);

        this.options = options;

        this.id = next_piece_id++;
        this.walls = new _array2d2.default(this.size, true);
        this.perimeter = [];
        this.exits = [];
        this.children = [];
    }

    _createClass(Piece, [{
        key: 'is_exit',
        value: function is_exit(_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var x = _ref2[0];
            var y = _ref2[1];

            return this.exits.filter(function (_ref3) {
                var _ref4 = _toArray(_ref3);

                var exit_x = _ref4[0];
                var exit_y = _ref4[1];

                var rest = _ref4.slice(2);

                return exit_x === x && exit_y === y;
            }).length !== 0;
        }
    }, {
        key: 'get_non_wall_tiles',
        value: function get_non_wall_tiles() {
            var retv = [];
            this.walls.iter(function (pos, is_wall) {
                if (!is_wall) {
                    retv.push(pos);
                }
            });
            return retv;
        }
    }, {
        key: 'get_perimeter_by_facing',
        value: function get_perimeter_by_facing(facing) {
            return this.perimeter.filter(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2);

                var _ref6$ = _slicedToArray(_ref6[0], 2);

                var x = _ref6$[0];
                var y = _ref6$[1];
                var f = _ref6[1];

                return facing === f;
            });
        }
    }, {
        key: 'get_inner_perimeter',
        value: function get_inner_perimeter() {
            var _this = this;

            //returns array of tiles in the piece that are adjacent to a wall,
            // but not an exit;

            var retv = [],
                haswall = undefined,
                exit_adjacent = undefined;

            this.walls.iter(function (pos, is_wall) {
                if (!is_wall && !_this.is_exit(pos)) {
                    haswall = false;
                    exit_adjacent = false;
                    (0, _utils.iter_adjacent)(pos, function (p) {
                        haswall = haswall || _this.walls.get(p);
                        exit_adjacent = exit_adjacent || _this.is_exit(p);
                    });
                    if (haswall && !exit_adjacent) {
                        retv.push(pos);
                    }
                }
            });

            return retv;
        }

        //local position to parent position

    }, {
        key: 'parent_pos',
        value: function parent_pos(_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2);

            var x = _ref8[0];
            var y = _ref8[1];

            return [this.position[0] + x, this.position[1] + y];
        }

        //local position to global position

    }, {
        key: 'global_pos',
        value: function global_pos(pos) {
            pos = this.parent_pos(pos);
            if (this.parent) {
                pos = this.parent.global_pos(pos);
            }
            return pos;
        }

        //parent position to local position

    }, {
        key: 'local_pos',
        value: function local_pos(pos) {
            return [pos[0] - this.position[0], pos[1] - this.position[1]];
        }

        //get (roughly) center tile position for the piece
        // @TODO consider if should use Math.floor instead of Math.round

    }, {
        key: 'get_center_pos',
        value: function get_center_pos() {
            return [Math.floor(this.size[0] / 2), Math.floor(this.size[1] / 2)];
        }
    }, {
        key: 'add_perimeter',
        value: function add_perimeter(p_from, p_to, facing) {
            var _this2 = this;

            (0, _utils.iter_range)(p_from, p_to, function (pos) {
                _this2.perimeter.push([pos, facing]);
            });
        }
    }, {
        key: 'remove_perimeter',
        value: function remove_perimeter(rect) {
            this.perimeter = this.perimeter.filter(function (_ref9) {
                var _ref10 = _slicedToArray(_ref9, 3);

                var x = _ref10[0];
                var y = _ref10[1];
                var facing = _ref10[2];

                return !rect.contains(x, y, 1, 1);
            });
        }
    }, {
        key: 'intersects',
        value: function intersects(piece) {
            return (0, _utils.intersects)(this.position, this.size, piece.position, piece.size);
        }
    }, {
        key: 'add_piece',
        value: function add_piece(piece) {
            var position = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            if ((0, _utils.array_test)(this.children, function (c) {
                return c.id === piece.id;
            })) {
                return;
            }
            piece.parent = this;
            if (position) {
                piece.position = position;
            }
            this.children.push(piece);
            this.paste_in(piece);
        }
    }, {
        key: 'paste_in',
        value: function paste_in(piece) {
            var _this3 = this;

            (0, _utils.iter_2d)(piece.size, function (pos) {
                var is_wall = piece.walls.get(pos);
                if (!is_wall) {
                    _this3.walls.set(piece.parent_pos(pos), false);
                }
            });
        }
    }, {
        key: 'add_exit',
        value: function add_exit(exit, room) {
            this.walls.set(exit[0], false);
            if (this.parent) {
                this.parent.paste_in(this);
            }
            this.exits.push([exit[0], exit[1], room]);
        }
    }, {
        key: 'print',
        value: function print() {
            for (var y = 0; y < this.size[1]; y++) {
                var row = '';
                for (var x = 0; x < this.size[0]; x++) {
                    if (this.start_pos && this.start_pos[0] === x && this.start_pos[1] === y) {
                        row += 's';
                    } else {
                        row += this.walls.get([x, y]) ? 'x' : ' ';
                    }
                }
                console.log(row);
            }
        }
    }, {
        key: 'rect',
        get: function get() {
            return new _rectangle2.default(this.position[0], this.position[1], this.size[0], this.size[1]);
        }
    }]);

    return Piece;
}();

exports.default = Piece;