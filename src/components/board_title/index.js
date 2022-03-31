import tpl from './index.tpl'
import './index.scss'
import tools from '../../utils/tools'
class Board_title {
    constructor(el, title) {
        this.name = "board_title";
        this.el = el;
        this.title = title;
    }
    init() {
        this.render();
    }
    render() {
        let self = this, list;
        list = tools.tplReplace(tpl(), {
            title: self.title
        })
        tools.append(this.el, list);
    }
}
export { Board_title }