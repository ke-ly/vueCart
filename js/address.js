new Vue({
    el:'#app',    
    data:{
        title:'配送地址',
        addressList:[],
        limitNum:3,
        showFlag:false,
        currentIndex:0,
        shipping:1
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddress()
        });    
    },
    computed:{
        filterAdderss(){
            return this.addressList.slice(0,this.limitNum)
        }
    }
    ,
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
        },
        showMore(){
            if(this.showFlag){
                this.showFlag = false;
                this.limitNum = 3;
            }else{
                this.showFlag = true;
                 this.limitNum = this.addressList.length;    
            }
           
        },
        setDefault(id){
            this.addressList.forEach(function(item,index){
                if(item.addressId == id){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;    
                }
            })    
        }
    }
})