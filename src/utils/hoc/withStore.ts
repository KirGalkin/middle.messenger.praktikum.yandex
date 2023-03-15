import {Block} from "../block";
import store, {State, StoreEvent} from "../store";

export const withStore = (mapStateToProps: (state: State) => any) => (Component: typeof Block<any>) => {
    return class WithStore extends Component {
        constructor(props: any) {
            const propsFromState = mapStateToProps(store.getState());

            super({...props, ...propsFromState});

            store.on(StoreEvent.Updated, (newState) => {
                const propsFromNewState = mapStateToProps(newState!);
                this.setProps({...propsFromNewState});
            })
        }
    }
}
