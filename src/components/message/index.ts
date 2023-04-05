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
        return (this.getContent() as HTMLInputElement | undefined)?.value;
    }

    set value(value: string | undefined) {
        if(!value) {
            return;
        }
        this.getContent()?.setAttribute('value', value);
    }

    constructor(props: InputProps) {
        super('input', props);
    }

    protected init() {
        this.getContent()?.classList.add('message')
        this.getContent()?.setAttribute('id', this.props.htmlId);
        this.getContent()?.setAttribute('type', this.props.type);
        this.getContent()?.setAttribute('placeholder', this.props.placeholder || '');
        this.getContent()?.setAttribute('name', this.props.htmlId);
    }
}
