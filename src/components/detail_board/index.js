import tpl from './index.tpl'
import "./index.scss"
import tools from '../../utils/tools'
import {Detail_title} from './detail_title/index'
import {Content_item} from './content_item/index'
import{Btn_group} from './btn_group/index'
import{Detail_data} from '../../models/detail'
class Detail_board {
    constructor(el,data) {
        this.name = "detail_board";
        this.data=data;
        this.el=el;
        this.detail_data =new Detail_data();   
    }
   async init(){
     this.initData();
     this.initUserData();
       await this.render();
        this.bindEvent();
      
    }
    initUserData(){
      const data=this.data;
      this.user={
        id:data.id,
        color:data.color[0],
        phone_name:data.phone_name,
        price:data.version_info[0].price,
        version:data.version_info[0].version,
        pic:data.pics[0][0][0],
        
      }
      
    }
    initData(){
      
      const data=this.data
      data.pics=JSON.parse(data.pics);
      data.version_info=JSON.parse(data.version_info);
      data.color=JSON.parse(data.color);
      
    }
    render(){
        const data=this.data ,
              detail_title=new Detail_title(),
              content_item =new Content_item(),
              btn_group =new Btn_group();
         
             
            
              
         let versions="",colors='';    
         data.version_info.forEach((item,idx)=>{
             
            versions+=content_item.getTpl(idx,item.version,item.price,"",data.phone_name);
    
        })
        data.color.forEach((item,idx)=>{
            colors+=content_item.getTpl(idx,item,"",data.pics[idx][idx][0],data.phone_name);

        })
       tools.append(this.el,tools.tplReplace(tpl(),{
        pic_url:data.pics[0][0][0],
        phone_name:data.phone_name,
        slogan:data.slogan,
        default_price:data.default_price,
        title_1:detail_title.getTpl('手机版本'),
        title_2:detail_title.getTpl('手机颜色'),
         versions:versions,
        colors:colors,
        btnGroup:btn_group.tpl
       }))
    }
    bindEvent(){
        const self=this;
       this.J_colors= document.getElementsByClassName("J_colors")[0];
       this.J_versions=document.getElementsByClassName("J_versions")[0];
        this.J_detailPic= document.getElementsByClassName("J_detailPic")[0];
        this.J_btnGroup= document.getElementsByClassName("J_btnGroup")[0];
        this.purchase_btn=document.getElementsByClassName("purchase-btn")[0];
        this.add_to_cart_btn=document.getElementsByClassName("add-to-cart-btn")[0];
          
        
        this.J_colors.onclick=(e)=>{self.changeColor(e,self)}
        this.J_versions.onclick=(e)=>{self.changeVersion(e,self)}
        this.purchase_btn.onclick=(e)=>{self.buyShort(e,self)}
        this.add_to_cart_btn.onclick=(e)=>{self.addShort(e,self)}
    }
    addShort(e,self){
      self.user.orderId=tools.setRandomNo(2);
      
      self.detail_data.add_card(this.user);
      
    }
    buyShort(e,self){
      window.location.href = 'cart.html';
      /* self.detail_data.sumbit_card(); */
     
    }
    changeColor(e,self){
      const tar =e.target;
        //不要用className=="" 如果有多个类名它直接否定的
      if(tar.classList.contains("content-item")){
        self.user.pic=tar.getAttribute("data-pic");
        self.user.color=tar.getAttribute("data-content");
        self.J_detailPic.src= tar.getAttribute("data-pic");
        self.changeClassName(self.J_colors.children,tar);
        
      }
    }
    
    changeClassName(children,tar){
      Array.prototype.forEach.call(children,(item)=>{
        item.classList.remove("current");
      })
      tar.classList.add("current");
    }
    changeVersion(e,self){
        const tar =e.target; 
        if(tar.classList.contains("content-item")){
          self.user.version=tar.getAttribute("data-content");
         
          self.changeClassName(self.J_versions.children,tar);
          
        }
    }
}
export { Detail_board }