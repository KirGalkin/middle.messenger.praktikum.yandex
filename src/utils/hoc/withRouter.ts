import Router from "../router";
import {BlockConstructable} from '../types';

export interface PropsWithRouter {
    router: typeof Router;
}

export function withRouter<P extends Record<string, any> & PropsWithRouter>(Component: BlockConstructable<P>) {

    return class WithRouter extends Component {
        constructor(props: Omit<P, 'router'> ) {
            super({...props, router: Router} as P);
        }
    }
}
