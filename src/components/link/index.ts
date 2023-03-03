import {Block} from "../../utils/block";
import template from './link.hbs';

interface LinkProps {
    link: string,
    style?: string,
    label: string
}

export class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('link');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
