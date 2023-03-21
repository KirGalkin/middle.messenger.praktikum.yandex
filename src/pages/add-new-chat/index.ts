import {Block} from "../../utils/block";
import template from "./add-new-chat.hbs";
import {InputField} from "../../components/inputField";
import {Button} from "../../components/button";
import chatController from "../../controllers/chatController";

class AddNewChat extends Block {
    constructor(props: unknown) {
        super('div', props);
    }

    protected init() {
        this.element?.classList.add('center-page-content');
        this.element?.classList.add('add-new-chat-content')

        this.children.titleField = new InputField({
            htmlId: "title",
            label: "",
            type: "text"
        });

        this.children.button = new Button({
            events: {
                click: async () => {
                    const title = (this.children.titleField as InputField).value;

                    if (!title) {
                        console.error('Title is empty')
                        return;
                    }

                    await chatController.createChat({title: title});
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
