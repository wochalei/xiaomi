import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class CartBar {
	constructor () {
		this.name = 'cartBar';
	}

	getTpl (totalPrice) {
		return tools.tplReplace(tpl(), { totalPrice });
	}
}

export { CartBar };