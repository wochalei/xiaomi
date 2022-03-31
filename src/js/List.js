import { Header } from '../components/header/index'
import { App } from './app'
import {Tab} from '../components/tab/index'
import {Show_board} from '../components/show_board'
import '../scss/common.scss'
import tools from '../utils/tools'
import{Footer} from '../components/footer/index'
class List extends App {
     constructor(){
        super("<div id='app'></div>", {
            swiper: false,
            field: true,
            phone: true
          });
         this.name="list";
         this.keyword = tools.getUrlQueryValue('keyword');
     }
     render(){
        
        this.header = new Header(this.el, this.cache).init();
        this.tab = new  Tab(this.el, this.cache.field_data,this.cache.phone_data).init();
        //初始board之前内嵌在tab内写发现header有bug 下拉不出现数据 不知道为啥
        //但是组件同级结构写一起没问题 反正我只复用board里的方法 在tab不init就好了 
        //还有对于某部分不断刷新取新数据渲染找到节点用innerHTML就好了 
        //不用用append 因为我写的会累加上次的数据 
       this.changeBoard();
       this.footer = new Footer(this.el).init();
        //注意这个要绑好要不然啥也找不到
        document.body.appendChild(this.el);
        this.tab_row =document.getElementsByClassName("tab-row")[0];
       
     }
    async  changeBoard(){
         
         if(this.keyword!=null){
           let datas=new Tab(this.el, this.cache.field_data,this.cache.phone_data).makeBoardList_search(this.keyword);
           this.board=await new Show_board(this.el,datas).init();
         }else{
            this.board=await new Show_board(this.el,this.cache.phone_data).init();
         }
      }
    
   
}
new List();
