import {Block} from "../../utils/block";
import template from './chat.hbs';
import {Chat} from "../../components/chat";
import {ReceivedMessage} from "../../components/receivedMessage";
import {SentMessage} from "../../components/sentMessage";

export class ChatPage extends Block {
    constructor(props: {}) {
        super('main', props);
    }

    protected init() {
        this.element?.classList.add('chat-content');

        this.children.chat = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.chat1 = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.chat2 = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.chat3 = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.receivedMessage = new ReceivedMessage({
            message: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident quibusdam voluptatem voluptates. Aliquid assumenda
                commodi deserunt dignissimos eum illum labore, natus nobis,
                odit officia officiis velit voluptas voluptatibus. Nulla odio
                officiis similique! Ab alias amet doloremque esse optio pariatur
                placeat quia saepe temporibus? Ab assumenda beatae ea, iste perferendis
                possimus!`
        });

        this.children.sentMessage = new SentMessage({
            message: 'Lorem ipsum!!'
        })

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
