import tpl from './index.tpl';
import './index.scss';
import {OrderItem} from '../order_board/order_item/index'
 import {NoDataTip} from '../no_data_tip/index'
import tools from '../../utils/tools';

class OrderBoard {
  constructor (el) {
  	this.name = 'orderBoard';
  	this.el = el;
    this.data =JSON.parse(localStorage.getItem("cardOrder"));
    this.orderItem=new OrderItem();
    this.nodatatip=new NoDataTip();
  }

  init () {
  	this.render();
  }

  render () {
    
   if(this.data&&this.data.length>0){
     
    tools.append(this.el,tools.tplReplace(tpl(),{
      orderList:this.makeList(this.data)
    }))
   }else{
   
    tools.append(this.el, this.nodatatip.getTpl("订单空空如也"));
   }
    
  }
  makeList(data){
    let list="";
      data.forEach(element => {
        list+=this.orderItem.getTpl(element, `/detail.html?id=${element.id}`)
      });
    return list;
  }
}

export { OrderBoard };