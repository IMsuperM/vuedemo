const login = {
    state :{
       testData:'我是从store中获取的数据'
    },
    getters:{
       testData:(state) =>state.testData 
    },
    actions:{
       getOrderQueryList(){
           console.log('我调用到了store里面的方法')
       }
    },
    mutations:{},
}
export default login