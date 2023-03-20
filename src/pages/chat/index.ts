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
import MessagesController from "../../controllers/messagesController";
import router from "../../utils/router";

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
            src: imageAttach,
            events: {
                click: () => {
                    router.go(ROUTES.AddUserToChat)
                }
            }
        })

        this.children.sendButton = new Img({
            alt: 'send',
            src: imageSend,
            events: {
                click:() => {
                    const message = (this.children.message as Message).value;

                    console.log('SEND MESSAGE', message, this.props.selectedChat)

                    if(!message || !this.props.selectedChat) {
                        return;
                    }

                    //TODO FIX ME
                    (this.children.message as Message).value = '';

                    MessagesController.sendMessage(this.props.selectedChat, message);
                }
            }
        })

        this.children.deleteUser = new Img({
            alt: 'delete',
            src: imageSend,
            events: {
                click: () => {
                    router.go(ROUTES.RemoveUserToChat)
                }
            }
        })

        this.children.link = new Link({
            label: 'Profile >',
            to: ROUTES.Profile
        })

        this.children.addChatButton = new Button({
            events: {
                click: () => router.go(ROUTES.AddNewChat)
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
