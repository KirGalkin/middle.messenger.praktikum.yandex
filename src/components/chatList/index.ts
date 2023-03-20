// import {Chat} from "../chat";
import {Block} from "../../utils/block";
import template from "./chatList.hbs";

export interface ChatListProps {
    chatData: any[]
}

export class ChatList extends Block<ChatListProps> {
    chats: any[] = [{title: 'CHAT!!2'}, {title: 'CHAT!!3'}];

    constructor(props: ChatListProps) {
        super('div', props);
        // console.log('CHATLIST', props);
    }

    protected init() {
        this.chats = [{title: 'CHAT!!1'}, {title: 'CHAT!!1'}]

        // console.log('THIS> PROPS', this.props)
    }

    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {

        // console.log('CHAT LIST UPDATE', newProps)

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
