import {describe} from "mocha";
import {set} from "./utils";
import {expect} from "chai";

describe('utils', () => {

    describe('set function', () => {
        let object = {};
        const oneNestPath = 'a';
        const threeNestPath = 'a.b.c';
        const value = 3

        beforeEach(() => {
            object = {};
        })

        it('should be throw error if object not type "object"', () => {
            const notObject = 'string';

            const func = () => set(notObject, oneNestPath, value);

            expect(func).to.throw()
        })

        it('should be throw error if object is null', () => {
            const nullObject = null;

            const func = () => set(nullObject, oneNestPath, value);

            expect(func).to.throw()
        })

        it('should be set a value, first level nested', () => {
            set(object, oneNestPath, value);

            // @ts-ignore
            expect(object.a).to.eq(value);
        })

        it('should be set a value, three levels nested', () => {
            set(object, threeNestPath, value);

            // @ts-ignore
            expect(object.a.b.c).to.eq(value)
        })
    })
})
