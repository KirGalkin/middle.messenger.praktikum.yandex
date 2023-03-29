import template from './button.hbs';
import {Block} from "../../utils/block";

interface ButtonProps {
    label: string;
    events: {
        click: (...args: unknown[]) => void;
    };
    style?: string;
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    protected init() {
        this.element?.classList.add('main-button');
        this.element?.classList.add('animation');
        this.element?.setAttribute('style', this.props.style || '');
    }

    render() {
        return this.compile(template, this.props);
    }
}
