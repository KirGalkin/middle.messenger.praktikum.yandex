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
        return (this.getContent() as HTMLInputElement | undefined)?.value;
    }

    set value(value) {
        this.getContent()?.setAttribute('value', value || '')
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
        this.getContent()?.classList.add('input_field')
        this.getContent()?.setAttribute('id', this.props.htmlId);
        this.getContent()?.setAttribute('type', this.props.type);
        this.getContent()?.setAttribute('name', this.props.htmlId);
        this.getContent()?.setAttribute('value', this.props.value);
    }
}
