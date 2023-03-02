import {EventBus} from "./eventBus";
import {v4 as makeUUID} from 'uuid';

export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

export abstract class Block {

    private readonly meta: {tagName: string, props: unknown};
    private el?: HTMLElement;
    private readonly eventBus: EventBus;
    protected readonly props: any;
    children: Record<string, Block> = {}

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


    protected compile(template: (context: unknown) => string, props: any) {
        const propsAndStubs = {...props};

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`
        })

        const html = template(propsAndStubs);

        const fragment = this.createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = html;

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            if(!stub) {
                return;
            }
            if (child.element) {
                stub.replaceWith(child.element);
            }
        })

        return fragment.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected componentDidMount(): void {
        console.log('componentDidMount')
    }

    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        console.log(oldProps, newProps);
        return true;
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
            child.dispatchComponentDidMount();
        })
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

        // this.element.innerHTML = block
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
        {children: Record<string, Block>, props: Record<string, unknown>} {
        const children: Record<string, Block> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        })

        return {children, props};
    }

}
