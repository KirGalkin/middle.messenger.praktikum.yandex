import {Block} from "../../utils/block";
import template from './link.hbs';
import {PropsWithRouter, withRouter} from "../../utils/hoc/withRouter";

interface LinkProps extends PropsWithRouter{
    to: string,
    style?: string,
    label: string,
    events?: {
        click: () => void
    }
}

class BaseLink extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super('div', {
            ...props,
            events: {
                click: () => this.navigate()
            }
        });
    }

    protected init() {
        this.element?.classList.add('link');
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

    private navigate(): void {
        this.props.router.go(this.props.to);
    }
}

export const Link = withRouter<LinkProps>(BaseLink);


