import { Data_index } from '../models/index'
import tools from '../utils/tools'
class App{
    constructor(el,options){
        this.el = tools.string_dom(el);
        this.swiper = options.swiper;
        this.phone = options.phone;
        this.field = options.field;
        this.cache = null;
      this.init();
    }
    async init() {
        await this.data();
        this.render();
      }
      async data() {
        const self=this;
        const data_index = new Data_index();
      self.cache = await data_index.getData({
          swiper: self.swiper,
          field: self.field,
          phone:  self.phone
        }); 
       /*  self.cache={
            swiper:data.swiper||null,
            field: data.field||null,
            phone: data.phone||null
        }
        */
      }
}
export{ App}