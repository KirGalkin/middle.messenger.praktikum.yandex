// import {Block} from "../block";
// import store, {State, StoreEvent} from "../store";

// export const withStore = (mapStateToProps: (state: State) => any) => (Component: typeof Block<any>) => {
//     let propsFromState: any;
//
//     return class WithStore extends Component {
//         constructor(props: any) {
//             propsFromState = mapStateToProps(store.getState());
//
//             super({...props, ...propsFromState});
//
//             store.on(StoreEvent.Updated, (newState) => {
//                 const propsFromNewState = mapStateToProps(newState!);
//
//                 propsFromState = {...propsFromNewState};
//
//                 this.setProps({...propsFromState});
//             })
//         }
//     }
// }
