"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBreadcrumb = void 0;
var tslib_1 = require("tslib");
var graphql_1 = require("graphql");
var dot_prop_1 = tslib_1.__importDefault(require("./dot-prop"));
var operation_1 = require("./operation");
function makeBreadcrumb(operation, options) {
    var _a, _b, _c, _d, _e, _f, _g;
    var attachBreadcrumbs = options.attachBreadcrumbs;
    var definition = operation_1.extractDefinition(operation);
    var data = {};
    var uri = options.uri;
    if (uri) {
        data.url = uri;
    }
    var operationName = (_a = definition.name) === null || _a === void 0 ? void 0 : _a.value;
    if (operationName) {
        data.operationName = operationName;
    }
    if (attachBreadcrumbs.includeQuery) {
        data.query = (_d = (_c = (_b = definition.loc) === null || _b === void 0 ? void 0 : _b.source) === null || _c === void 0 ? void 0 : _c.body) !== null && _d !== void 0 ? _d : graphql_1.print(definition);
    }
    if (attachBreadcrumbs.includeVariables) {
        data.variables = operation.variables;
    }
    if (attachBreadcrumbs.includeCache) {
        data.cache = (_g = (_f = (_e = operation.getContext().cache) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.data) !== null && _g !== void 0 ? _g : undefined;
    }
    var contextKeys = attachBreadcrumbs.includeContext;
    if (contextKeys) {
        data.context = extractKeys(operation.getContext(), contextKeys);
    }
    return {
        type: 'http',
        category: "graphql." + definition.operation,
        data: data,
    };
}
exports.makeBreadcrumb = makeBreadcrumb;
function extractKeys(context, keys) {
    var result = {};
    keys.forEach(function (key) {
        result[key] = dot_prop_1.default.get(context, key);
    });
    return result;
}
//# sourceMappingURL=breadcrumb.js.map