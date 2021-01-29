"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationBreadcrumb = void 0;
var types_1 = require("@sentry/types");
var utils_1 = require("./utils");
var OperationBreadcrumb = (function () {
    function OperationBreadcrumb() {
        var _this = this;
        this.setMessage = function (message) {
            _this.message = message;
            return _this;
        };
        this.setLevel = function (level) {
            _this.level = level;
            return _this;
        };
        this.setCategory = function (category) {
            _this.category = ("gql " + (category || '')).trim();
            return _this;
        };
        this.setType = function (type) {
            _this.type = type;
            return _this;
        };
        this.setQuery = function (query) {
            if (!query)
                return _this;
            _this.query = query;
            return _this;
        };
        this.setCache = function (cache) {
            if (utils_1.isEmpty(cache))
                return _this;
            _this.cache = utils_1.stringifyObject(cache);
            return _this;
        };
        this.setVariables = function (variables) {
            if (utils_1.isEmpty(variables))
                return _this;
            _this.variables = utils_1.stringifyObject(variables);
            return _this;
        };
        this.setContext = function (context) {
            if (utils_1.isEmpty(context))
                return _this;
            _this.context = utils_1.stringifyObject(context);
            return _this;
        };
        this.setResponse = function (response) {
            if (utils_1.isEmpty(response))
                return _this;
            _this.response = utils_1.stringifyObject(response);
            return _this;
        };
        this.setError = function (error) {
            if (utils_1.isEmpty(error))
                return _this;
            _this.error = utils_1.stringifyObject(error);
            return _this;
        };
        this.filter = function (toggle) {
            _this.filtered = !toggle;
            return !toggle;
        };
        this.flush = function () {
            _this.flushed = true;
            var _a = _this, message = _a.message, level = _a.level, category = _a.category, type = _a.type, query = _a.query, cache = _a.cache, variables = _a.variables, context = _a.context, error = _a.error, response = _a.response;
            var data = utils_1.trimObject({
                query: query,
                variables: variables,
                cache: cache,
                response: response,
                error: error,
                context: context,
            });
            var breadcrumb = {
                message: message,
                level: level,
                category: category,
                type: type,
            };
            if (!utils_1.isEmpty(data)) {
                breadcrumb.data = data;
            }
            return utils_1.trimObject(breadcrumb);
        };
        this.toString = function () { return utils_1.stringifyObject(_this); };
        this.filtered = false;
        this.flushed = false;
        this
            .setLevel(types_1.Severity.Log)
            .setCategory();
    }
    return OperationBreadcrumb;
}());
exports.OperationBreadcrumb = OperationBreadcrumb;
//# sourceMappingURL=OperationBreadcrumb.js.map