import { set } from "./utils";
import {EventBus} from "./eventBus";
import {ChatData, User} from "../api/types";
import {Block} from "./block";

export interface State {
    user?: User;
    chats?: ChatData[];
}

export enum StoreEvent {
    Updated = 'updated'
}

class Store extends EventBus {
    private state: State = {};

    constructor() {
        super();
        console.log('STORERRERE');
    }

    set(path: string, value: unknown): void {
        set(this.state, path, value);

        console.log('EMIT STORE');
        this.emit(StoreEvent.Updated, this.getState());

        console.log('STATE UPDATED: ', this.getState());
    }

    getState(): State {
        return this.state;
    }
}

// const store = new Store();
//
//
// // @ts-ignore
// // window.store = store;
//
// export default store;
const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

    return function wrap(Component: typeof Block){
        let previousState: any;

        return class WithStore extends Component {

            constructor(props: any) {
                previousState = mapStateToProps(store.getState());

                super({ ...props, ...previousState });

                store.on(StoreEvent.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    previousState = stateProps;

                    this.setProps({ ...stateProps });
                });
            }
        }
    }
}

export default store;
