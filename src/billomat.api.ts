import {
    BillomatArticle,
    BillomatClient,
    BillomatClientPropertyValue,
    BillomatInvoice,
    BillomatResource,
    BillomatResourceName,
} from './billomat';
import { BillomatClientConfig } from './billomat-client';
import { BillomatResourceClient } from './billomat-resource-client';

export const BILLOMAT_RESOURCE_NAMES = [
    'activity-feed',
    'articles',
    'client-property-values',
    'clients',
    'confirmations',
    'countries',
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
    articles: BillomatArticle;
    'client-property-values': BillomatClientPropertyValue;
    clients: BillomatClient;
    invoices: BillomatInvoice;

    [name: string]: BillomatResource;
}

export type BillomatApiClient = { [key in BillomatResourceName]: BillomatResourceClient<MappedBillomatResourceType[key]> };

export function billomatApi(config: BillomatClientConfig): BillomatApiClient {
    const api = {} as BillomatApiClient; // because we're going to modify it right below
    for (const resource of BILLOMAT_RESOURCE_NAMES) {
        Object.defineProperty(api, resource, {
            get: () => {
                return new BillomatResourceClient<MappedBillomatResourceType[typeof resource]>(
                    config,
                    resource as BillomatResourceName,
                );
            },
        });
    }
    return api;
}
