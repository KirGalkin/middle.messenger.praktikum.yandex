import {Block} from "../../utils/block";
import template from "./add-new-user-to-chat.hbs";
import {InputField} from "../../components/inputField";
import {Button} from "../../components/button";
import chatController from "../../controllers/chatController";
import userController from "../../controllers/userController";
import {withStore} from "../../utils/store";

class AddNewUserToChatPageBase extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.children.loginField = new InputField({
            htmlId: "login",
            label: "Insert user Login",
            type: "text"
        });

        this.children.button = new Button({
            events: {
                click: async () => {
                    // const title = (this.children.titleField as InputField).value;
                    const login = (this.children.loginField as InputField).value;

                    if(!login) {
                        console.error('Login is empty')
                        return;
                    }

                    await userController.findUserByLogin({login}).then(async users => {
                        console.log('UUUUSERSRSRSRE', users)
                        if(!users) {
                            console.error('User not found', login)
                            return;
                        }

                        const ids = users.map(u => u.id)

                        console.log('{users: [user.id], chatId: this.props.selectedChat}', {users: ids, chatId: this.props.selectedChat})
                        chatController.addUsers({users: ids, chatId: this.props.selectedChat});

                    })


                    // const user = userController.findUserByLogin({login: login}).then(us => {
                    //     if(!us) {
                    //         console.error('User not found', login)
                    //         return;
                    //     }
                    //
                    //     chatController.createChat({title}).then(() => {
                    //         chatController.addUsers({users: [us.id], chatId: chat })
                    //
                    //     })
                    // })


                }
            },
            label: "Add new chat"
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
