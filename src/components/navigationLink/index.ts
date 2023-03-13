import {Block} from "../../utils/block";
import template from './navigationLink.hbs';

interface NavigationLinkProps {
    label: string,
    events: {
        click: () => void;
    };
}

export class NavigationLink extends Block<NavigationLinkProps> {
    constructor(props: NavigationLinkProps) {
        super('li', props);
    }

    protected init() {
        this.element?.classList.add('nav-link');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
