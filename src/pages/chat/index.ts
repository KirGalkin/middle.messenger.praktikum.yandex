import {Block} from "../../utils/block";
import template from './chat.hbs';
import {Message} from "../../components/message";
import {Link} from "../../components/link";
import {ROUTES} from "../../utils/types";
import ChatController from "../../controllers/chatController";
import {Button} from "../../components/button";
import {withStore} from "../../utils/store";
import {ChatList} from "../../components/chatList";
import {Messenger} from "../../components/messenger";
import MessagesController from "../../controllers/messagesController";
import router from "../../utils/router";
import {ChatData} from "../../api/types";

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
        this.initChildrens();
    }

    private initChildrens() {
        this.children.message = new Message({
            htmlId: 'message',
            type: 'text',
            placeholder: 'Message',
            events: {}
        })

        this.children.link = new Link({
            label: 'Profile >',
            to: ROUTES.Profile
        })

        this.children.addChatButton = new Button({
            events: {
                click: () => router.go(ROUTES.AddNewChat)
            }, label: '+ Chat'
        })

        this.children.chatList = new ChatList({
            chatData: [],
            //FIX ME
            activeId: this.props.selectedChat
        })

        this.children.addUserButton = new Button({
            events: {
                click: () => {
                    router.go(ROUTES.AddUserToChat)
                }
            },
            label: "+ User",
            style: "width: 75px; margin: 0 6px; height: 32px"

        })

        this.children.removeUserButton = new Button({
            events: {
                click: () => {
                    router.go(ROUTES.RemoveUserToChat)
                }
            },
            label: "- User",
            style: "width: 75px; margin: 0 6px; height: 32px"
        })

        this.children.sendMessageBtn = new Button({
            events: {
                click: () => {
                    const message = (this.children.message as Message).value;
                    if (!message || !this.props.selectedChat) {
                        return;
                    }
                    MessagesController.sendMessage(this.props.selectedChat, message);
                }
            },
            label: "Send ->",
            style: "width: 170px; height: 32px; margin: 0"

        })

        this.children.messenger = new Messenger({});
    }

// @ts-ignore
    protected componentDidUpdate(oldProps: unknown,
        newProps: {chats: ChatData[], selectedChat: number}): boolean {
        (this.children.chatList as Block).setProps({
            chatData: newProps.chats,
            activeId: newProps.selectedChat
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
            userId: state.user?.id,
            chats: state.chats
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user?.id,
        chats: state.chats
    };
});

export const ChatPage = withSelectedChatMessages(ChatPageBase);
