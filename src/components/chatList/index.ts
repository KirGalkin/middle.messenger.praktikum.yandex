// import {Chat} from "../chat";
import {Block} from "../../utils/block";
import template from "./chatList.hbs";
import {ChatItem} from "../chatItem";
import ChatController from "../../controllers/chatController";
import {ChatData} from "../../api/types";

export interface ChatListProps {
    chatData: ChatData[],
    activeId: number
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
            return new ChatItem({
                name: data.title,
                message: data.last_message?.content || '',
                time: this.getFormattedDate(data.last_message?.time),
                count: data.unread_count || 0,
                isActive: this.isActive(data),
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

    private isActive(data: any) {
        return data.id === this.props.activeId
    }

    private getFormattedDate(time: string | undefined) {
        if(!time) {
            return '';
        }

        const dateTime = new Date(time);

        const yyyy = dateTime.getFullYear();
        let mm = dateTime.getMonth() + 1;
        let dd = dateTime.getDate();
        let month = mm.toString();
        let days = dd.toString();

        if (dd < 10) {
            days = '0' + dd;
        }
        if (mm < 10) {
            month = '0' + mm;
        }

        return days + '/' + month + '/' + yyyy;
    }
}
