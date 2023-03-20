import Router from "../router";
import {BlockConstructable} from '../types';

export interface PropsWithRouter {
    router: typeof Router;
}

export function withRouter<P extends Record<string, any> & PropsWithRouter>(Component: BlockConstructable<P>) {
    // type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

    return class WithRouter extends Component {
        constructor(props: Omit<P, 'router'> ) {
            super({...props, router: Router} as P);
        }
    }
}
