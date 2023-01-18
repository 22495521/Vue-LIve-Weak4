export default {
data(){
  return{

  }  
},
methods:{
  clickpage(page){
    if(page==="Previous"){
      page = "Previous"
    }else if(page=="Next"){
      page = "Next"
    }
      this.$emit('page',page);
    
  }
},
props:['pagination'],


template:`<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled:!pagination.has_pre}"><a class="page-link" href="#" @click.prevent="clickpage('Previous')">Previous</a></li>
    <li class="page-item" :class="{active:page===pagination.current_page}" v-for="(page,key) in pagination.total_pages" :key="page+'123'"><a class="page-link" href="#" @click.prevent="clickpage(key+1)">{{page}}</a></li>
    <li class="page-item" :class="{disabled:!pagination.has_next}"><a class="page-link" href="#" @click.prevent="clickpage('Next')">Next</a></li>
  </ul>
</nav>`

}