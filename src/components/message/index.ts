import {Block} from "../../utils/block";
interface InputProps {
    htmlId: string,
    type: string,
    placeholder?: string,
    events: {
        focus?: (...args: unknown[]) => void;
        blur?: (...args: unknown[]) => void;
    };
}
export class Message extends Block<InputProps> {
    get value(): string | undefined {
        return (this.element as HTMLInputElement | undefined)?.value;
    }

    set value(value: string | undefined) {
        if(!value) {
            return;
        }
        this.element?.setAttribute('value', value);
    }

    constructor(props: InputProps) {
        super('input', props);
    }

    protected init() {
        this.element?.classList.add('message')
        this.element?.setAttribute('id', this.props.htmlId);
        this.element?.setAttribute('type', this.props.type);
        this.element?.setAttribute('placeholder', this.props.placeholder || '');
        this.element?.setAttribute('name', this.props.htmlId);
    }
}
