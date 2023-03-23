import {Block} from "../../utils/block";
import {Message} from "../../controllers/messagesController";
import template from "./messenger.hbs"
import {SentMessage} from "../sentMessage";
import {ReceivedMessage} from "../receivedMessage";
import {withStore} from "../../utils/store";

interface MessengerProps {
    selectedChat: number | undefined;
    messages: Message[];
    userId: number;
}

class MessengerBase extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('flex-column');
        this.children.messages = this.createMessages(this.props);
    }


    // @ts-ignore
    protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
        this.children.messages = this.createMessages(newProps);

        this.element?.scrollTo(0, this.element?.getBoundingClientRect().height);
        return true;
    }

    private createMessages(props: MessengerProps) {
        return props.messages.map(data => {
            if (props.userId === data.user_id) {
                return new SentMessage({
                    message: data.content
                })
            } else {
                return new ReceivedMessage({
                    message: data.content
                })
            }
        })
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
            userId: state.user?.id
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user?.id
    };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
