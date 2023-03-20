// import {Chat} from "../chat";
import {Block} from "../../utils/block";
import template from "./chatList.hbs";
import {Chat} from "../chat";
import ChatController from "../../controllers/chatController";

export interface ChatListProps {
    chatData: any[]
}

export class ChatList extends Block<ChatListProps> {

    constructor(props: ChatListProps) {
        super('div', props);
    }

    protected init() {
        this.children.chats = this.createChats(this.props);
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
        this.children.chats = this.createChats(newProps);
        return true;
    }

    private createChats(props: ChatListProps) {
        return (props.chatData || []).map(data => {
            return new Chat({
                name: data.title,
                message: "",
                time: "string",
                count: 32,
                events: {
                    click: () => {
                        ChatController.selectChat(data.id);
                    }
                }
            });
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
