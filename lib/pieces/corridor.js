'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Corridor = function (_Room) {
    _inherits(Corridor, _Room);

    function Corridor(options) {
        _classCallCheck(this, Corridor);

        options = Object.assign({}, {
            length: 2,
            facing: 0,
            max_exits: 4
        }, options);

        options.size = options.facing === 0 || options.facing === 180 ? [1, options.length] : [options.length, 1];

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Corridor).call(this, options));

        var w = _this.size[0] - 1;
        var h = _this.size[1] - 1;

        //special perimeter: allow only 4 exit points, to keep this corridor corridor-like..
        if (_this.facing === 180) _this.perimeter = [[[1, h], 0], [[0, 1], 90], [[2, 1], 270], [[1, 0], 180]];else if (_this.facing === 270) _this.perimeter = [[[0, 1], 90], [[w - 1, 0], 180], [[w - 1, 2], 0], [[w, 1], 270]];else if (_this.facing === 0) _this.perimeter = [[[1, 0], 180], [[2, h - 1], 270], [[0, h - 1], 90], [[1, h], 0]];else if (_this.facing === 90) _this.perimeter = [[[w, 1], 270], [[1, 2], 0], [[1, 0], 180], [[0, 1], 90]];
        return _this;
    }

    return Corridor;
}(_room2.default);

exports.default = Corridor;