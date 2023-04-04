import {Block} from "../../../utils/block";

interface ImageProps {
    src: string,
    alt: string,
    style?: string,
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
        this.getContent()?.setAttribute('src', this.props.src);
        this.getContent()?.setAttribute('alt', this.props.alt);
        this.getContent()?.setAttribute('style',  this.props.style ?? "cursor: 'pointer'");
        this.getContent()?.classList.add('animation');
        if (this.props.className) {
            this.getContent()?.classList.add(this.props.className);
        }
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        this.getContent()?.setAttribute('src', (newProps as ImageProps)?.src || '');

        return true;
    }
}
