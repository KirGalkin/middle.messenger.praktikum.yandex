import { set } from "./utils";
import {EventBus} from "./eventBus";
import {User} from "../api/types";

export interface State {
    user?: User;
}

export enum StoreEvent {
    Updated = 'updated'
}

class Store extends EventBus {
    private state: State = {};

    set(path: string, value: unknown): void {
        set(this.state, path, value);

        this.emit(StoreEvent.Updated, this.getState());
    }

    getState(): State {
        return this.state;
    }
}

const store = new Store();

export default store;
