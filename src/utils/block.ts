import {EventBus} from "./eventBus";
import {v4 as makeUUID} from 'uuid';
import {isEqual} from "./utils";

export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

export abstract class Block<Props extends Record<string, any> = any> {

    private readonly meta: {tagName: string, props: unknown};
    private el?: HTMLElement;
    private readonly eventBus: EventBus;
    protected readonly props: Props;
    children: Record<string, Block | Block[]> = {}

    private readonly id: string;

    get element(): HTMLElement | undefined {
        return this.el;
    }

    constructor(tagName = 'div', propsWithChildren: unknown = {}) {
        const eventBus = new EventBus();

        const {children, props} = this.getChildrenAndProps(propsWithChildren)

        this.meta = {tagName, props};

        this.id = makeUUID();

        this.children = children;
        this.props = this.makePropsProxy({...props, id: this.id});

        //TODO why?
        this.eventBus = eventBus;

        this.registerEvents(eventBus);
        this.eventBus.emit(EVENTS.INIT);

    }

    dispatchComponentDidMount():void {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    setProps = (nextProps: unknown) => {
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


    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        const replaceStub = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        }

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach(replaceStub);
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected componentDidMount(): void {
        console.log('componentDidMount')
    }

    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return !isEqual(oldProps, newProps);

    }

    getContent() {
        return this.element;
    }

    protected init(): void {
        console.log('init')
    }

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

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(ch => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    private componentDidUpdateInternal(oldProps: unknown, newProps: unknown): void {
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

        this.element.innerHTML = '';

        this.element.appendChild(block);

        this.addEvents();
    }

    private createResources(): void {
        const {tagName} = this.meta;
        this.el = this.createDocumentElement(tagName);
    }

    private createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this.id);
        return element;
    }

    private makePropsProxy(props: any) {
        // eslint-disable-next-line
        const self = this;

        return new Proxy(props, {
            get(target: any, p: string | symbol): unknown {
                const value = target[p];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, p: string | symbol, newValue: unknown): boolean {
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

        Object.keys(events).forEach(eventName => {
            this.element?.removeEventListener(eventName, events[eventName]);
        })
    }

    private getChildrenAndProps(propsAndChildren: any):
        {children: Record<string, Block | Block[]>, props: Record<string, unknown>} {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
                children[key as string] = value;
            } else if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return {props, children};
    }

}
