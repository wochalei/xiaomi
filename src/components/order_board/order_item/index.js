import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class OrderItem {
	constructor () {
		this.name = 'orderItem';
	}
	getTpl(obj,link) {
      
		return tools.tplReplace(tpl(), {
			orderId:obj.orderId,
		   link,
		   img:obj.pic,
		   name:obj.phone_name,
		   price:obj.price,
		   version:obj.version,
		   color:obj.color
		})
	 }

	
}

export { OrderItem };