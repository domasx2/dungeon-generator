'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _piece = require('./piece');

var _piece2 = _interopRequireDefault(_piece);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function (_Piece) {
    _inherits(Room, _Piece);

    function Room(options) {
        _classCallCheck(this, Room);

        /*
        note, size to be provided is size without walls.
        */
        options.room_size = options.size;
        options.size = [options.size[0] + 2, options.size[1] + 2];

        options = Object.assign({}, {
            symmetric: false //if true,
        }, options);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Room).call(this, options));

        _this.walls.set_square([1, 1], _this.room_size, false, true);

        if (!_this.symmetric) {
            //any point at any wall can be exit
            _this.add_perimeter([1, 0], [_this.size[0] - 2, 0], 180);
            _this.add_perimeter([0, 1], [0, _this.size[1] - 2], 90);
            _this.add_perimeter([1, _this.size[1] - 1], [_this.size[0] - 2, _this.size[1] - 1], 0);
            _this.add_perimeter([_this.size[0] - 1, 1], [_this.size[0] - 1, _this.size[1] - 2], 270);
        } else {
            //only middle of each wall can be exit

            var _this$get_center_pos = _this.get_center_pos();

            var _this$get_center_pos2 = _slicedToArray(_this$get_center_pos, 2);

            var w = _this$get_center_pos2[0];
            var h = _this$get_center_pos2[1];

            _this.perimeter = [[[w, 0], 180], [[_this.size[0] - 1, h], 270], [[w, _this.size[1] - 1], 0], [[0, h], 90]];
        }
        return _this;
    }

    return Room;
}(_piece2.default);

exports.default = Room;