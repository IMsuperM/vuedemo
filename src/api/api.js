import {post,fetch,patch,put} from './http'

export function login(){
    fetch('/api/users/login',{name:'11',password:'123'}).then(res=>{
        console.log(res)
    })
}


export function test(){
    fetch('/api/users/test',{name:'11',password:'123'}).then(res=>{
        console.log(res)
    })
}