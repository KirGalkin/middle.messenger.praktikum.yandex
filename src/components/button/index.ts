import template from './button.hbs';
import {Block} from "../../utils/block";

interface ButtonProps {
    label: string;
    events: {
        click: (...args: unknown[]) => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    protected init() {
        this.element?.classList.add('main-button');
    }

    render() {
        return this.compile(template, this.props);
    }
}
