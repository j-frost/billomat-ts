import request, { SuperAgentRequest } from 'superagent';
import { Billomat } from './billomat.js';
import { BillomatApiClientConfig } from './get-billomat-api-client.js';

export class BillomatResourceClient<T extends Billomat.Resource> {
    constructor(
        private _config: BillomatApiClientConfig,
        private _name: Billomat.ResourceName,
        private _updateRateLimitStatistics: (lastResponseAt:Date, limitRemaining:number, limitResetAt:Date) => void
    ) {
    }

    public list(query?: Record<string, string>): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.createAuthedRequest('GET', `api/${this._name}`)
                .query(query || {})
                .then((response) => {
                    this.updateRateLimitStatisticsFromHeaders(response.headers);
                    const singular = SINGULAR.get(this._name);
                    if (singular === undefined) {
                        reject('Unsupported resource (no singular defined)');
                        return;
                    }
                    if (!this.isListResponse(response.body)) {
                        reject(`Invalid list response: ${JSON.stringify(response.body)}`);
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
                    this.updateRateLimitStatisticsFromHeaders(response.headers);
                    const singular = SINGULAR.get(this._name);
                    if (singular === undefined) {
                        reject('Unsupported resource (no singular defined)');
                        return;
                    }
                    if (!this.isGetResponse(response.body)) {
                        reject(`Invalid get response: ${JSON.stringify(response.body)}`);
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
            const payload = {
                [singular]: resource,
            };
            this.createAuthedRequest('POST', `api/${this._name}`)
                .send(payload)
                .then((response) => {
                    this.updateRateLimitStatisticsFromHeaders(response.headers);
                    if (!this.isCreateResponse(response.body)) {
                        reject(`Invalid create response: ${JSON.stringify(response.body)}`);
                        return;
                    }
                    resolve(response.body[singular]);
                })
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
            const payload = {
                [singular]: resource,
            };
            this.createAuthedRequest('PUT', `api/${this._name}`)
                .send(payload)
                .then((response) => {
                    this.updateRateLimitStatisticsFromHeaders(response.headers);
                    if (!this.isEditResponse(response.body)) {
                        reject(`Invalid edit response: ${JSON.stringify(response.body)}`);
                        return;
                    }
                    resolve(response.body[singular]);
                })
                .catch(reject);
        });
    }

    public raw<TResult>(method: string, subUri?: string, options?: Billomat.RawOptions): Promise<TResult> {
        return new Promise((resolve, reject) => {
            const singular = SINGULAR.get(this._name);
            if (singular === undefined) {
                reject('Unsupported resource (no singular defined)');
                return;
            }

            const uri = `api/${this._name}${subUri ? `/${subUri}` : ''}`;
            let req = this.createAuthedRequest(method, uri).query(options?.query ?? {});

            if (options?.payload) {
                req = req.send(options.payload);
            }

            req.then((response) => {
                this.updateRateLimitStatisticsFromHeaders(response.headers);
                if (!this.isRawResponse(response.body)) {
                    reject(`Invalid response: ${JSON.stringify(response.body)}`);
                    return;
                }
                resolve(response.body as TResult);
            }).catch(reject);
        });
    }

    private isListResponse(o: unknown): o is Record<string, Record<string, T>> {
        return typeof o === 'object' && o !== null && this._name in o;
    }

    private isGetResponse(o: unknown): o is Record<string, T> {
        return typeof o === 'object' && o !== null;
    }

    private isCreateResponse(o: unknown): o is Record<string, T> {
        return typeof o === 'object' && o !== null;
    }

    private isEditResponse(o: unknown): o is Record<string, T> {
        return typeof o === 'object' && o !== null;
    }

    private isRawResponse(o: unknown): o is Record<string, T> {
        return typeof o === 'object' && o !== null;
    }

    private createAuthedRequest(method: string, endpoint: string): SuperAgentRequest {
        return request(method, `${this._config.baseUrl}/${endpoint}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('X-BillomatApiKey', this._config.apiKey)
            .set('X-AppId', this._config.appId || '')
            .set('X-AppSecret', this._config.appSecret || '');
    }

    private updateRateLimitStatisticsFromHeaders(headers: Record<string, string | undefined>): void {
        const limitRemaining = headers['x-rate-limit-remaining']
            ? parseInt(headers['x-rate-limit-remaining'], 10)
            : undefined;
        const limitResetAt = headers['x-rate-limit-reset']
            ? new Date(parseInt(headers['x-rate-limit-reset'], 10) * 1000)
            : undefined;
        const lastResponseAt = headers['date']
            ? new Date(headers['date'])
            : new Date();

        if (limitRemaining !== undefined && limitResetAt !== undefined) {
            this._updateRateLimitStatistics(
                lastResponseAt,
                limitRemaining,
                limitResetAt,
            );
        }
    }
}

const SINGULAR = new Map<Billomat.ResourceName, string>([
    ['activity-feed', 'activity'],
    ['articles', 'article'],
    ['clients', 'client'],
    ['client-property-values', 'client-property-value'],
    ['confirmations', 'confirmation'],
    ['countries', 'country'],
    ['contacts', 'contact'],
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
