import LocalStorageDB from './LocalStorageDB';

class LocalStorageMock {
    constructor() {
        this.data = {};
        this.mocks = {
            setItem: jest.fn(),
            getItem: jest.fn(),
            clear: jest.fn(),
        };
    }
    setItem(name, value) {
        this.data[name] = value;
        this.mocks.setItem(name, value);
    }
    getItem(name) {
        this.mocks.getItem(name);
        return this.data[name];
    }
    clear() {
        this.data = {};
        this.mocks.clear();
    }
}

describe('LocalStorageDB', () => {
    const mockedLocalStoarge = new LocalStorageMock();
    const dbName = 'testDB';
    const db = new LocalStorageDB(dbName, mockedLocalStoarge);
    const initialState = [
        { id: '1', name: 'foo', description: 'bar' },
        { id: '2', name: 'foo2', description: 'bar2' },
        { id: '3', name: 'foo3', description: 'bar3' },
        { id: '4', name: 'foo4', description: 'bar4' },
    ];
    it('should set DB', () => {
        db.set(initialState);
        expect(mockedLocalStoarge.mocks.setItem).toBeCalledWith(
            dbName,
            JSON.stringify(initialState),
        );
    });
    it('should insert document to empty DB', () => {
        const mockedEmptyLocalStorage = new LocalStorageMock();
        const emptyDB = new LocalStorageDB('emptyDB', mockedEmptyLocalStorage);
        const document = { name: 'foo', description: 'bar' };
        emptyDB.insert(document);
        expect(mockedEmptyLocalStorage.mocks.setItem).toBeCalled();
    });
    it('should insert document to DB and return id of document', () => {
        const document = { name: 'foo5', description: 'bar5' };
        const documentId = db.insert(document);
        initialState.push(document);
        expect(mockedLocalStoarge.mocks.setItem.mock.calls.length).toBe(2);
        expect(typeof documentId).toEqual('string');
    });
    it('should find matched documents in DB', () => {
        const documents = db.find({ name: 'foo2' });
        expect(documents).toEqual([{ id: '2', name: 'foo2', description: 'bar2' }]);
    });
    it('should find all documents in DB', () => {
        const documents = db.find();
        expect(documents.length).toBe(5);
    });
    it('should find first matched document in DB', () => {
        const document = db.findOne({ name: 'foo3' });
        expect(document).toEqual({ id: '3', name: 'foo3', description: 'bar3' });
    });
    it('should update document in DB', () => {
        const documentId = '4';
        db.update(documentId, { name: 'foobar' });
        const document = db.findOne({ id: documentId });
        expect(document).toEqual({ id: '4', name: 'foobar', description: 'bar4' });
    });
    it('should remove document from DB', () => {
        const documentId = '4';
        db.remove(documentId);
        const document = db.findOne({ id: documentId });
        expect(document).toBeUndefined();
    });
    it('should clear DB', () => {
        db.clear();
        const documents = db.find();
        expect(documents.length).toBe(0);
    });
});
