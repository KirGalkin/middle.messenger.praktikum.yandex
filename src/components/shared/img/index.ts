import {Block} from "../../../utils/block";

interface ImageProps {
    src: string,
    alt: string,
    className?: string
}
export class Img extends Block {
    constructor(props: ImageProps) {
        super('img', props);
    }

    protected init() {
        this.element?.setAttribute('src', this.props.src);
        this.element?.setAttribute('alt', this.props.alt);
        if (this.props.className) {
            this.element?.classList.add(this.props.className);
        }
    }
}
