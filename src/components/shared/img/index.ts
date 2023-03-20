import {Block} from "../../../utils/block";

interface ImageProps {
    src: string,
    alt: string,
    className?: string,
    events?: {
        click: (...args: unknown[]) => void;
    };
}
export class Img extends Block<ImageProps> {
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

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        // console.log('IMAGE UPDATE!!', newProps)
        this.element?.setAttribute('src', (newProps as ImageProps)?.src || '');

        return true;
    }
}
