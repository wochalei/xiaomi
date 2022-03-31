;(function(){
  //思路 轮播图拆解  
  /* 1. 前提 注意效果写在类 js添加类实现效果变化
     2.它效果是 每几秒 就出现一次效果 
      那么分函数 写效果的函数  那么什么时候用这个呢 得选个标志 
      这里可以看出 它是一张一张变化的 刚好数组下标 那么就设个数累加
      效果函数呢就是接收这个数 把这个数作为dom对象数组 确定哪个对象使用效果函数  
     每几秒实现就 定时器去每几秒对数字加1就好了
     3.至于绑定函数就 最好事件代理
      
  */
  class Carousel{
      constructor(){
          this.name= 'carousel';
          this.number=0;
          this.length=0;
      }
      init(){
        this.bindEvent();
      }
      bindEvent(){
       const self=this, 
       
       Jcontain=document.getElementsByClassName("Jcontain")[0];
       
         //其他函数要用就this添加
       this.carousel_imges_item=document.getElementsByClassName('carousel-imges-item');
       this.carousel_dot_item=document.getElementsByClassName('carousel-dot-item');
       this.carousel_button=document.getElementsByClassName("carousel-button");
       this.length=this.carousel_imges_item.length;
       this.autoRunning(); 
       //事件代理绑定函数方便 而且注意switch用法代码清晰
       Jcontain.onclick=(e)=>{self.button_dot_click(e);}  
       Jcontain.onmouseenter=(e)=>{self.mouseMove(e);}
       Jcontain.onmouseleave=(e)=>{self.mouseMove(e);}
       
      }

      mouseMove(e){
        //e.type注意是这个知道当前是什么事件 switch结构就明了
         const type =e.type;
        switch (type){
          case "mouseenter":
            clearInterval(this.time);
            break;
          case "mouseleave":
            this.autoRunning(); 
            break;
          default:break;
        }
      }
      button_dot_click(e){
          const tar =e.target;
          //这里不能用switch 因为我html写的时候有多个类名 如果直接获取类名就不匹配了
          //只能用   classList.contains                  
          if(tar.classList.contains("carousel-button")){
            this.move(tar.getAttribute("data-flag"));   
          }
          if(tar.classList.contains("carousel-dot-item")){
              let number= Array.prototype.indexOf.call(this.carousel_dot_item,tar);
              this.number=number;
              this.changeClassName(number);
          }
          
      }
      
      autoRunning(){
        const self =this;
       self.time=setInterval(()=>{
          self.move("next");
         },2000)
      }
      //移动位置
      move(flag){
        switch (flag){
          case "prev":
            if(this.number<=0){
              this.number=this.length-1;
            }else{
              this.number--;
            }
            break;
          case "next":
            if(this.number>=this.length-1){
              this.number=0;
            }else{
              this.number++;
            }
            break;
          default:
            break;  
        }
           this.changeClassName(this.number)    
      }
      //效果改变
      changeClassName(number){
       const length= this.length,
       carousel_imges_item=this.carousel_imges_item,
       carousel_dot_item=this.carousel_dot_item;
         for(let i=0;i<length;i++){
           carousel_imges_item[i].classList.remove("current");
           carousel_dot_item[i].classList.remove("choose");     
         }
         carousel_imges_item[number].classList.add("current");
         carousel_dot_item[number].classList.add("choose");
        
      }
  }


  window.Carousel=Carousel;
})()