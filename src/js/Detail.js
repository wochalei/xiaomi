import { Header } from '../components/header/index'
import '../scss/common.scss'
import { App } from './app'
import{Footer} from '../components/footer/index'
import tools from '../utils/tools'
import {Detail_board} from '../components/detail_board/index'
class Detail extends App{
  constructor(){
    super("<div id='app'></div>", {
        swiper: false,
        field: true,
        phone: true
      });
      this.name='detail';
      this.id = tools.getUrlQueryValue('id');
  }
  render(){
    this.header = new Header(this.el, this.cache).init();
   
    this.board=new Detail_board(this.el,this.fillerDatas(this.id)[0]).init();
    this.footer = new Footer(this.el).init();
    document.body.appendChild(this.el);
  }
  fillerDatas(id){
    
  return this.cache.phone_data.filter((item)=>{
     
    return item.id==id;
    });
     
  }
 
}
new Detail();