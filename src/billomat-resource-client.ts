import * as request from 'superagent';
import { SuperAgentRequest } from 'superagent';
import { BillomatResource, BillomatResourceName } from './billomat';
import { BillomatClientConfig } from './billomat-client';

export class BillomatResourceClient<T extends BillomatResource> {
    constructor(private _config: BillomatClientConfig, private _name: BillomatResourceName) {}

    public list(query?: { [key: string]: string }): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.createAuthedRequest('GET', `api/${this._name}`)
                .query(query || {})
                .then((response) => {
                    const singular = SINGULAR.get(this._name);
                    if (singular === undefined) {
                        reject('Unsupported resource (no singular defined)');
                        return;
                    }
                    const returnValue = response.body[this._name][singular] || [];
                    resolve(Array.isArray(returnValue) ? returnValue : [returnValue]); // because if exactly one result is found, this property will actually not be a JSON array
                })
                .catch(reject);
        });
    }

    public get(id: number): Promise<T> {
        return new Promise((resolve, reject) => {
            this.createAuthedRequest('GET', `api/${this._name}/${id}`)
                .then((response) => {
                    const singular = SINGULAR.get(this._name);
                    if (singular === undefined) {
                        reject('Unsupported resource (no singular defined)');
                        return;
                    }
                    resolve(response.body[singular]);
                })
                .catch(reject);
        });
    }

    public create(resource: T): Promise<T> {
        return new Promise((resolve, reject) => {
            const singular = SINGULAR.get(this._name);
            if (singular === undefined) {
                reject('Unsupported resource (no singular defined)');
                return;
            }
            const payload: any = {};
            payload[singular]  = resource;
            this.createAuthedRequest('POST', `api/${this._name}`)
                .send(payload)
                .then((response) => resolve(response.body[singular]))
                .catch(reject);
        });
    }

    public edit(resource: T): Promise<T> {
        return new Promise((resolve, reject) => {
            const singular = SINGULAR.get(this._name);
            if (singular === undefined) {
                reject('Unsupported resource (no singular defined)');
                return;
            }
            const payload: any = {};
            payload[singular]  = resource;
            this.createAuthedRequest('PUT', `api/${this._name}`)
                .send(payload)
                .then((response) => {
                    resolve(response.body[singular]);
                })
                .catch(reject);
        });
    }

    private createAuthedRequest(method: string, endpoint: string): SuperAgentRequest {
        return request(method, `${this._config.baseUrl}/${endpoint}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('X-BillomatApiKey', this._config.apiKey)
            .set('X-AppId', this._config.appId || '')
            .set('X-AppSecret', this._config.appSecret || '');
    }
}

const SINGULAR = new Map<BillomatResourceName, string>([
    ['activity-feed', 'activity'],
    ['articles', 'article'],
    ['clients', 'client'],
    ['client-property-values', 'client-property-value'],
    ['confirmations', 'confirmation'],
    ['countries', 'country'],
    ['credit-notes', 'credit-note'],
    ['currencies', 'currency'],
    ['delivery-notes', 'delivery-note'],
    ['estimates', 'estimate'],
    ['incomings', 'incoming'],
    ['invoices', 'invoice'],
    ['letters', 'letter'],
    ['recurrings', 'recurring'],
    ['reminders', 'reminder'],
    ['search', 'result'],
    ['suppliers', 'supplier'],
    ['users', 'user'],
]);
