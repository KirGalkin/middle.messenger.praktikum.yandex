import {Link} from "./index";

describe('Link component', () => {
    it('should render', () => {
        new Link({
            label: "link",
            to: "/"
        })
    })
})
