
import React, { useEffect, useState } from 'react'
// import { API } from '../api/axiosApi'
import { deletedata, getdata, postData } from '../api/axiosApi'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'



const Postdata = () => {

    //     const [data, setData] = useState([])

    //    const fun = async()=>{
    //        const res = await API('/posts')
    //        console.log(res.data)
    //        setData(res.data)
    //    }
    //      useEffect(() => {
    //        fun()
    //      }, [])

    const [data, setData] = useState([
    
    ])

    const getpostdata = async () => {
        const res = await getdata()
        console.log(res.data)
        setData(res.data)
    }

    useEffect(() => {
        getpostdata()
    }, [])


    // maping bahar kene pr 
    // const render = data.map((curelem)=>{
    //     return <>
    //     <li>{curelem.id}</li>
    //     <h2>{curelem.body}</h2>
    //     </>
    // })

    const deleteHandeler = async (id) => {
        try {
            const del = await deletedata(id)
            if (del.status == 200) {
                const itemremov = data.filter((elem) => elem.id != id)
                setData(itemremov)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const { register, handleSubmit, reset, error } = useForm()
    

    const onsubmit = (fmData) => {
        fmData.id = nanoid()
        fmData.preventDefault
        console.log(fmData)
        
        const copidata = data
        copidata.push(fmData)
        setData(copidata)
        console.log(data)

        reset()


    }

    const submitdata = async (post) => {
        const res = await postData(post)
        console.log(res)
  if (res.status === 201){
 setData([...data,res])
        

  }

    }




    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} className='flex gap-2 bg-blue-400  items-center justify-center'>
                <input {...register("title")} className=' outline-none border-none bg-black text-2xl text-white' type='text' />
                <input {...register("body")} className=' outline-none border-none text-2xl bg-black text-white' type='text' />
                <button onClick={() => submitdata()} className='bg-red-400 text-white px-2 py-1 '>Add Data</button>
            </form>


            <section className='flex  bg-amber-400'>
                <ul>

                    {data.map((curElem) => {
                        const { title, body } = curElem
                        return <li key={nanoid()}>
                            <h1>{nanoid()}</h1>
                            <h2>{title}</h2>
                            <p>{body}</p>
                            <button onClick={() => deleteHandeler()}>delete</button>
                        </li>
                    })}
                </ul>






            </section>

        </>
    )
}

export default Postdata