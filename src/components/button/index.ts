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
        this.getContent()?.classList.add('main-button');
        this.getContent()?.classList.add('animation');
        this.getContent()?.setAttribute('style', this.props.style || '');
    }

    render() {
        return this.compile(template, this.props);
    }
}
