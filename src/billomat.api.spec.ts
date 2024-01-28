// Since we'll be using meta programming extensively to abstract these tests, disable some of our linting rules.
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { expect } from 'chai';
import { readFile } from 'fs';
import nock from 'nock';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Billomat } from './billomat.js';
import { BILLOMAT_RESOURCE_NAMES, getBillomatApiClient } from './get-billomat-api-client.js';
import ResourceName = Billomat.ResourceName;

const modulePath = dirname(fileURLToPath(import.meta.url));

const SINGULAR_OF_RESOURCE = {
    'activity-feed': 'activity',
    articles: 'article',
    'client-property-values': 'client-property-value',
    clients: 'client',
    confirmations: 'confirmation',
    countries: 'country',
    contacts: 'contact',
    'credit-notes': 'credit-note',
    currencies: 'currency',
    'delivery-notes': 'delivery-note',
    estimates: 'estimate',
    incomings: 'incoming',
    invoices: 'invoice',
    letters: 'letter',
    recurrings: 'recurring',
    reminders: 'reminder',
    search: 'result',
    suppliers: 'supplier',
    users: 'user',
};

const isImplemented = (resourceName: ResourceName): boolean =>
    ['clients', 'client-property-values', 'confirmations', 'contacts', 'invoices'].includes(resourceName);

describe('Billomat API', () => {
    const api = getBillomatApiClient({ baseUrl: 'billomat.net', apiKey: 'a valid key' });
    const scope = nock(/billomat.net/);

    for (const resources of BILLOMAT_RESOURCE_NAMES.filter(isImplemented)) {
        const resource = SINGULAR_OF_RESOURCE[resources];

        describe(`GET ${resources}`, () => {
            describe('list', () => {
                let expectation: any[];

                beforeEach((done: Mocha.Done) => {
                    readFile(
                        resolve(modulePath, `./test-data/${resources}-list-response.json`),
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            const sample = JSON.parse(data) as Record<string, Record<string, any>>;
                            scope.get(new RegExp(`api/${resources}$`)).reply(200, sample);
                            const sampleValue = sample[resources][resource];
                            expectation = Array.isArray(sampleValue) ? sampleValue : [sampleValue];
                            done();
                        }
                    );
                });

                it(`retrieves a list of ${resources}`, (done: Mocha.Done) => {
                    api[resources]
                        .list()
                        .then((response) => {
                            expect(response).to.deep.equal(expectation);
                            done();
                        })
                        .catch((error) => done(error));
                });
            });

            describe('single', () => {
                let expectation: any;

                beforeEach((done: Mocha.Done) => {
                    readFile(
                        resolve(modulePath, `./test-data/${resources}-get-response.json`),
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            const sample = JSON.parse(data) as Record<string, any>;
                            scope
                                .get(new RegExp(`api/${resources}/${sample[resource].id as string}$`))
                                .reply(200, sample);
                            expectation = sample[resource];
                            done();
                        }
                    );
                });

                it(`retrieves an individual ${resource}`, (done: Mocha.Done) => {
                    api[resources]
                        .get(expectation.id)
                        .then((response) => {
                            expect(response).to.deep.equal(expectation);
                            done();
                        })
                        .catch((error) => done(error));
                });
            });
        });

        describe(`POST ${resources}`, () => {
            describe('create', () => {
                let expectation: any;

                beforeEach((done: Mocha.Done) => {
                    readFile(
                        resolve(modulePath, `./test-data/${resources}-create-response.json`),
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            const sample = JSON.parse(data);
                            scope.post(new RegExp(`api/${resources}`)).reply(201, sample);
                            expectation = sample[resource];
                            done();
                        }
                    );
                });

                it(`submits a request to create an individual ${resource}`, (done: Mocha.Done) => {
                    api[resources]
                        .create(expectation)
                        .then((response) => {
                            expect(response).to.deep.equal(expectation);
                            done();
                        })
                        .catch((error) => done(error));
                });
            });

            describe('edit', () => {
                let expectation: any;

                beforeEach((done: Mocha.Done) => {
                    readFile(
                        resolve(modulePath, `./test-data/${resources}-create-response.json`),
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            const sample = JSON.parse(data);
                            scope.put(new RegExp(`api/${resources}`)).reply(200, sample);
                            expectation = sample[resource];
                            done();
                        }
                    );
                });

                it(`submits a request to change an individual ${resource}`, (done: Mocha.Done) => {
                    api[resources]
                        .edit(expectation)
                        .then((response) => {
                            expect(response).to.deep.equal(expectation);
                            done();
                        })
                        .catch((error) => done(error));
                });
            });
        });
    }

    describe('when calling raw', () => {
        beforeEach(() => scope.get(new RegExp('api/invoices/1')).reply(200, { ok: 'yes' }));

        it('returns response body', (done: Mocha.Done) => {
            api['invoices']
                .raw('GET', '1')
                .then((response) => {
                    expect(response).to.deep.equal({ ok: 'yes' });
                    done();
                })
                .catch((error) => done(error));
        });
    });
});
