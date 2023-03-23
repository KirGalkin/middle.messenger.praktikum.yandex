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
        this.element?.setAttribute('src', this.props.src);
        this.element?.setAttribute('alt', this.props.alt);
        this.element?.setAttribute('style', "cursor: 'pointer'; width: 47px; height: 47px;");
        this.element?.classList.add('animation');
        if (this.props.className) {
            this.element?.classList.add(this.props.className);
        }
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        this.element?.setAttribute('src', (newProps as ImageProps)?.src || '');

        return true;
    }
}
