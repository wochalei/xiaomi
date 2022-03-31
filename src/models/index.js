import tools from '../utils/tools'
import {API}  from '../utils/config'
class Data_index{
    getData(options){
        const url = API.base_url+`getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;
      
  return tools.kuaiyu({
            url:url,
            callback:"cb"
        })  
     
    }
}
export {Data_index}