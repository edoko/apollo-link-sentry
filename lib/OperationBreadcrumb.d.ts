import { Breadcrumb as SentryBreadcrumb, Severity } from '@sentry/types';
export declare namespace Breadcrumb {
    type Category = 'query' | 'mutation' | 'subscription' | 'response' | 'error';
    interface Data extends SentryBreadcrumb {
        query?: string;
        variables?: string;
        cache?: string;
        response?: string;
        error?: string;
        context?: string;
    }
}
export declare class OperationBreadcrumb implements Breadcrumb.Data {
    filtered: boolean;
    flushed: boolean;
    message?: string;
    level?: Severity;
    category?: string;
    type?: string;
    query?: string;
    cache?: string;
    variables?: string;
    context?: string;
    response?: string;
    error?: string;
    constructor();
    setMessage: (message?: string | undefined) => OperationBreadcrumb;
    setLevel: (level: Severity) => OperationBreadcrumb;
    setCategory: (category?: "error" | "query" | "mutation" | "subscription" | "response" | undefined) => OperationBreadcrumb;
    setType: (type: string) => OperationBreadcrumb;
    setQuery: (query: string | undefined) => OperationBreadcrumb;
    setCache: (cache: object | undefined) => OperationBreadcrumb;
    setVariables: (variables: object | undefined) => OperationBreadcrumb;
    setContext: (context: object | undefined) => OperationBreadcrumb;
    setResponse: (response: object | undefined) => OperationBreadcrumb;
    setError: (error: any | undefined) => OperationBreadcrumb;
    filter: (toggle: boolean) => boolean;
    flush: () => Breadcrumb.Data;
    toString: () => string;
}
//# sourceMappingURL=OperationBreadcrumb.d.ts.map