import {EventBus} from "./eventBus";

export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

export abstract class Block {

    private readonly meta: {tagName: string, props: any};
    private el?: HTMLElement;
    private readonly eventBus: EventBus;
    private readonly props: any;

    get element(): HTMLElement | undefined {
        return this.el;
    }

    constructor(tagName: string = 'div', props: any) {
        const eventBus = new EventBus();
        this.meta = {tagName, props};

        this.props = this.makePropsProxy(props);

        //TODO why?
        this.eventBus = eventBus;

        this.registerEvents(eventBus);
        this.eventBus.emit(EVENTS.INIT);

    }

    dispatchComponentDidMount():void {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    setProps = (nextProps: any) => {
        if(!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    }

    show(): void {
        if(!this.element) {
            throw new Error('Element is undefined');
        }
        this.element.style.display = 'block';
    }

    hide(): void {
        if(!this.element) {
            throw new Error('Element is undefined');
        }
        this.element.style.display = 'none';
    }

    protected render(): string {
        return '';
    }

    protected componentDidMount(): void {

    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        console.log(oldProps, newProps);
        return true;
    }

    protected init(): void {}

    private registerEvents(eventBus: EventBus): void {
        eventBus.on(EVENTS.INIT, this.initInternal.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this.componentDidMountInternal.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdateInternal.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this.renderInternal.bind(this));
    }

    private initInternal(): void {
        this.createResources();

        this.init();

        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    private componentDidMountInternal(): void {
        this.componentDidMount();
    }

    private componentDidUpdateInternal(oldProps: any, newProps: any): void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus.emit(EVENTS.FLOW_RENDER);
        }
    }

    private renderInternal(): void {
        if(!this.element) {
            return;
        }
        const block = this.render();

        this.removeEvents();

        this.element.innerHTML = block

        this.addEvents();
    }

    private createResources(): void {
        const {tagName} = this.meta;
        this.el = document.createElement(tagName);
    }

    private makePropsProxy(props: any) {
        const self = this;

        return new Proxy(props, {
            get(target: any, p: string | symbol): any {
                const value = target[p];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, p: string | symbol, newValue: any): boolean {
                const old = {...target};
                target[p] = newValue;

                self.eventBus.emit(EVENTS.FLOW_CDU, old, target)
                return true;
            },
            deleteProperty(): boolean {
                throw new Error('Error');
            }
        })
    }

    private addEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this.element?.addEventListener(eventName, events[eventName]);
        })
    }

    private removeEvents(): void {
        const {events = {}} = this.props;

        console.log('removeEvents', events)

        Object.keys(events).forEach(eventName => {
            this.element?.removeEventListener(eventName, events[eventName]);
        })
    }

}
