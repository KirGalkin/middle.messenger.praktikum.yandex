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
        this.children.button2 = new Button({
            label: 'Click me2',
            events: {
                click: () => console.log('clicked2'),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
