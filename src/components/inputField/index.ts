import {Block} from "../../utils/block";
import template from './inputField.hbs';
import {Label} from "../shared/label";
import {Input} from "../shared/input";
import {InputError} from "../shared/error";

interface InputProps {
    htmlId: string,
    label: string,
    type: string,
    validationFn?: (value?: string) => string | undefined
}
export class InputField extends Block<InputProps> {

    get value(): string | undefined {
        return (this.children.input as Input)?.value;
    }

    constructor(props: InputProps) {
        super('div', props);
    }

    protected init() {
        this.getContent()?.classList.add('input');

        this.children.error = new InputError({});

        this.children.label = new Label({
            label: this.props.label
        });

        this.children.input = new Input({
            htmlId: this.props.htmlId,
            type: this.props.type,
            events: {
                focus: () => {
                    this.validateField();
                },
                blur: () => {
                    this.validateField();
                }
            },
            value: ''
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private validateField(): void {
        const {validationFn} = this.props;
        const message = validationFn ?
            validationFn((this.children.input as Input)?.value) : undefined;
        (this.children.error as Block).setProps({message});
    }
}
