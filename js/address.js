new Vue({
    el:'#app',    
    data:{
        title:'配送地址',
        addressList:[]
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddress()
        });    
    },
    methods:{
        getAddress(){
            this.$http.get('data/address.json').then(
                response => {
                    var res = response.data;
                    
                    if(res.status == 0){
                        this.addressList = res.result;
                    }
                }
            );
            
           
        }    
    }
})