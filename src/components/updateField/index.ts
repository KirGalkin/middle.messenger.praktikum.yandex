import {Block} from "../../utils/block";
import template from './updateField.hbs';
import {InputError} from "../shared/error";
import {Label} from "../shared/label";
import {Input} from "../shared/input";

interface UpdateFieldProps {
    htmlId: string,
    label: string,
    type: string,
    validationFn?: (value?: string) => string | undefined
    value: string
}
export class UpdateField extends Block<UpdateFieldProps> {
    get value(): string | undefined {
        return (this.children.input as Input)?.value;
    }
    constructor(props: UpdateFieldProps) {
        super('div', props);
    }

    protected init() {
        this.getContent()?.classList.add('update-field');

        this.children.label = new Label({
            label: this.props.label
        });

        this.children.error = new InputError({});

        this.children.input = new Input({
            htmlId: this.props.htmlId,
            type: this.props.type,
            value: this.props.value,
            events: {
                focus: () => {
                    this.validateField();
                },
                blur: () => {
                    this.validateField();
                }
            },
        });

    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        (this.children.input as Block).setProps({value: (newProps as UpdateFieldProps).value})
        return false;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

    private validateField(): void {
        const {validationFn} = this.props;
        const message = validationFn ?
            validationFn((this.children.input as Input)?.value) : undefined;
        (this.children.error as Block).setProps({message});
    }
}
