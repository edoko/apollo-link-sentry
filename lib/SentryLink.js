"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryLink = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@apollo/client/core");
var types_1 = require("@sentry/types");
var zen_observable_1 = tslib_1.__importDefault(require("zen-observable"));
var breadcrumb_1 = require("./breadcrumb");
var options_1 = require("./options");
var sentry_1 = require("./sentry");
var SentryLink = (function (_super) {
    tslib_1.__extends(SentryLink, _super);
    function SentryLink(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.options = options_1.withDefaults(options);
        return _this;
    }
    SentryLink.prototype.request = function (operation, forward) {
        var _this = this;
        if (typeof this.options.shouldHandleOperation === 'function') {
            if (!this.options.shouldHandleOperation(operation)) {
                return forward(operation);
            }
        }
        if (this.options.setTransaction) {
            sentry_1.setTransaction(operation);
        }
        if (this.options.setFingerprint) {
            sentry_1.setFingerprint(operation);
        }
        var breadcrumb = this.options.attachBreadcrumbs
            ? breadcrumb_1.makeBreadcrumb(operation, this.options)
            : undefined;
        return new zen_observable_1.default(function (originalObserver) {
            var subscription = forward(operation).subscribe({
                next: function (result) {
                    if (_this.options.attachBreadcrumbs) {
                        breadcrumb.level = severityForResult(result);
                        if (_this.options.attachBreadcrumbs.includeFetchResult) {
                            breadcrumb.data.fetchResult = result;
                        }
                    }
                    originalObserver.next(result);
                },
                complete: function () {
                    if (_this.options.attachBreadcrumbs) {
                        sentry_1.attachBreadcrumbToSentry(operation, breadcrumb, _this.options);
                    }
                    originalObserver.complete();
                },
                error: function (error) {
                    if (_this.options.attachBreadcrumbs) {
                        breadcrumb.level = types_1.Severity.Error;
                        var scrubbedError = void 0;
                        if (isServerError(error)) {
                            var result = error.result, response = error.response, rest = tslib_1.__rest(error, ["result", "response"]);
                            scrubbedError = rest;
                            if (_this.options.attachBreadcrumbs.includeFetchResult) {
                                breadcrumb.data.fetchResult = result;
                            }
                        }
                        else {
                            scrubbedError = error;
                        }
                        if (_this.options.attachBreadcrumbs.includeError) {
                            breadcrumb.data.error = scrubbedError;
                        }
                        sentry_1.attachBreadcrumbToSentry(operation, breadcrumb, _this.options);
                    }
                    originalObserver.error(error);
                },
            });
            return function () {
                subscription.unsubscribe();
            };
        });
    };
    return SentryLink;
}(core_1.ApolloLink));
exports.SentryLink = SentryLink;
function isServerError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        'result' in error &&
        'statusCode' in error);
}
function severityForResult(result) {
    return result.errors && result.errors.length > 0
        ? types_1.Severity.Error
        : types_1.Severity.Info;
}
//# sourceMappingURL=SentryLink.js.map