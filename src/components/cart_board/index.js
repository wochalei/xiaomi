import tpl from './index.tpl';
import './index.scss';
import { NoDataTip } from '../no_data_tip/index'
import { CartItem } from './cart_item/index'
import { CartBar } from './cart_bar/index'
import tools from '../../utils/tools';
import {CardOrder} from '../../models/card'

class CartBoard {
  constructor(el) {
    this.name = 'cartBoard';
    this.el = el;
    this.cartItem = new CartItem();
    this.data = JSON.parse(localStorage.getItem("cardData"));
    this.nodatatip = new NoDataTip();
    this.cartBar = new CartBar();
    this.cardOrder= new CardOrder();
    this.sum_price = 0;
  }

  async init() {
    this.initData(this.data)
    this.upDatePrice(this.data);
    await this.render();
    this.bindEvent();
  }
  //初始化data 我而外加了个check标志 标志是否选择了某个订单 方便结算多个的时候
  //只要过滤false （未选中）就好了
  initData(data) {
    data.forEach((item) => {
      item.check = true;
      item.price = Number(item.price);
    })
  }
  upDatePrice(data) {
    this.sum_price = data.reduce((pre, current) => {
      pre += Number(current.price)
      return pre;
    }, 0);
  }
  render() {
    //有数据才渲染 不然某些属性用不了直接报错
    if (this.data && this.data.length > 0) {
      tools.append(this.el, tools.tplReplace(tpl(), {
        cartList: this.makeCartList(this.data),
        cartBar: this.cartBar.getTpl(this.sum_price)
      }))
    } else {
      tools.append(this.el, this.nodatatip.getTpl("购物车空空如也"));
    }

  }

  bindEvent() {
    if (this.data && this.data.length > 0){
      const self = this,
      cart_tb = document.getElementsByClassName("cart-tb")[0],
      cart_bar=document.getElementsByClassName("cart-bar")[0];
      this.$J_totalPrice = document.getElementsByClassName("J_totalPrice")[0];
      cart_tb.onclick = (e) => { self.changeData(e) }
      cart_bar.onclick = (e) => { self.changeData(e) }
    }
    
  }
  changeData(e) {
    const tar = e.target,
      className = tar.className;

    switch (className) {
      case "checkbox":
        this.checkBox(tar);
        break;
      case "purchase-btn":
        this.purchaseBtn(tar)
        break;
      case "remove-btn":
        this.removeBtn(tar);
        break;
       case "total-purchase-btn":
        this.totalSubmit();
       break;
      default:
        break;
    }
  }
  totalSubmit(){
    const data= this.data.filter((item)=>{
      return item.check==true;
    })
    data.forEach((item)=>{
      this.cardOrder.add_order(item);
      this.cardOrder.delete_card(item.orderId);
    })
    //注意刷新 因为渲染列表是根据localStorage里的数据的 
    //所以要实现结算 移除等操作直接对localStorage动刀就好 然后刷新一遍页面
    //就实现了某个订单消失
    window.location.href="/order.html";
  }
  checkBox(tar) {
    const id = tar.getAttribute("data-cartid"),

      flag = tar.checked;

    const data = this.search_data(id,true);
    if (flag) {
      data.check=true;
      this.sum_price += data.price;
      
    } else {
      
      data.check=false;
      
      this.sum_price -= data.price;
    }
    this.$J_totalPrice.textContent = this.sum_price;

  }
  purchaseBtn(tar) {
    const id = tar.getAttribute("data-cartid"),
          data= this.search_data(id,true);
        this.cardOrder.add_order(data);
        this.cardOrder.delete_card(id);
        window.location.href="/order.html";
  }
  removeBtn(tar) {
    const id = tar.getAttribute("data-cartid"),
          data = this.search_data(id,false);
        localStorage.setItem("cardData",JSON.stringify(data));
        window.location.href="/cart.html";  
  }
  search_data(id,flag) {
    if(flag){
      return this.data.filter((item) => {
        return item.orderId == id;
      })[0]
    }else{
      return this.data.filter((item) => {
        return item.orderId != id;
      })
    }
    
  }
  makeCartList(data) {
    let list = "";

    data.forEach(element => {
      list += this.cartItem.getTpl(element, `/detail.html?id=${element.id}`)
    });

    return list;
  }



}
export { CartBoard };










