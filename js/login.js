const app = Vue.createApp({
    data(){
       return{
        userType:{
            "username": "",
            "password": "",
          }
       }
    },
    methods:{
        login(){

            const url='https://vue3-course-api.hexschool.io/v2';
            axios.post(`${url}/admin/signin`, this.userType)
                .then((res)=>{
                    const {token,expired} = res.data
                    //存入cookie
                    document.cookie = `bigtoken=${token}; expired=${expired}`;
                    //傳送至別的網頁
                    
                    //從cookie取得token//從cookie取得token
                    document.location.href="products.html";

                })
                .catch((error)=>{
                    console.log(error);
                    alert('帳號密碼錯誤');
                })
        }
    },
    mounted(){
    }
})


app.mount('#app');