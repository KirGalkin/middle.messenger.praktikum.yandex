import template from './home.hbs';
import {Block} from "../../utils/block";
import {Button} from "../../components/button";

interface HomePageProps {
    title: string;
}

export class HomePage extends Block {
    constructor(props: HomePageProps) {
        super('div', props);
    }

    init() {
        this.children.button = new Button({
            label: 'Click me',
            events: {
                click: () => console.log('clicked'),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
