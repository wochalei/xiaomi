import tpl from './index.tpl'
import './index.scss'
import tools from '../../../utils/tools'
class Search{
    constructor(){
        this.name="search";
        this.tpl = tpl();
    }
    search(){
      let input=document.getElementById('J_keyword'),
          from=document.getElementById('J_searchForm');
       let value = tools.trimSpaces(input.value),
           length=value.length,
           option=from.getAttribute("action");
           if(length>0){
            window.open(option+'?keyword='+value);   
           }
       
           
    }
}
export{
    Search
}