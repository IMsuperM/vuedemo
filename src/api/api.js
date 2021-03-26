import {post,fetch,patch,put} from './http'

export function login(){
    fetch('/login',{name:'11',password:'123'}).then(res=>{
        console.log(res)
    })
}