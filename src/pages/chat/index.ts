import {Block} from "../../utils/block";
import template from './chat.hbs';
import {Chat} from "../../components/chat";
import {ReceivedMessage} from "../../components/receivedMessage";
import {SentMessage} from "../../components/sentMessage";
import {Message} from "../../components/message";
import {Img} from "../../components/shared/img";
import imageAttach from '../../../static/attach.png';
import imageSend from '../../../static/nav_arrow_left.png';

export class ChatPage extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('chat-content');

        this.children.chat = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, ' +
                'consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.chat1 = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, ' +
                'consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.chat2 = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, ' +
                'consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'Andrew',
            time: '15:24'
        })

        this.children.chat3 = new Chat({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, ' +
                'consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
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

        this.children.message = new Message({
            htmlId: 'message',
            type: 'text',
            placeholder: 'Message',
            events: {}
        })

        this.children.imageAttach = new Img({
            alt: 'attach',
            src: imageAttach
        })

        this.children.imageSend = new Img({
            alt: 'attach',
            src: imageSend
        })

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
