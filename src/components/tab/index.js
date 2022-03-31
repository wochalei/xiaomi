import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';
import { Show_board } from '../show_board'
import tools from '../../utils/tools';
import { NoDataTip } from '../no_data_tip/index'
class Tab {
  constructor(el, data, data_board) {
    this.name = "tab";
    this.el = el;
    this.data = data;
    this.data_board = data_board;
    this.NoDataTip = new NoDataTip();
  }
  async init() {
    await this.render();
    this.bindEvent();
  }
  async render() {

    await tools.append(this.el, tools.tplReplace(tpl(), {
      list: this.makeList()

    }))
    this.board = new Show_board(this.el, this.data_board);

    this.tab_row = document.getElementsByClassName("tab-row")[0];
    this.J_board = document.getElementsByClassName("J_board")[0];

    this.J_search = document.getElementById("J_search");
  }
  makeBoardList(flag) {

    if (flag == "all") {

      this.J_board.innerHTML = this.board.makeList(this.data_board);
    } else {
      const datas = this.data_board.filter((tmp) => {
        return tmp.field == flag
      })
      this.J_board.innerHTML = this.board.makeList(datas);
    }

  }

  makeBoardList_search(value) {
    let datas;
    return datas = this.data_board.filter((tmp) => {
      return tmp.phone_name.indexOf(value) != -1;
    })

  }
  makeList() {

    let list = "", data = this.data;
    data.forEach(res => {
      list += tools.tplReplace(itemTpl(), {
        series_name: res.series_name,
        field: res.field
      })
    });

    return list;
  }
  bindEvent() {
    const self = this;
    this.tab_row.onclick = (e) => {
      this.tabClick(e, self);
    }

    this.J_search.oninput = tools.throttle((e) => {
      self.tabInput(e, self);

    }, 500)

  }
  tabInput(e, self) {
    const tar = e.target,
      all = document.getElementsByClassName("tab-item");
    let datas;

    if (tar.value) {

      datas = self.makeBoardList_search(tar.value);
      //注意有很多问题 比如这个NoDataTip不应该在这引用
      //应该在J_board的组件那写一个没有找到的数据显示的模板
      //因为list.js 也要复用 这导致重复了可是我没有写J_board的组件上
      //所以很多累赘，不止这还有其他很多地方 因此为戒 所以页面渲染有不同状态的
      //都要写在该页面的组件上 方便复用
      if (datas.length == 0) {
        self.J_board.innerHTML = self.NoDataTip.tpl("没找到");
      } else {
        self.J_board.innerHTML = self.board.makeList(datas);
      }

    } else {
      Array.prototype.forEach.call(all, (tmp, id) => {
        if (id != 0) {
          tmp.classList.remove("current");
        } else {
          tmp.classList.add("current");
        }

      })

    }

  }
  tabClick(e, self) {

    const tar = e.target,
      children = self.tab_row.children,
      length = children.length;

    if (tar.tagName == "A") {
      for (let i = 0; i < length; i++) {
        children[i].classList.remove("current");
      }
      tar.parentElement.classList.add("current");

      const flag = tar.getAttribute("data-field");

      self.makeBoardList(flag);
    }

  }
}

export { Tab };