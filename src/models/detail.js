//专门给Detail页面设一个和后端提交数据等信息创个文件
//使的文件区分开来方便管理
//这里那localStorage模拟
class Detail_data{
    constructor(){
        this.name="detail_data";
    }
    //这里数据添加购物车 重复的就提示 注意localStorage存字符串 所以时刻要JSON.stringify
    //拿出来的时候 我设置的是数组所以还要JSON.parse 
    add_card(obj){
    let cardData= localStorage.getItem("cardData");
    
      if(!cardData){
          cardData=[];
      }else{
        cardData=JSON.parse(cardData);
     }   
     
     let _cardData=cardData.filter((item)=>{
         if(item.id==obj.id){
             if(item.version==obj.version&&item.color==obj.color){
                 return true;
             }
         }
     })
     //如果有则有重复的 提示已添加购物车
     if(_cardData.length<=0){
         //只接收字符串 注意我拿数组存所以记得push 我这里傻了以为push后返回push后的数组 
         //但不是 只返回push是不是成功的标志
         cardData.push(obj);
        localStorage.setItem("cardData",JSON.stringify(cardData));
        alert("添加成功")
     }else{
         alert("已经重复添加")
     }
      
    }
   
    
}
export{Detail_data}