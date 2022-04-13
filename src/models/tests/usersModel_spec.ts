import { User, usersManage } from "../usersModel";

const uManege = new usersManage();

describe("Test Users model",()=>{
    it("The users class has an index function", ()=>{
        expect(uManege.indexUsers).toBeDefined();
    });
    it("The index function does not through error", ()=>{
        expect(uManege.indexUsers).not.toThrowError();
    });
    
});