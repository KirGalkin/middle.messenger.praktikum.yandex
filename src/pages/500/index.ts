import template from './500.hbs';
import {Block} from "../../utils/block";
import {ErrorMessage} from '../../components/errorMessage'

export class ServerErrorPage extends Block {
    constructor(props: unknown) {
        super('main', props);
    }

    protected init() {
        this.children.errorMessage = new ErrorMessage({
            code: '500',
            message: 'We will fix it',
            link: '#'
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}




