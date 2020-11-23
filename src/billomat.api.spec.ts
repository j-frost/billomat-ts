import { expect } from 'chai';
import * as fs from 'fs';
// @ts-ignore
import * as nock from 'nock';
import { BillomatResourceName } from './billomat';
import { BILLOMAT_RESOURCE_NAMES, billomatApi } from './billomat.api';

const SINGULAR_OF_RESOURCE = {
    'activity-feed':          'activity',
    articles:                 'article',
    'client-property-values': 'client-property-value',
    clients:                  'client',
    confirmations:            'confirmation',
    countries:                'country',
    'credit-notes':           'credit-note',
    currencies:               'currency',
    'delivery-notes':         'delivery-note',
    estimates:                'estimate',
    incomings:                'incoming',
    invoices:                 'invoice',
    letters:                  'letter',
    recurrings:               'recurring',
    reminders:                'reminder',
    search:                   'result',
    suppliers:                'supplier',
    users:                    'user',
};

describe('Billomat API', () => {
    const api   = billomatApi({ baseUrl: 'billomat.net', apiKey: 'a valid key' });
    const scope = nock(/billomat.net/);

    for (const resources of BILLOMAT_RESOURCE_NAMES.filter(isImplemented)) {
        const resource = SINGULAR_OF_RESOURCE[resources];

        describe(`GET ${resources}`, () => {
            describe('list', () => {
                let expectation: any[];

                beforeEach((done: Mocha.Done) => {
                    fs.readFile(require.resolve(`./test-data/${resources}-list-response.json`), 'utf8', (err, data) => {
                        if (err) throw err;
                        const sample = JSON.parse(data);
                        scope.get(new RegExp(`api/${resources}$`))
                            .reply(200, sample);
                        const sampleValue = sample[resources][resource];
                        expectation       = Array.isArray(sampleValue) ? sampleValue : [sampleValue];
                        done();
                    });
                });

                it(`retrieves a list of ${resources}`, (done: Mocha.Done) => {
                    api[resources].list()
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
                    fs.readFile(require.resolve(`./test-data/${resources}-get-response.json`), 'utf8', (err, data) => {
                        if (err) throw err;
                        const sample = JSON.parse(data);
                        scope.get(new RegExp(`api/${resources}/${sample[resource].id}$`))
                            .reply(200, sample);
                        expectation = sample[resource];
                        done();
                    });
                });

                it(`retrieves an individual ${resource}`, (done: Mocha.Done) => {
                    api[resources].get(expectation.id)
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
                    fs.readFile(
                        require.resolve(`./test-data/${resources}-create-response.json`),
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            const sample = JSON.parse(data);
                            scope.post(new RegExp(`api/${resources}`))
                                .reply(201, sample);
                            expectation = sample[resource];
                            done();
                        },
                    );
                });

                it(`submits a request to create an individual ${resource}`, (done: Mocha.Done) => {
                    api[resources].create(expectation)
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
                    fs.readFile(
                        require.resolve(`./test-data/${resources}-create-response.json`),
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            const sample = JSON.parse(data);
                            scope.put(new RegExp(`api/${resources}`))
                                .reply(200, sample);
                            expectation = sample[resource];
                            done();
                        },
                    );
                });

                it(`submits a request to change an individual ${resource}`, (done: Mocha.Done) => {
                    api[resources].edit(expectation)
                        .then((response) => {
                            expect(response).to.deep.equal(expectation);
                            done();
                        })
                        .catch((error) => done(error));
                });
            });
        });
    }
});

function isImplemented(resourceName: BillomatResourceName): boolean {
    return [
        'clients',
        'client-property-values',
        'invoices',
        'users',
    ].includes(resourceName);
}
