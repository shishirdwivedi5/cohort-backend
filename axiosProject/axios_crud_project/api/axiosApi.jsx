import axios from 'axios'


export const API = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/"
})

//get data 
export const getdata = ()=>{
 return   API.get("/posts")
}
// delete hethod
export const deletedata = (id)=>{
    return API.delete(`/posts/${id}`)
}
// post method
export const postData = (post) =>{
    return API.post('/posts',post)
}



// json placeholder 