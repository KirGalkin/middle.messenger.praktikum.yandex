import {Block} from "../../../utils/block";

interface InputProps {
    htmlId: string,
    type: string,
    value: string,
    events: {
        focus: (...args: unknown[]) => void;
        blur: (...args: unknown[]) => void;
    };
}
export class Input extends Block<InputProps> {
    get value(): string | undefined {
        return (this.element as HTMLInputElement | undefined)?.value;
    }

    set value(value) {
        this.element?.setAttribute('value', value || '')
    }

    constructor(props: InputProps) {
        super('input', props);
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        this.value = (newProps as InputProps).value;
        return false
    }

    protected init() {
        this.element?.classList.add('input_field')
        this.element?.setAttribute('id', this.props.htmlId);
        this.element?.setAttribute('type', this.props.type);
        this.element?.setAttribute('name', this.props.htmlId);
        this.element?.setAttribute('value', this.props.value);
    }
}
