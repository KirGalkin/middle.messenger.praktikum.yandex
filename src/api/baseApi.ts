import {Fetch} from "../utils/fetch";

export abstract class BaseApi {
    protected http: Fetch;
    protected constructor(endpoint: string) {
        this.http = new Fetch(endpoint);
    }
}
