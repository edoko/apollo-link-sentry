import Observable from 'zen-observable';
import { FetchResult } from '@apollo/client/link/core/types';
import { ApolloLink, NextLink, Operation as ApolloOperation } from '@apollo/client/link/core';
import { OperationBreadcrumb } from './OperationBreadcrumb';
import { Operation } from './Operation';
export interface Options {
    setTransaction?: boolean;
    setFingerprint?: boolean;
    breadcrumb?: {
        enable?: boolean;
        includeQuery?: boolean;
        includeCache?: boolean;
        includeVariables?: boolean;
        includeResponse?: boolean;
        includeError?: boolean;
        includeContextKeys?: string[];
    };
    filter?: (operation: Operation) => boolean;
    beforeBreadcrumb?: (breadcrumb: OperationBreadcrumb) => OperationBreadcrumb;
}
export declare class SentryLink extends ApolloLink {
    private readonly options;
    constructor(options?: Options);
    request: (op: ApolloOperation, forward: NextLink) => Observable<FetchResult> | null;
    fillBreadcrumb: (breadcrumb: OperationBreadcrumb, operation: Operation) => void;
    handleResult: (result: FetchResult, breadcrumb: OperationBreadcrumb, observer: any) => void;
    handleError: (breadcrumb: OperationBreadcrumb, error: any, observer: any) => void;
    handleComplete: (breadcrumb: OperationBreadcrumb, observer: any) => void;
    setTransaction: (operation: Operation) => void;
    setFingerprint: () => void;
    attachBreadcrumbToSentry: (breadcrumb: OperationBreadcrumb) => void;
}
//# sourceMappingURL=SentryLink.d.ts.map