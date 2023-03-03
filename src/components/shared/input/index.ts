import {Block} from "../../../utils/block";

interface InputProps {
    htmlId: string,
    type: string,
    events: {
        focus: (...args: unknown[]) => void;
        blur: (...args: unknown[]) => void;
    };
}
export class Input extends Block<InputProps> {
    get value(): string | undefined {
        return (this.element as HTMLInputElement | undefined)?.value;
    }

    constructor(props: InputProps) {
        super('input', props);
    }

    protected init() {
        this.element?.classList.add('input_field')
        this.element?.setAttribute('id', this.props.htmlId);
        this.element?.setAttribute('type', this.props.type);
        this.element?.setAttribute('name', this.props.htmlId);
    }
}
