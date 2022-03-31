import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class CartItem {
   constructor() {
      this.name = 'cartItem';
   }
   getTpl(obj,link) {
      
      return tools.tplReplace(tpl(), {
         cartId:obj.orderId,
         link,
         img:obj.pic,
         name:obj.phone_name,
         price:obj.price,
         version:obj.version,
         color:obj.color
      })
   }


}

export { CartItem };