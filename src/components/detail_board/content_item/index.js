import './index.scss'
import tpl from './index.tpl'
import tools from '../../../utils/tools'
class Content_item {
    constructor() {
        this.name = 'content_item';
    }
    getTpl(id,content,price,pic,name) {
        return tools.tplReplace(tpl(), {
            isCurrent:id===0?'content-item current' : 'content-item',
            content,
            dPrice:price,
            pic,
            name,
            price:price ? price+"元" :"",
            
        })
    }
}
export {Content_item}