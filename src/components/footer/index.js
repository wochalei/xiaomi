import tpl from './index.tpl'
import './index.scss'
import tools from '../../utils/tools';

class Footer{
    constructor(el){
        this.name="footer";
        this.tpl=tpl();
        this.el =el;
    }
    init(){
        this.render();
    }
    render(){
       tools.append(this.el,this.tpl);
    }
}
export{Footer}