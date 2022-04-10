import { Book, BookStore } from "../booksModel";

const store = new BookStore();

describe("Test books model",()=>{
    it("BookStore class should have an index function", ()=>{
        expect(store.index).toBeDefined();
    });
    it("Test is index function return array", async ()=>{
        const result = await store.index();
        expect(result).toEqual([]);
    });
});