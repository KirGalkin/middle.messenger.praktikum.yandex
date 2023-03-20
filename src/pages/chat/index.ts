import {Block} from "../../utils/block";
import template from './chat.hbs';
import {ReceivedMessage} from "../../components/receivedMessage";
import {SentMessage} from "../../components/sentMessage";
import {Message} from "../../components/message";
import {Img} from "../../components/shared/img";
import imageAttach from '../../../static/attach.png';
import imageSend from '../../../static/nav_arrow_left.png';
import {Link} from "../../components/link";
import {ROUTES} from "../../utils/types";
import ChatController from "../../controllers/chatController";
import {Button} from "../../components/button";
import {withStore} from "../../utils/store";
import {Chat} from "../../components/chat";
import {ChatData} from "../../api/types";
import {ChatList} from "../../components/chatList";

class ChatPageBase extends Block {

    constructor(props: unknown) {
        super('div', props);
        this.loadChats();
    }

    async loadChats() {
        await ChatController.getChats();
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

        this.children.link = new Link({
            label: 'Profile >',
            to: ROUTES.Profile
        })

        this.children.addChatButton = new Button({
            events: {
                click: () => ChatController.createChat({title: 'CHAT1'})
            }, label: 'Add new chat'
        })

        this.children.chatList = new ChatList({
            chatData: [{title: 'CHAT!!1'}, {title: 'CHAT!!1'}]
        })
    }

    protected componentDidUpdate(oldProps: unknown, newProps: {messages: Message[]}): boolean {
        console.log('DSKJDKLSA', newProps.messages);

        this.children.chat.setProps({
            count: 2,
            message: 'Lorem ipsum dolor sit amet, ' +
                'consectetur adipisicing elit. Ab, ad atque cupiditate dignissimos',
            name: 'newProps?.messages[0].title',
            time: '15:24'
        })

        this.children.chatList.setProps({
            chatData: [{title: 'CHAT!!1'}, {title: 'CHAT!!1'}]
        })


        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withSelectedChatMessages = withStore(state => {
    const selectedChatId = 8415;
    // const selectedChatId = state.selectedChat;
    //
    // if (!selectedChatId) {
    //     return {
    //         messages: [],
    //         selectedChat: undefined,
    //         userId: state.user.id
    //     };
    // }


    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user.id
    };
});

export const ChatPage = withSelectedChatMessages(ChatPageBase);
