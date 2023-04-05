import {afterEach, describe} from "mocha";
import {Button} from "./index";
import sinon from "sinon";
import {expect} from "chai";

describe('Button component', () => {
    const callback = sinon.stub();
    const label = 'click me'
    const button = new Button({
        events: {
            click: callback
        },
        label
    })

    afterEach(() => {
        callback.reset();
    })

    it('should be clicked', () => {
        button.getContent()?.click();
        expect(callback.calledOnce).to.eq(true);
    })

    it('should be with label', () => {
        const content = button.getContent()?.textContent?.trim();

        expect(content).to.eq(label);
    })
})
