const generateDocumentId = () => Math.random().toString(36).substring(7);

class LocalStorageDB {
    static isMatchQuery(document, query = {}) {
        let isMatched = true;
        Object.keys(query).forEach((key) => {
            if (document[key] !== query[key]) isMatched = false;
        });
        return isMatched;
    }

    static filterByQuery(documents, query) {
        const results = [];
        documents.forEach((document) => {
            if (LocalStorageDB.isMatchQuery(document, query)) results.push(document);
        });
        return results;
    }

    constructor(name, storage) {
        this.name = name;
        this.storage = storage;
    }

    set(state) {
        const data = JSON.stringify(state);
        this.storage.setItem(this.name, data);
    }

    insert(document) {
        const data = JSON.parse(this.storage.getItem(this.name) || JSON.stringify([]));
        const documentId = generateDocumentId();
        data.push(Object.assign({}, document, { id: documentId }));
        this.set(data);
        return documentId;
    }

    find(query) {
        const documents = JSON.parse(this.storage.getItem(this.name) || JSON.stringify([]));
        return LocalStorageDB.filterByQuery(documents, query);
    }

    findOne(query) {
        const [document] = this.find(query);
        return document;
    }

    update(id, data) {
        const documents = this.find();
        const [document] = LocalStorageDB.filterByQuery(documents, { id });
        const documentIndex = documents.indexOf(document);
        documents[documentIndex] = Object.assign({}, document, data);
        this.set(documents);
    }

    remove(id) {
        const documents = this.find();
        const [document] = LocalStorageDB.filterByQuery(documents, { id });
        const documentIndex = documents.indexOf(document);
        documents.splice(documentIndex, 1);
        this.set(documents);
    }

    clear() {
        this.storage.clear();
    }
}

export default LocalStorageDB;
