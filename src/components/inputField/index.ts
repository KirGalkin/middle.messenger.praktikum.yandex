import {Block} from "../../utils/block";
import template from './inputField.hbs';
import {Label} from "./label";
import {Input} from "./input";

interface InputProps {
    htmlId: string,
    label: string,
    type: string
}
export class InputField extends Block {

    get value(): string | undefined {
        return (this.children.input as Input)?.value;
    }

    constructor(props: InputProps) {
        super('div', props);
    }

    protected init() {
        console.log(this.props)
        this.element?.classList.add('input');

        this.children.label = new Label({
            label: this.props.label
        });

        this.children.input = new Input({
            htmlId: this.props.htmlId,
            type: this.props.type
        });

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
