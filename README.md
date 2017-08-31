# browser-storage-db

[![Build Status](https://travis-ci.org/mprzodala/browser-storage-db.svg?branch=master)](https://travis-ci.org/mprzodala/browser-storage-db)
[![Coverage Status](https://coveralls.io/repos/github/mprzodala/browser-storage-db/badge.svg?branch=master)](https://coveralls.io/github/mprzodala/browser-storage-db?branch=master)
[![npm](https://img.shields.io/npm/l/browser-storage-db.svg)](https://npmjs.org/package/browser-storage-db)
[![npm](https://img.shields.io/npm/v/browser-storage-db.svg)](https://npmjs.org/package/browser-storage-db)

BrowserStorageDB give you posibility to save and find data in localStorage or sessionStorage with basic mongoDB interface.

## Examples

set(documents: [Object]): void
```js
import LocalStorageDB from 'browser-storage-db';
const db = new LocalStorageDB('testDB', localStorage);
const initialState = [{ id:'1', name:'foo', desc: 'bar' }, { id:'2', name:'foo2', desc: 'bar2' }];
db.set(initialState);
```

insert(document: Object): String
```js
import LocalStorageDB from 'browser-storage-db';
const db = new LocalStorageDB('testDB', localStorage);
const document = { name:'foo', desc: 'bar' };
const documentId = db.insert(document);
```

update(id: String, data: Object): void
```js
import LocalStorageDB from 'browser-storage-db';
const db = new LocalStorageDB('testDB', localStorage);
const documentId = '3d3d4sda3sd';
const document = { name:'foo2', desc: 'bar2' };
db.update(documentId, document);
```

find(query: Object): [Object]
```js
import LocalStorageDB from 'browser-storage-db';
const db = new LocalStorageDB('testDB', localStorage);
const query = { name: 'foo2' };
const documents = db.find(query);
```

findOne(query: Object): Object
```js
import LocalStorageDB from 'browser-storage-db';
const db = new LocalStorageDB('testDB', localStorage);
const query = { name: 'foo2' };
const document = db.findOne(query);
```

To see more complex examples, check out this project's [test suite](./src/LocalStorageDB.test.js).
