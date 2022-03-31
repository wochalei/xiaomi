import tpl from './index.tpl';
import './index.scss';

import tools from '../../utils/tools';

class NoDataTip {
  constructor () {
  	this.name = 'noDataTip';
  }

  getTpl (text) {
  	return tools.tplReplace(tpl(), { text });
  }
}

export { NoDataTip };