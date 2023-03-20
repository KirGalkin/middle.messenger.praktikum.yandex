import {Block} from "../../utils/block";
import template from "./addNewChat.hbs";
import {InputField} from "../../components/inputField";
import {Button} from "../../components/button";
import chatController from "../../controllers/chatController";

class AddNewChat extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.children.titleField = new InputField({
            htmlId: "title",
            label: "Insert chan title",
            type: "text"
        });

        // this.children.userLoginField = new InputField({
        //     htmlId: "userLogin",
        //     label: "Insert user login",
        //     type: "text"
        // });

        this.children.button = new Button({
            events: {
                click: async () => {
                    const title = (this.children.titleField as InputField).value;
                    // const login = (this.children.userLoginField as InputField).value;

                    if(!title) {
                        console.error('Title is empty')
                        return;
                    }

                    await chatController.createChat({title: title});

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


export default AddNewChat;
