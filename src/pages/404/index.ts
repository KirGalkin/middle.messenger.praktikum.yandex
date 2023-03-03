import template from './404.hbs';
import {Block} from "../../utils/block";
import {ErrorMessage} from "../../components/errorMessage";

export class NotFoundErrorPage extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('error-container');

        this.children.errorMessage = new ErrorMessage({
            code: '404',
            message: 'Something gone wrong!',
            link: '#'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
