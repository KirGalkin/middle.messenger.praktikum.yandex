import template from './button.hbs';
import {Block} from "../../utils/block";

interface ButtonProps {
    label: string;
    events: {
        click: () => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
