import { Billomat } from './billomat';
import { BillomatResourceClient } from './billomat-resource-client';

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
    'invoice-items',
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
    'invoice-items': Billomat.InvoiceItem;

    [name: string]: Billomat.Resource;
}

export type BillomatApiClient = {
    [key in Billomat.ResourceName]: BillomatResourceClient<MappedBillomatResourceType[key]>;
};

export const getBillomatApiClient = (config: BillomatApiClientConfig): BillomatApiClient => {
    const api = {} as BillomatApiClient; // because we're going to modify it right below
    for (const resource of BILLOMAT_RESOURCE_NAMES) {
        Object.defineProperty(api, resource, {
            get: () => {
                return new BillomatResourceClient<MappedBillomatResourceType[typeof resource]>(
                    config,
                    resource
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
