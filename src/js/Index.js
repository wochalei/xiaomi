import { Header } from '../components/header/index'
import { Wrapper } from '../components/carousel/index'
import { Board_title } from '../components/board_title/index'
import { Show_board } from '../components/show_board/index'
import '../scss/common.scss'
import { App } from './app'
import{Footer} from '../components/footer/index'

class Index extends App {
  constructor() {


    super("<div id='app'></div>", {
      swiper: true,
      field: true,
      phone: true
    });
    this.name = "index";
  }

  render() {

    this.header = new Header(this.el, this.cache).init();
    this.wrapper = new Wrapper(this.el, this.cache.swiper_data).init();
    this.title = new Board_title(this.el, '手机上新').init();
    this.board = new Show_board(this.el,this.filterdata('new')).init();
    this.title = new Board_title(this.el, '超值手机').init();
    this.board = new Show_board(this.el,this.filterdata('valuable')).init();
    this.title = new Board_title(this.el, '官方推荐').init();
    this.board = new Show_board(this.el,this.filterdata('recom')).init();
    this.footer = new Footer(this.el).init();
    document.body.appendChild(this.el);

  }
  filterdata(flag) {
   
   let tmp = this.cache.phone_data.filter ((item) => {
    switch (flag) {
      case 'recom':
        return item.recom == 1;
        break;
      case 'new':
        return item.new == 1;
        break;
      case 'valuable':
        return item.most_value == 1;
        break;
      default:
        break;
    }
  }) 
    return tmp;
  }

}
new Index();
