import tpl from './tpl/wrapper.tpl'
import tpl_item from './tpl/item.tpl'
import tpl_control from './tpl/control.tpl'
import tpl_indicator from './tpl/indicator.tpl'
import tools from '../../utils/tools'
import './index.scss'
class Wrapper {
    constructor(el, cache) {
        this.name = "wrapper";
        this.cache = cache;
        this.el = el;
        this.length = cache.length;
        this.idx = 0;
        this.time = "";


    }
    async init() {
        await this.render();
        this.bindEvent();
    }
    bindEvent() {
        this.auto();
        this.wrapper_click();
        this.wrapper_mouseInOn();
    }
    wrapper_mouseInOn(){
       const self=this;
       this.wrapper[0].onmouseleave=(e)=>{this.setTime(e,self)};
       this.wrapper[0].onmouseenter=(e)=>{this.setTime(e,self)};
    } 
    setTime(e,self){
        const type=e.type;
        switch(type){
            case "mouseenter":
                
                clearInterval(self.time);
                break;
            case "mouseleave" :
                self.auto() ;
                 break;
        }
       
    }
    wrapper_click(){
        
        
      this.wrapper[0].onclick=(e)=>{
         const tar =e.target,
               className=tools.trimSpaces(tar.className);
               
               
       switch(className){

           case"car-control": 
           
           if(tar.getAttribute("data-dir")=="next"){
               
            this.run("next");
           }else{
            this.run("prev");
           }
           break;
           case"indicator-item" :
           let index= Array.prototype.indexOf.call(this.indicator,tar);
           this.idx=index;
            this.display(index);
           break;
       }
      }
    }
    auto() {
        
        this.time = setInterval(() => {
            this.run("next")
        }, 3000)
    }
    run(flag) {
        switch (flag) {
            case "prev":
                if(this.idx<=0){
                    this.idx=this.length-1;
                    
                 }else{
                    this.idx--;
                 }

                break;
            case 'next':
                 if(this.idx>=this.length-1){
                    this.idx=0;
                    
                 }else{
                    this.idx++;
                 }
                 
                break;
            default:
                break;
        }

       
        this.display(this.idx);
    }
    display(idx) {
      const items =this.items,
            indicator=this.indicator; 
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("active");
            indicator[i].classList.remove("current");
        }
        items[idx].classList.add("active");
        indicator[idx].classList.add("current");
    }
    render() {
        const self = this;
        tools.append(self.el,
            tools.tplReplace(tpl(), {
                list: self.renderlist(),
                indicatorW: self.length * 18,
                indicator: self.renderIndicator(),
                control: tpl_control()
            }))
        self.items = document.getElementsByClassName("car-item");
        self.indicator=document.getElementsByClassName('indicator-item');
        self.wrapper=document.getElementsByClassName('car-wrapper');
    }
    renderlist() {
        let list = "";
        this.cache.forEach((element, idx) => {
            list += tools.tplReplace(tpl_item(), {
                isActive: idx === 0 ? 'active' : '',
                swiper_img: element.pic,
                alt: element.alt,
            })
        });
        return list;
    }
    renderIndicator() {
        let indicator = ""
        for (let i = 0; i < this.length; i++) {
            indicator += tools.tplReplace(tpl_indicator(), {
                isCurrent: i === 0 ? 'current' : ''
            })
        }
        return indicator;
    }
}
export { Wrapper }