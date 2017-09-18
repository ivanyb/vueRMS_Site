import jQuery from 'jquery'
import '../../statics/site/js/magnifier.js'

export default {
  deep: true,
  bind () {},
  update (el) {    
    // Destroy in case it has been initialized already.
    setTimeout(function(){
    jQuery(el).imgzoon({magnifier:el});  
    },1000) 
  },

  unbind () {
   
  }
}