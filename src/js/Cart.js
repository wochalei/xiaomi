import { Header } from '../components/header/index'
import '../scss/common.scss'
import { App } from './app'
import { Footer } from '../components/footer/index'
import {CartBoard} from '../components/cart_board/index'
class Cart extends App {
    constructor() {
        super("<div id='app'></div>", {
            swiper: false,
            field: true,
            phone: true
        });
        this.name = "cart";
    }
    render() {

        this.header = new Header(this.el, this.cache).init();
        this.CartBoard = new CartBoard(this.el).init();
        this.footer = new Footer(this.el).init();
        document.body.appendChild(this.el);
    }
}
new Cart();