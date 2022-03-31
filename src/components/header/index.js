import tpl from './index.tpl'
import tools from '../../utils/tools'
import { Logo } from './logo/index.js'
import './index.scss'
import { Nav } from './nav/index'
import { Search } from './search/index'
class Header {
    constructor(el, cache) {
        this.name = "header";
        this.el = el;
        this.cache = cache;
        this.logo = new Logo();
        this.nav = new Nav(this.cache);
        this.search = new Search();
    }
   async init() {
       await this.render();
        this.bindEvent();
    }
    render() {

        tools.append(this.el, tools.tplReplace(tpl(), {
            logo: this.logo.tpl(),
            nav: this.nav.tpl,
            search: this.search.tpl
        }));
    }
    bindEvent() {
        this.click();
        this.nav.bindEven();
    }
    click() {

        const J_searchBtn = document.getElementsByClassName('J_searchBtn')[0],
            self = this;
           
        J_searchBtn.onclick = () => {
            self.search.search();
        }
    }
}
export { Header }