import { Order, ordersManage } from "../ordersModel";

const oManege = new ordersManage();

describe("Test Order model",()=>{
    it("The orders class has an index function", ()=>{
        expect(oManege.indexOrders).toBeDefined();
    });
    it("The index function does not through error", ()=>{
        expect(oManege.indexOrders).not.toThrowError();
    });
    
});