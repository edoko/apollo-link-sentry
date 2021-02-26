"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefaults = exports.defaultOptions = void 0;
var tslib_1 = require("tslib");
var deepmerge_1 = tslib_1.__importDefault(require("deepmerge"));
exports.defaultOptions = {
    shouldHandleOperation: undefined,
    uri: undefined,
    setTransaction: true,
    setFingerprint: true,
    attachBreadcrumbs: {
        includeQuery: false,
        includeVariables: false,
        includeFetchResult: false,
        includeError: false,
        includeCache: false,
        includeContext: false,
        transform: undefined,
    },
};
function withDefaults(options) {
    return deepmerge_1.default(exports.defaultOptions, options);
}
exports.withDefaults = withDefaults;
//# sourceMappingURL=options.js.map