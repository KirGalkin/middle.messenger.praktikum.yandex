// import {Chat} from "../chat";
import {Block} from "../../utils/block";
import template from "./chatList.hbs";
import {Chat} from "../chat";

export interface ChatListProps {
    chatData: any[]
}

export class ChatList extends Block<ChatListProps> {

    constructor(props: ChatListProps) {
        super('div', props);
    }

    protected init() {

        // const chatArray = (this.props.chatData || []).map(c => {
        //     return  new Chat({count: 0, message: "", name: c.title, time: ""})
        // });


        (this.props.chatData || []).forEach(data => {
            this.children[data.title] = new Chat({
                count: 0, message: "", name: data.title, time: ""
            })
        })

        // this.children.chats = chatArray;

        this.children['chha'] = new Chat({
            count: 0, message: "", name: "HUI", time: ""

        })
    }

    protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
        (newProps.chatData || []).forEach(data => {
            this.children[data.title] = new Chat({
                count: 0, message: "", name: data.title, time: ""
            })
        })

        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
