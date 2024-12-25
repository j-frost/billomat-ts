import { Billomat } from './billomat.js';
import { BillomatResourceClient } from './billomat-resource-client.js';

export const BILLOMAT_RESOURCE_NAMES = [
    'activity-feed',
    'articles',
    'client-property-values',
    'clients',
    'confirmations',
    'countries',
    'contacts',
    'credit-notes',
    'currencies',
    'delivery-notes',
    'estimates',
    'incomings',
    'invoices',
    'letters',
    'recurrings',
    'reminders',
    'search',
    'suppliers',
    'users',
] as const;

export interface MappedBillomatResourceType {
    articles: Billomat.Article;
    'client-property-values': Billomat.ClientPropertyValue;
    clients: Billomat.Client;
    confirmations: Billomat.Confirmation;
    contacts: Billomat.Contact;
    invoices: Billomat.Invoice;

    [name: string]: Billomat.Resource;
}

export type RateLimitStatistics = {
        lastRequestAt: Date,
        limitRemaining: number,
        limitResetAt: Date,
}

export type BillomatApiClient = {
    [key in Billomat.ResourceName]: BillomatResourceClient<MappedBillomatResourceType[key]>;
} & {
    rateLimitStatistics: RateLimitStatistics;
};

export const getBillomatApiClient = (config: BillomatApiClientConfig): BillomatApiClient => {
    const rateLimitStatistics = { } as RateLimitStatistics;
    const updateRateLimitStatistics = (stats: RateLimitStatistics) => { // Function to update the rateLimit stats.
        rateLimitStatistics.lastRequestAt = stats.lastRequestAt;
        rateLimitStatistics.limitRemaining = stats.limitRemaining;
        rateLimitStatistics.limitResetAt = stats.limitResetAt;        
    };
    const api = { rateLimitStatistics } as BillomatApiClient; // because we're going to modify it right below
    for (const resource of BILLOMAT_RESOURCE_NAMES) {
        Object.defineProperty(api, resource, {
            get: () => {
                return new BillomatResourceClient<MappedBillomatResourceType[typeof resource]>(
                    config,
                    resource,
                    updateRateLimitStatistics,
                );
            },
        });
    }
    return api;
};

export interface BillomatApiClientConfig {
    baseUrl: string;
    apiKey: string;
    appSecret?: string;
    appId?: string;
}
