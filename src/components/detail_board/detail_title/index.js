import './index.scss'
import tpl from './index.tpl'
import tools from '../../../utils/tools'
class Detail_title{
    constructor(){
        this.name="detail_title";
    }
    getTpl(title){
      return tools.tplReplace(tpl(),{
          title
      })
    }
}
export {Detail_title}