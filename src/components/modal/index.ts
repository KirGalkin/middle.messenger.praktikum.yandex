import {Block} from "../../utils/block";
import template from "/modal.hbs";

export interface ModalProps {
    title: string,
    content: string,
    onSuccess: () => void,
    onCancel: () => void
}

export class Modal extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        console.log('init')
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
