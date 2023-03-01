import {Block} from "../../utils/block";
import template from './updateField.hbs';
import {InputError} from "../shared/error";
import {Label} from "../shared/label";
import {Input} from "../shared/input";

interface UpdateFieldProps {
    htmlId: string,
    label: string,
    type: string,
    validationFn?: (value: string) => string | undefined
}
export class UpdateField extends Block {
    get value(): string | undefined {
        return (this.children.input as Input)?.value;
    }
    constructor(props: UpdateFieldProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('update-field');

        this.children.label = new Label({
            label: this.props.label
        });

        this.children.error = new InputError({});

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
            }
        });

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

    private validateField(): void {
        const {validationFn} = this.props;
        const message = validationFn ? validationFn((this.children.input as Input)?.value) : undefined;
        this.children.error.setProps({message});
    }
}
