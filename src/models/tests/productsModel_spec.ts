import { Product, productsManage } from "../productsModel";

const pManege = new productsManage();

describe("Test Product model",()=>{
    it("The products class has an index function", ()=>{
        expect(pManege.indexProducts).toBeDefined();
    });
    it("The index function does not through error", ()=>{
        expect(pManege.indexProducts).not.toThrowError();
    });
    
});