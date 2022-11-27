import React, { useEffect, useState } from "react";
import Bottom from "../../../components/Bottom";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify'
import { baseUrl, toastOptions } from "../../../components/data";
import Loading from "../../../components/Loading";
import { AiOutlineMore, AiOutlineCloseCircle } from "react-icons/ai";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { motion } from "framer-motion"
const Message = () => {
    const router = useRouter();

    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])


    const { user, admin } = useAuth();
    const [message, setMessage] = React.useState(null);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)
    const { id } = router.query





    useEffect(() => {


        axios.get(`${baseUrl}/message?id=${id}`).then((res) => {

            setLoading(false)
            setMessage(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [id, change])



    const handleDelete = () => {

        setLoading1(true)
        axios.delete(`${baseUrl}/message?id=${id}`).then((res) => {
            toast.success("message Deleted Sucessfull", toastOptions)
            setLoading1(false)
            setCheck(false)
            setChange(!change)
        }).catch((err) => {
            toast.error("Something went wrong", toastOptions)
            setLoading1(false)
        })


    }
    const handleRead = () => {

        setLoading2(true)
        axios.put(`${baseUrl}/message?id=${id}`).then((res) => {
            toast.success("Marked As Read", toastOptions)
            setLoading2(false)
            setChange(!change)

        }).catch((err) => {
            toast.error("Something went wrong", toastOptions)
            setLoading2(false)
        })


    }


    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />

        <Navbar />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]" >

            <div className="flex flex-col  tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">

                    {message ? <div className="h-auto w-full m-4 shadow-lg p-4">
                        <div className="flex items-center  w-full justify-between  shadow-md p-2 relative">
                            <img src={message.profile} className="w-[40px] h-[40px]  rounded-full" alt="" />
                            <h2>{message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}</h2>
                            <AiOutlineMore className="font-bold text-xl cursor-pointer" onClick={() => setOpen(!open)} />
                            <motion.div
                                initial={{
                                    display: 'none'
                                }}
                                animate={{
                                    display: open ? 'block' : 'none'

                                }}
                                className="absolute right-0 top-[50px] flex flex-col gap-3 p-4 bg-white shadow-lg  space-y-4">
                                <AiOutlineCloseCircle className="text-xl cursor-pointer " onClick={() => {
                                    setOpen(false)

                                }} />

                                {message.read ? <button className="w-full shadow-lg text-black  gap-4 items-cente p-2 rounded-md text-center cursor-pointer bg-white hover:bg-black hover:text-white"

                                >Already Read</button> : loading2 ? <button className="w-full shadow-lg text-black  gap-4 items-cente p-2 rounded-md text-center cursor-pointer bg-white"

                                >Loading...</button> : <button className="w-full  gap-4 items-center p-2 rounded-md  shadow-lg bg-white text-center cursor-pointer text-black hover:bg-black hover:text-white"
                                    onClick={() => handleRead()}
                                >Mark As Read</button>}
                                {loading1 ? <button className="w-full  gap-4 items-center p-2 rounded-md  shadow-lg bg-white text-center cursor-pointer text-black"


                                >Loading...</button> : <button className="w-full  gap-4 items-center p-2 rounded-md  shadow-lg bg-white text-center cursor-pointer text-black hover:bg-black hover:text-white"
                                    onClick={() => router.push(`/pedi/worker/${message.senderId}`)}
                                >View Worker</button>}

                            </motion.div>
                        </div>

                        <div className="flex flex-col  border-[1px] my-4 p-2  shadow-lg rounded-b-[20px] rounded-tr-[20px] gap-4">
                            <div className="flex  gap-4 ">
                                <span className="font-bold" >Message:</span> <span className="font-thin">{message.text}</span>
                            </div>
                            <div className="flex overflow-hidden items-center w-full justify-start  max-h-[250px] overflow-scr
                            
                            oll"><img src={message.url} alt="" className="object-cover max-h-[300px] w-full overflow-hidden" /></div>


                            <div className="flex px-8 gap-4 py-5">

                            </div>
                        </div>
                    </div> :
                        !loading ?



                            <Loading data="Message Prolly Deleted" />


                            :

                            <Loading data='loading...' />



                    }


                </div>
            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Message;
