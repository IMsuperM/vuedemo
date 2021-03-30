import axios from 'axios'; // 引入axios
import Router from '@/router/index'

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = isPro ? process.env.VUE_APP_API_URL : '/apis' // 'apis'：开发环境下的proxy设置的代理

if(process.env.NODE_ENV === 'production') {
  // 生产环境
  axios.defaults.baseURL = process.env.VUE_APP_API_URL; //这里是线上api请求地址
  console.log("axios.defaults.baseURL", axios.defaults.baseURL);  
}

// //http request 拦截器 添加token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || "";
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

//响应拦截器
axios.interceptors.response.use((response)=> {
  //获取更新的token(只有调用的了login接口，才会望请求头中写token)
  const { authorization } = response.headers;
  console.log("axios.interceptors.response.use ~ authorization", authorization);
  //如果token存在则存在localStorage
  authorization && localStorage.setItem('tokenName', authorization);
  return response;
},
(error)=> {
  if (error.response) {
    const { status } = error.response;
    //如果401或405则到登录页
    if (status == 401 || status == 405) {
      Router.push({path:'/login'})
    }
  }
  return Promise.reject(error);
}
);


// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

