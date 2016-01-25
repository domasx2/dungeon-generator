'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _randomSeed = require('random-seed');

var _randomSeed2 = _interopRequireDefault(_randomSeed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Random = function () {
    function Random(seed) {
        _classCallCheck(this, Random);

        this.rng = _randomSeed2.default.create(seed);
    }

    _createClass(Random, [{
        key: 'int',
        value: function int(min, max) {
            return this.rng.intBetween(min, max);
        }
    }, {
        key: 'float',
        value: function float() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            return this.rng.floatBetween(min, max);
        }
    }, {
        key: 'vec',
        value: function vec(min, max) {
            //min and max are vectors [int, int];
            //returns [min[0]<=x<=max[0], min[1]<=y<=max[1]]
            return [this.int(min[0], max[0]), this.int(min[1], max[1])];
        }
    }, {
        key: 'choose',
        value: function choose(items) {
            var remove = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var idx = this.rng.intBetween(0, items.length - 1);
            if (remove) {
                return items.splice(idx, 1)[0];
            } else {
                return items[idx];
            }
        }
    }, {
        key: 'maybe',
        value: function maybe(probability) {
            return this.float() <= probability;
        }
    }]);

    return Random;
}();

exports.default = Random;
;