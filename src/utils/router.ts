import {Block} from "./block";
import {BlockConstructable, isEqual, render} from "./utils";

class Router {
    private routes: Route[];
    private history: History;
    private currentRoute: Route | null;
    private static _instance: Router;
    private readonly rootQuery: string;
    constructor(rootQuery: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router._instance = this
    }

    use(pathname: string, block: BlockConstructable) {
        console.log('ROOTQUERY', this.rootQuery);
        const route = new Route(pathname, block, {rootQuery: this.rootQuery});
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this.onRoute(target.location.pathname);
        }

        this.onRoute(window.location.pathname);
    }

    go(pathName: string) {
        this.history.pushState({}, '', pathName);
        this.onRoute(pathName)
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathName: string) {
        return this.routes.find(r => r.match(pathName))
    }

    private onRoute(pathName: string) {
        const route = this.getRoute(pathName);
        if(!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.render();
    }

}

class Route {
    private pathname: string;
    private blockClass: BlockConstructable;
    private block: Block | null;
    private props: any;
    constructor(pathname: string, view: BlockConstructable, props: any) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname)
    }

    leave(): void {
        if (this.block) {
            this.block.hide();
        }
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass({});

            console.log('RENDER ', this.props.rootQuery, this.block)
            render(this.props.rootQuery, this.block);
            return;
        }

        this.block.show();
    }
}

export default new Router('#root');
