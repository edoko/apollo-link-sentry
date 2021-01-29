"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimObject = exports.stringifyObject = exports.isEmpty = void 0;
var tslib_1 = require("tslib");
var isEmpty = function (target) { return (target == null || !(Object.keys(target) || target).length); };
exports.isEmpty = isEmpty;
var stringifyObject = function (target) { return (JSON.stringify(target, null, 2)); };
exports.stringifyObject = stringifyObject;
var trimObject = function (target) {
    if (exports.isEmpty(target))
        return {};
    return Object.keys(target)
        .filter(function (key) { return target === null || target === void 0 ? void 0 : target[key]; })
        .reduce(function (a, key) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, a), (_a = {}, _a[key] = target[key], _a)));
    }, {});
};
exports.trimObject = trimObject;
//# sourceMappingURL=utils.js.map