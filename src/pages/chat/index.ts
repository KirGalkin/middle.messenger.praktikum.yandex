import {Block} from "../../utils/block";
import template from './chat.hbs';
import {Message} from "../../components/message";
import {Img} from "../../components/shared/img";
import imageAttach from '../../../static/attach.png';
import imageSend from '../../../static/nav_arrow_left.png';
import {Link} from "../../components/link";
import {ROUTES} from "../../utils/types";
import ChatController from "../../controllers/chatController";
import {Button} from "../../components/button";
import {withStore} from "../../utils/store";
import {ChatList} from "../../components/chatList";
import {Messenger} from "../../components/messenger";

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
            chatData: []
        })

        this.children.messenger = new Messenger({});
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: {chats: any[]}): boolean {
        console.log('CHAT PAGE UPDATE', newProps);

        (this.children.chatList as Block).setProps({
            chatData: newProps.chats
        });

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withSelectedChatMessages = withStore(state => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user.id,
            chats: state.chats
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user.id,
        chats: state.chats
    };
});

export const ChatPage = withSelectedChatMessages(ChatPageBase);
