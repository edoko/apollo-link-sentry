"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachBreadcrumbToSentry = exports.setFingerprint = exports.DEFAULT_FINGERPRINT = exports.setTransaction = void 0;
var minimal_1 = require("@sentry/minimal");
var operation_1 = require("./operation");
var utils_1 = require("./utils");
function setTransaction(operation) {
    var definition = operation_1.extractDefinition(operation);
    var name = definition.name;
    if (name) {
        minimal_1.configureScope(function (scope) {
            scope.setTransactionName(name.value);
        });
    }
}
exports.setTransaction = setTransaction;
exports.DEFAULT_FINGERPRINT = '{{ default }}';
function setFingerprint(operation) {
    var definition = operation_1.extractDefinition(operation);
    var name = definition.name;
    if (name) {
        minimal_1.configureScope(function (scope) {
            scope.setFingerprint([exports.DEFAULT_FINGERPRINT, name.value]);
        });
    }
}
exports.setFingerprint = setFingerprint;
function attachBreadcrumbToSentry(operation, breadcrumb, options) {
    var transformed = options.attachBreadcrumbs &&
        typeof options.attachBreadcrumbs.transform === 'function'
        ? options.attachBreadcrumbs.transform(breadcrumb, operation)
        : breadcrumb;
    transformed.data = utils_1.stringifyObjectKeys(transformed.data);
    minimal_1.addBreadcrumb(transformed);
}
exports.attachBreadcrumbToSentry = attachBreadcrumbToSentry;
//# sourceMappingURL=sentry.js.map