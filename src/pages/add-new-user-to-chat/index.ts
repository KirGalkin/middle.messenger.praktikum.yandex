import {Block} from "../../utils/block";
import template from "./add-new-user-to-chat.hbs";
import {InputField} from "../../components/inputField";
import {Button} from "../../components/button";
import chatController from "../../controllers/chatController";
import userController from "../../controllers/userController";
import {withStore} from "../../utils/store";
import {Img} from "../../components/shared/img";
import arrow from "../../../static/nav_arrow.png";
import router from "../../utils/router";

class AddNewUserToChatPageBase extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.getContent()?.classList.add('center-page-content');
        this.getContent()?.classList.add('add-new-user-content');

        this.children.arrowImg = new Img({
            src: arrow,
            alt: 'back',
            className: 'navigation-arrow',
            events: {click: () => router.back()}
        })

        this.children.loginField = new InputField({
            htmlId: "login",
            label: "",
            type: "text"
        });

        this.children.button = new Button({
            events: {
                click: async () => {
                    const login = (this.children.loginField as InputField).value;

                    if(!login) {
                        console.error('Login is empty')
                        return;
                    }

                    await userController.findUserByLogin({login}).then(async users => {
                        if(!users) {
                            console.error('User not found', login)
                            return;
                        }

                        const ids = users.map(u => u.id)

                        chatController.addUsers({users: ids, chatId: this.props.selectedChat});
                    })
                }
            },
            label: "Add user to chat"
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withSelectedChat = withStore(state => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            selectedChat: undefined,
            userId: state.user.id,
        };
    }

    return {
        selectedChat: state.selectedChat,
        userId: state.user.id,
    };
});

export const AddNewUserToChatPage = withSelectedChat(AddNewUserToChatPageBase);
