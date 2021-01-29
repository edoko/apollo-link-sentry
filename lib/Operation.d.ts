import { Operation as ApolloOperation } from '@apollo/client/link/core';
export declare class Operation {
    private readonly operation;
    name: string;
    type: 'query' | 'mutation' | 'subscription' | undefined;
    cache: object | undefined;
    variables: object | undefined;
    query: string | undefined;
    constructor(operation: ApolloOperation);
    private getName;
    private getType;
    private getApolloCache;
    private getVariables;
    private getQuery;
    getContextKeys: (keys: string[]) => {
        [s: string]: any;
    } | undefined;
}
//# sourceMappingURL=Operation.d.ts.map