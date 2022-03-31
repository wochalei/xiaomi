import './index.scss'
import tpl from './tpl/board.tpl'
import tpl_item from './tpl/item.tpl'
import tools from '../../utils/tools'
class Show_board {
    constructor(el, datas) {
        this.name = "show_board";
        this.el = el;
        this.datas = datas;
    }
    init() {
        this.render();
        
    }
    render() {
        const self=this;
         let board="";
        board =tools.tplReplace(tpl(),{
            list:self.makeList(self.datas)
        })
        tools.append(self.el,board);
    }
    makeList(datas) {
        let list = "";
        datas.forEach((item,idx)=> {
            list += tools.tplReplace(tpl_item(), {
                id: item.id,
                isFirst: idx % 5 === 0 ? 'first' : '',
                phone_name: item.phone_name,
                pic: JSON.parse(item.pics)[0][0][0],
                slogan: item.slogan.substr(0, 10),
                default_price: item.default_price
            })
        });
        return list;
    }
}
export { Show_board }