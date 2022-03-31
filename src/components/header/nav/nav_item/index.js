import tpl from './nav_item.tpl'
import tools from '../../../../utils/tools'
class Nav_item{
     constructor(cache){
         this.name="nav_item";   
        this.cache=cache.field_data;
     } 
   getTpl(){
     let list="",data=this.cache;
      data.forEach( res => {
        list+=tools.tplReplace(tpl(),{
          seriesName:res.series_name,
          field:res.field
        })
      });
     return list;
   }
}
export{Nav_item}