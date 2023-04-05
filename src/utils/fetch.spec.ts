import {beforeEach, describe} from "mocha";
import sinon, {SinonFakeXMLHttpRequest} from "sinon";
import {Fetch} from "./fetch";
import {expect} from "chai";

describe('fetch', () => {
    const requests: SinonFakeXMLHttpRequest[] = [];
    const route = '/';
    const transport = new Fetch(route);


    before(() => {
        const XHR = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = XHR;

        XHR.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        })
    })

    beforeEach(() => {
        requests.length = 0;
    })

    describe('Methods', () => {
        it('should make "Get" type request on get()', () => {
            transport.get(route, {});

            expect(requests[0].method.toUpperCase()).to.eq('GET')
        })

        it('should make "Post" type request on post()', () => {
            transport.post(route, {});

            expect(requests[0].method.toUpperCase()).to.eq('POST')
        })

        it('should make "Put" type request on put()', () => {
            transport.put(route, {});

            expect(requests[0].method.toUpperCase()).to.eq('PUT')
        })

        it('should make "Delete" type request on delete()', () => {
            transport.delete(route, {});

            expect(requests[0].method.toUpperCase()).to.eq('DELETE')
        })
    })

    describe('params', () => {
        it('should make get with 1 param', () => {
            transport.get(route, {data: {name: 'test', value: 18}});

            expect(requests[0].url).to.include('?name=test');
        })

        it('should make get with 3 params', () => {
            transport.get(route, {data: {name: 'test', value: 18, msg: 'hello'}});

            expect(requests[0].url).to.include('?name=test&value=18&msg=hello')
        })
    })
})
