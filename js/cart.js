var vm = new Vue({
    el:'#app',
    data:{
        title:'购物车',
        productList:[],
        totalMoney:0,
        checkFlag:false,
        delFlag:false,
        curProduct:''
    },
    filters:{
        formatMoney(val){
            return  `￥${val.toFixed(2)}`;     
        },
        Money(val){
            return  `${val.toFixed(2)}元`;     
        }
    },
    mounted:function(){
        this.getList();    
    },
    methods:{
        getList(){
            this.$http.get("data/cartData.json").then(
                res=>{
                    this.productList = res.body.result.list;
//                    this.totalMoney = res.body.result.totalMoney;
                }
            );
        },
        changeMone(product,way){
            if(way>0){
                product.productQuantity ++;  
            }else{
                product.productQuantity --;
                if(product.productQuantity < 1){
                    product.productQuantity =1;
                }
            }
            
            this.calcToalPrice();
        },
        selectedProduct(product){
            if(typeof product.checked == "undefined"){
                this.$set(product,'checked',true);                 
            }else{
                product.checked = !product.checked;    
            }
            
            this.calcToalPrice();
        },
        checkAll(){
            var _this = this;
            this.checkFlag = !this.checkFlag;  
            
            this.productList.forEach(function(item,index){
                if(typeof item.checked == "undefined"){
                    _this.$set(item,'checked',_this.checkFlag); 
                    
                }else{
                    item.checked = _this.checkFlag;    
                }    
            })
            
            this.calcToalPrice();
        },
        calcToalPrice(){
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item,index){
                
                if(item.checked){
                    console.log(item.productQuantity)
                    _this.totalMoney += item.productPrice * item.productQuantity    
                }
            })     
        },
        delConfirm(pro){
            this.delFlag = true;
            this.curProduct = pro;
        },
        delProduct(){
            var index = this.productList.indexOf(this.curProduct);  
            this.productList.splice(index,1);
            
            this.delFlag = false;
        }
    },
    
});