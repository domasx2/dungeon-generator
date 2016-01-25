"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Array2d = function () {
    function Array2d() {
        var size = arguments.length <= 0 || arguments[0] === undefined ? [0, 0] : arguments[0];
        var default_value = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, Array2d);

        this.rows = [];
        this.size = [];

        for (var y = 0; y < size[1]; y++) {
            var row = [];
            for (var x = 0; x < size[0]; x++) {
                row.push(default_value);
            }
            this.rows.push(row);
        }
    }

    _createClass(Array2d, [{
        key: "iter",
        value: function iter(callback, context) {
            for (var y = 0; y < size[1]; y++) {
                for (var x = 0; x < size[0]; x++) {
                    callback.apply(context, [[x, y], this.get([x, y])]);
                }
            }
        }
    }, {
        key: "get",
        value: function get(_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var x = _ref2[0];
            var y = _ref2[1];

            if (this.rows[y] === undefined) {
                return undefined;
            }
            return this.rows[y][x];
        }
    }, {
        key: "set",
        value: function set(_ref3, val) {
            var _ref4 = _slicedToArray(_ref3, 2);

            var x = _ref4[0];
            var y = _ref4[1];

            this.rows[y][x] = val;
        }
    }, {
        key: "set_horizontal_line",
        value: function set_horizontal_line(_ref5, delta_x, val) {
            var _ref6 = _slicedToArray(_ref5, 2);

            var start_x = _ref6[0];
            var start_y = _ref6[1];

            var c = Math.abs(delta_x),
                mod = delta_x < 0 ? -1 : 1;

            for (var x = 0; x <= c; x++) {
                this.set([pos[0] + x * mod, pos[1]], val);
            }
        }
    }, {
        key: "set_vertical_line",
        value: function set_vertical_line(_ref7, delta_y, val) {
            var _ref8 = _slicedToArray(_ref7, 2);

            var start_x = _ref8[0];
            var start_y = _ref8[1];

            var c = Math.abs(delta_y),
                mod = delta_y < 0 ? -1 : 1;

            for (var y = 0; y <= c; y++) {
                this.set([pos[0], pos[1] + y * mod], val);
            }
        }
    }, {
        key: "get_square",
        value: function get_square(_ref9, _ref10) {
            var _ref12 = _slicedToArray(_ref9, 2);

            var x = _ref12[0];
            var y = _ref12[1];

            var _ref11 = _slicedToArray(_ref10, 2);

            var size_x = _ref11[0];
            var size_y = _ref11[1];

            var retv = new Array2d([size_x, size_y]);
            for (var dx = 0; dx < size_x; dx++) {
                for (var dy = 0; dy < size_y; dy++) {
                    retv.set([dx, dy], this.get([x + dx, y + dy]));
                }
            }
            return retv;
        }
    }, {
        key: "set_square",
        value: function set_square(_ref13, _ref14, val) {
            var _ref16 = _slicedToArray(_ref13, 2);

            var x = _ref16[0];
            var y = _ref16[1];

            var _ref15 = _slicedToArray(_ref14, 2);

            var size_x = _ref15[0];
            var size_y = _ref15[1];
            var fill = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

            if (!fill) {
                this.line_h([x, y], size_x - 1, val);
                this.line_h([x, y + size_y - 1], size_x - 1, val);
                this.line_v([x, y], size_y - 1, val);
                this.line_v([x + size_x - 1, y], size_y - 1, val);
            } else {
                for (var dx = 0; dx < size_x; dx++) {
                    for (var dy = 0; dy < size_y; dy++) {
                        this.set([x + dx, y + dy], val);
                    }
                }
            }
        }
    }]);

    return Array2d;
}();

exports.default = Array2d;