class CardOrder{
    constructor(){
        this.name='CardOrder';
    }
         //这个是把obj数据存到订单中
        add_order(obj){
            let cardData= localStorage.getItem("cardOrder");
            
              if(!cardData){
                  cardData=[];
              }else{
                cardData=JSON.parse(cardData);
             }
             cardData.push(obj);
             localStorage.setItem("cardOrder",JSON.stringify(cardData)) 
        }  
        //这个是移除购物车里的某个id
        delete_card(orderId){
            let data=JSON.parse(localStorage.getItem("cardData"));
           data= data.filter((item)=>{
                 return item.orderId!=orderId;
              })
              localStorage.setItem("cardData",JSON.stringify(data));
          }
}
export {CardOrder}