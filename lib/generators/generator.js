'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _random = require('../utils/random');

var _random2 = _interopRequireDefault(_random);

var _piece = require('../pieces/piece');

var _piece2 = _interopRequireDefault(_piece);

var _rectangle = require('../utils/rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _const = require('../const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = function (_Piece) {
    _inherits(Generator, _Piece);

    function Generator(options) {
        _classCallCheck(this, Generator);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Generator).call(this, options));

        _this.random = new _random2.default(_this.seed);

        _this.start_pos = [0, 0];
        _this.minx = _this.size[0];
        _this.maxx = 0;
        _this.miny = _this.size[1];
        _this.maxy = 0;
        return _this;
    }

    _createClass(Generator, [{
        key: 'add_piece',
        value: function add_piece(piece, position) {
            _get(Object.getPrototypeOf(Generator.prototype), 'add_piece', this).call(this, piece, position);

            this.minx = Math.min(this.minx, piece.position[0]);
            this.maxx = Math.max(this.maxx, piece.position[0] + piece.size[0]);

            this.miny = Math.min(this.miny, piece.position[1]);
            this.maxy = Math.max(this.maxy, piece.position[1] + piece.size[1]);
        }
    }, {
        key: 'trim',
        value: function trim() {
            var _this2 = this;

            this.size = [this.maxx - this.minx, this.maxy - this.miny];
            this.children.forEach(function (child) {
                child.position = [child.position[0] - _this2.minx, child.position[1] - _this2.miny];
            });

            this.start_pos = [this.start_pos[0] - this.minx, this.start_pos[1] - this.miny];
            this.walls = this.walls.get_square([this.minx, this.miny], this.size);

            this.minx = 0;
            this.maxx = this.size[0];

            this.miny = 0;
            this.maxy = this.size[1];
        }
    }, {
        key: 'generate',
        value: function generate() {
            throw new Error('not implemented');
        }
    }, {
        key: 'fits',
        value: function fits(piece, position) {
            var p = undefined,
                x = undefined,
                y = undefined;
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
    }, {
        key: 'join_exits',
        value: function join_exits(piece1, piece1_exit, piece2, piece2_exit) {
            /*
            register an exit with each piece, remove intersecting perimeter tiles
            */

            piece1.add_exit(piece1_exit, piece2);
            piece2.add_exit(piece2_exit, piece1);

            var ic = piece1.rect.intersection(piece2.rect);
            if (ic) {
                piece1.remove_perimeter(new _rectangle2.default(piece1.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
                piece2.remove_perimeter(new _rectangle2.default(piece2.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
            }
        }
    }, {
        key: 'join',
        value: function join(piece1, piece2_exit, piece2, piece1_exit) {
            /*
            join piece 1 to piece2 provided at least one exit.
            piece1 should already be placed
            */
            if (!piece1_exit) {
                piece1_exit = this.random.choose(piece1.get_perimeter_by_facing(_const.FACING_INVERSE[piece2_exit[1]]));
            }

            //global piece2 exit pos
            var piece2_exit_pos = piece1.parent_pos(piece1_exit[0]);

            //figure out piece2 position
            var piece2_pos = [piece2_exit_pos[0] - piece2_exit[0][0], piece2_exit_pos[1] - piece2_exit[0][1]];

            if (!this.fits(piece2, piece2_pos)) {
                return false;
            }

            this.join_exits(piece1, piece1_exit, piece2, piece2_exit);
            this.add_piece(piece2, piece2_pos);

            return true;
        }
    }, {
        key: 'get_open_pieces',
        value: function get_open_pieces(pieces) {
            //filter out pieces
            return pieces.filter(function (piece) {
                return piece.exits.length < piece.max_exits && piece.perimeter.length;
            });
        }
    }]);

    return Generator;
}(_piece2.default);

exports.default = Generator;