"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
var tslib_1 = require("tslib");
var dot_prop_1 = tslib_1.__importDefault(require("./dot-prop"));
var utils_1 = require("./utils");
var Operation = (function () {
    function Operation(operation) {
        var _this = this;
        this.getQuery = function () {
            var _a, _b;
            return (((_a = _this.operation.query.loc) === null || _a === void 0 ? void 0 : _a.source) ? (_b = _this.operation.query) === null || _b === void 0 ? void 0 : _b.loc.source.body : undefined);
        };
        this.getContextKeys = function (keys) {
            var context = _this.operation.getContext();
            var find = keys
                .map(function (key) {
                var _a;
                return (_a = {}, _a[key] = dot_prop_1.default.get(context, key), _a);
            })
                .reduce(function (a, b) { return (tslib_1.__assign(tslib_1.__assign({}, a), b)); }, {});
            return !utils_1.isEmpty(find)
                ? find
                : undefined;
        };
        this.operation = operation;
        this.name = this.getName();
        this.type = this.getType();
        this.cache = this.getApolloCache();
        this.variables = this.getVariables();
        this.query = this.getQuery();
    }
    Operation.prototype.getName = function () {
        return this.operation.operationName;
    };
    Operation.prototype.getType = function () {
        var query = this.operation.query;
        var definition = query.definitions[0];
        return definition.kind === 'OperationDefinition'
            ? definition.operation
            : undefined;
    };
    Operation.prototype.getApolloCache = function () {
        var _a, _b;
        var context = this.operation.getContext();
        var cache = (_b = (_a = context.cache) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data;
        return !utils_1.isEmpty(cache)
            ? cache
            : undefined;
    };
    Operation.prototype.getVariables = function () {
        var variables = this.operation.variables;
        return !utils_1.isEmpty(variables)
            ? variables
            : undefined;
    };
    return Operation;
}());
exports.Operation = Operation;
//# sourceMappingURL=Operation.js.map