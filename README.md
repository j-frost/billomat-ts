# billomat-ts

![npm version](https://img.shields.io/npm/v/billomat-ts)
![npm bundle size](https://img.shields.io/bundlephobia/min/billomat-ts)
![GitHub repo size](https://img.shields.io/github/repo-size/seibert-media/billomat-ts)
![GitHub contributors](https://img.shields.io/github/contributors/seibert-media/billomat-ts)
![Twitter Follow](https://img.shields.io/twitter/follow/seibertmedia?style=social)
![License](https://img.shields.io/npm/l/billomat-ts)

`billomat-ts` is a library that allows TypeScript developers to connect to the popular online accounting software [Billomat](https://www.billomat.com/).

There's realistic mock data for the [client](https://www.billomat.com/en/api/clients/), [client property value](https://www.billomat.com/en/api/clients/properties/), [confirmations](https://www.billomat.com/en/api/confirmations/) and [invoice data](https://www.billomat.com/en/api/invoices/) types in Billomat's API. It follows that those data types are most likely to work as expected. All other data types are likely to work well though. If you want to contribute, please read [our contributing guidelines](CONTRIBUTING.md).

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of `node` and `npm`
* You have read Billomat's own documentation about their API
* [You have authentication information ready](https://www.billomat.com/en/api/basics/authentication/). [You'll likely want to configure an app inside of Billomat](https://www.billomat.com/en/api/basics/rate-limiting/). Make sure you have the base url to your Billomat instance, and an API key. If you go ahead an configure an app, you can also pass your app secret and app id into `billomat-ts`. 

## Installing `billomat-ts`

To install `billomat-ts`, simply run:

```bash
npm install billomat-ts
```

## Using `billomat-ts`

For information on how to use `billomat-ts`, have a look at this example:

```typescript
import { Billomat, getBillomatApiClient } from 'billomat-ts';
import { readFileSync } from 'fs';

const config   = JSON.parse(readFileSync('config.json', 'utf-8'));
const billomat = getBillomatApiClient(config);

billomat.clients.list()
    .then((clients: Billomat.Client[]) => clients
        .map((client: Billomat.Client) => client.name)
        .map((name) => console.log(name)))
    .catch(console.error);
```

`billomat-ts` currently supports `list`, `get`, `create`, and `edit` operations on all known data types. The `list` functions accept query arguments, etc. In case these methods don't satisfy your requirements, you can instead use the `raw` method to perform your own requests. 

## Contact

If you want to contact me you can reach me at jrost@seibert-media.net. Also feel free to open an issue if you find a bug or have a question.

## License

This project uses the [MIT](https://opensource.org/licenses/MIT) license.
