import './index.scss'
import tpl from './tpl/nav_menu.tpl'
import tpl_item from './tpl/nav_menu_item.tpl'
import tools from '../../../../utils/tools'
class Nav_menu {
  constructor(cache) {
    this.name = "nav_menu";
    this.cache = cache.phone_data;
   this.tpl =tpl();
  }
  getTpl(field) {
   
    let list = "";
    
    let data = this.cache.filter(x => {
      if (x.field == field) {
        return x;
      }
    });
    
    data.forEach((element,idx) => {
     list+=tools.tplReplace(tpl_item(), {
        id:element.id,
        isFirst:idx === 0 ? 'first' : '',
        pic:JSON.parse(element.pics)[0][0][0],
        phone_name:element.phone_name,
        
        default_price:element.default_price,
      })
    });
     return list;

  }
}
export { Nav_menu }