import navbar from "./navbar.js";

let productsDom = null;
let delProductModal=null;




const app = Vue.createApp({
    data(){
        return{
            url:'https://vue3-course-api.hexschool.io/v2',
            path:'biggo',
            products:{
            },
            alertTitle:0,
            alertProducts:{
                "imagesUrl": [],
            },
            pagination:{},
            page:1,
        }
    },
    components:{
        navbar
    },

    methods:{

        checkAPI(){
             //從cookie取得token
            var token = document.cookie.replace(/(?:(?:^|.*;\s*)bigtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            //把cookie放進header
            axios.defaults.headers.common['Authorization'] = token;
            //登入驗證
            axios.post(`${this.url}/api/user/check`)
                .then((res)=>{
                    this.getProducts()
                })
                .catch((error)=>{
                    //失敗傳送回login
                    document.location.href="login.html";
                })
        },

        changePage(page){
            if(page==="Previous"){
                this.page--
            }else if(page=="Next"){
                this.page++
            }else{
                this.page = page;
            }
            this.getProducts();
            
        },
        getProducts(page){
            axios.get(`${this.url}/api/${this.path}/admin/products/?page=${this.page}`)
            .then((res)=>{
                this.products = res.data.products;
                this.pagination = res.data.pagination;
                console.log(res);
            })
            .catch((error)=>{
                //失敗傳送回login
                console.log(error);
            })
        },

        openProducts(){
            this.alertProducts = {
                "imagesUrl": [],
            };
            productsDom.show();
        },
        enterProducts(data){
            //這區是有新增跟編輯
            if(data){
                console.log(data)
                this.alertProducts = data
            }

            if(this.alertProducts.id){
                 //此為編輯
                 axios.put(`${this.url}/api/${this.path}/admin/product/${this.alertProducts.id}`,{data:{...this.alertProducts}})
                 .then((res)=>{
                    productsDom.hide();
                    //刷新頁面
                    this.getProducts();
                 })
                 .catch((error)=>{
                    alert(error.data.message);
     
                 }) 
                 
            }
            else
            {   //此為新增
                axios.post(`${this.url}/api/${this.path}/admin/product`,{data:{...this.alertProducts}})
                .then((res)=>{
                    productsDom.hide();
                    //刷新頁面
                    this.getProducts();
                })
                .catch((error)=>{
                    alert(error.data.message);
                })  
            }
        },
        editData(id){
            this.alertTitle = 0;

            const data = Object.values(this.products);
            data.forEach((i)=>{
                if(i.id===id){
                    this.alertProducts={
                        ...i
                    }
                }
            })
            productsDom.show();
        },

        openDeleteDom(id){
            const data = Object.values(this.products);
            data.forEach((i)=>{
                if(i.id===id){
                    this.alertProducts={
                        ...i
                    }
                }
            })
            delProductModal.show();
        },

        DeleteData(){
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.alertProducts.id}`,{data:{...this.alertProducts}})
                 .then((res)=>{
                    delProductModal.hide();
                    //刷新頁面
                    this.alertProducts={
                        "imagesUrl": [],
                    };
                    this.getProducts();
                 })
                 .catch((error)=>{
                     console.log(error);
     
                 }) 
        }
    },
    mounted(){
        //抓取dom 元素
        productsDom  = new bootstrap.Modal(document.getElementById('productModal'));
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        
        this.checkAPI();
        
        
    }
})

app.component('productModal',{
    methods:{
        enterProducts(alertProductsData){
            this.$emit('alertProductsData', alertProductsData);
        },
        addAlertImg(){
            if(!this.alertProducts.imagesUrl){
                this.alertProducts.imagesUrl = [];
            }
            this.alertProducts.imagesUrl.push('');
        },
        deleteAlertImg(){
            this.alertProducts.imagesUrl.pop();
        },
    },
    props:['alertProducts'],
    template:'#product-template'
})

app.component('delproduct-template',{
    methods:{
        DeleteData(){
            this.$emit('DeleteData');
        }
    },
    template:'#delproduct-template'
})

app.mount('#app');