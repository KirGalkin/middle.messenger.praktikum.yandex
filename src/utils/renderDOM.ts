import {Block} from "./block";

export function renderDOM(query: string, block: Block): void {
    const parent = document.querySelector(query);
    if (!parent) {
        throw new Error(`Root element with query ${query} not found`);
    }

    parent.appendChild(block.element!);
    block.dispatchComponentDidMount();
}
