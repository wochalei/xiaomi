import { Header } from '../components/header/index'
import { App } from './app'
import '../scss/common.scss'

import{Footer} from '../components/footer/index'
import {OrderBoard} from '../components/order_board/index'
class Order extends App{
    constructor(){
        super("<div id='app'></div>", {
            swiper: false,
            field: true,
            phone: true
          });
        this.name='order';
    }
    render(){
        this.header = new Header(this.el, this.cache).init();
        this.orderBoard =new OrderBoard(this.el).init();
        this.footer = new Footer(this.el).init();
        document.body.appendChild(this.el);
    }
}
new Order();