import {Block} from "../../../utils/block";
import template from './label.hbs';

interface LabelProps {
    label: string
}
export class Label extends Block<LabelProps> {
    constructor(props: LabelProps) {
        super('label', props);
    }

    protected init() {
        this.getContent()?.classList.add('input_label');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
