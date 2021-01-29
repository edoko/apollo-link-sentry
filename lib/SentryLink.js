"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryLink = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@sentry/types");
var deepmerge_1 = tslib_1.__importDefault(require("deepmerge"));
var zen_observable_1 = tslib_1.__importDefault(require("zen-observable"));
var core_1 = require("@apollo/client/link/core");
var minimal_1 = require("@sentry/minimal");
var OperationBreadcrumb_1 = require("./OperationBreadcrumb");
var Operation_1 = require("./Operation");
var defaultOptions = {
    setTransaction: true,
    setFingerprint: true,
    breadcrumb: {
        enable: true,
        includeQuery: false,
        includeCache: false,
        includeVariables: false,
        includeResponse: false,
        includeError: false,
        includeContextKeys: [],
    },
};
var SentryLink = (function (_super) {
    tslib_1.__extends(SentryLink, _super);
    function SentryLink(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.request = function (op, forward) {
            var operation = new Operation_1.Operation(op);
            var breadcrumb = new OperationBreadcrumb_1.OperationBreadcrumb();
            _this.fillBreadcrumb(breadcrumb, operation);
            return new zen_observable_1.default(function (observer) {
                var subscription = forward(op).subscribe({
                    next: function (result) { return _this.handleResult(result, breadcrumb, observer); },
                    complete: function () { return _this.handleComplete(breadcrumb, observer); },
                    error: function (error) { return _this.handleError(breadcrumb, error, observer); },
                });
                return function () {
                    if (subscription)
                        subscription.unsubscribe();
                };
            });
        };
        _this.fillBreadcrumb = function (breadcrumb, operation) {
            var _a, _b, _c, _d, _e, _f;
            if (typeof _this.options.filter === 'function') {
                var stop_1 = breadcrumb.filter(_this.options.filter(operation));
                if (stop_1)
                    return;
            }
            breadcrumb
                .setMessage(operation.name)
                .setCategory(operation.type);
            if (_this.options.setTransaction) {
                _this.setTransaction(operation);
            }
            if (_this.options.setFingerprint) {
                _this.setFingerprint();
            }
            if ((_a = _this.options.breadcrumb) === null || _a === void 0 ? void 0 : _a.includeQuery) {
                breadcrumb.setQuery(operation.query);
            }
            if ((_b = _this.options.breadcrumb) === null || _b === void 0 ? void 0 : _b.includeCache) {
                breadcrumb.setCache(operation.cache);
            }
            if ((_c = _this.options.breadcrumb) === null || _c === void 0 ? void 0 : _c.includeVariables) {
                breadcrumb.setVariables(operation.variables);
            }
            if ((_f = (_e = (_d = _this.options) === null || _d === void 0 ? void 0 : _d.breadcrumb) === null || _e === void 0 ? void 0 : _e.includeContextKeys) === null || _f === void 0 ? void 0 : _f.length) {
                breadcrumb.setContext(operation.getContextKeys(_this.options.breadcrumb.includeContextKeys));
            }
        };
        _this.handleResult = function (result, breadcrumb, observer) {
            var _a;
            if ((_a = _this.options.breadcrumb) === null || _a === void 0 ? void 0 : _a.includeResponse) {
                breadcrumb.setResponse(result);
            }
            observer.next(result);
        };
        _this.handleError = function (breadcrumb, error, observer) {
            var _a;
            breadcrumb
                .setLevel(types_1.Severity.Error)
                .setType('error');
            if ((_a = _this.options.breadcrumb) === null || _a === void 0 ? void 0 : _a.includeError) {
                breadcrumb.setError(error);
            }
            _this.attachBreadcrumbToSentry(breadcrumb);
            observer.error(error);
        };
        _this.handleComplete = function (breadcrumb, observer) {
            _this.attachBreadcrumbToSentry(breadcrumb);
            observer.complete();
        };
        _this.setTransaction = function (operation) {
            minimal_1.configureScope(function (scope) {
                scope.setTransactionName(operation.name);
            });
        };
        _this.setFingerprint = function () {
            minimal_1.configureScope(function (scope) {
                scope.setFingerprint([
                    '{{default}}',
                    '{{transaction}}',
                ]);
            });
        };
        _this.attachBreadcrumbToSentry = function (breadcrumb) {
            var _a;
            if (((_a = _this.options.breadcrumb) === null || _a === void 0 ? void 0 : _a.enable) === false)
                return;
            if (breadcrumb.filtered)
                return;
            if (breadcrumb.flushed) {
                console.warn('[apollo-link-sentry] SentryLink.attachBreadcrumbToSentry() was called on an already flushed breadcrumb');
                return;
            }
            if (typeof _this.options.beforeBreadcrumb === 'function') {
                var after = _this.options.beforeBreadcrumb(breadcrumb);
                minimal_1.addBreadcrumb(after.flush());
                return;
            }
            minimal_1.addBreadcrumb(breadcrumb.flush());
        };
        _this.options = deepmerge_1.default(defaultOptions, options);
        return _this;
    }
    return SentryLink;
}(core_1.ApolloLink));
exports.SentryLink = SentryLink;
//# sourceMappingURL=SentryLink.js.map