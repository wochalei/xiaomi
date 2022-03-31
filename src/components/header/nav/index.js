import './index.scss'
import tpl from './index.tpl'
import { Nav_item } from './nav_item/index'
import tools from '../../../utils/tools'
import { Nav_menu } from './nav_menu/index'
class Nav {
  constructor(cache) {
    this.name = "nav";

    this.cache = cache;
    this.menu = new Nav_menu(this.cache);
    this.item = new Nav_item(this.cache);
    this.init();
  }
  async init() {
    await this.render();
    
  }
  render() {
    this.tpl = tools.tplReplace(tpl(), {
      navItems: this.item.getTpl(),
      navMenu: this.menu.tpl
    })
    
   
  }
  bindEven() {
    this.mousemove();
  }
  mousemove() {
    
    let self = this;
    let nav_item = document.getElementsByClassName("nav-item");
    let data = Array.prototype.slice.call(nav_item, 0);
    
    data.forEach(element => {
      
      element.onmouseenter = function (e) {
        
       const J_navMenu = document.getElementsByClassName("J_navMenu")[0];
       //这里能做个缓存 然后不用每次去调用menu.getTpl方法
       //不写了在这浪费太久了
       J_navMenu.innerHTML = self.menu.getTpl(element.getAttribute("data-field"));

      }
      
    });
    
  }

}

export { Nav }