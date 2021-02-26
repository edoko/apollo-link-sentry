import { Operation } from '@apollo/client/core';
import { Breadcrumb } from '@sentry/types';
import { GraphQLBreadcrumb } from './breadcrumb';
export declare type NonEmptyArray<T> = [T, ...Array<T>];
export interface FullOptions {
    shouldHandleOperation: undefined | ((operation: Operation) => boolean);
    uri: undefined | string;
    setTransaction: true | false;
    setFingerprint: true | false;
    attachBreadcrumbs: AttachBreadcrumbsOptions | false;
}
export declare type AttachBreadcrumbsOptions = {
    includeQuery: false | true;
    includeVariables: false | true;
    includeFetchResult: false | true;
    includeError: false | true;
    includeCache: false | true;
    includeContext: false | NonEmptyArray<string>;
    transform: undefined | ((breadcrumb: GraphQLBreadcrumb, operation: Operation) => Breadcrumb);
};
export declare const defaultOptions: {
    readonly shouldHandleOperation: undefined;
    readonly uri: undefined;
    readonly setTransaction: true;
    readonly setFingerprint: true;
    readonly attachBreadcrumbs: {
        readonly includeQuery: false;
        readonly includeVariables: false;
        readonly includeFetchResult: false;
        readonly includeError: false;
        readonly includeCache: false;
        readonly includeContext: false;
        readonly transform: undefined;
    };
};
export declare function withDefaults(options: SentryLinkOptions): FullOptions;
export declare type SentryLinkOptions = Partial<Pick<FullOptions, 'shouldHandleOperation' | 'uri' | 'setTransaction' | 'setFingerprint'>> & {
    attachBreadcrumbs?: Partial<AttachBreadcrumbsOptions> | false;
};
//# sourceMappingURL=options.d.ts.map