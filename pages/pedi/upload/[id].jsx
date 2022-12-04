import React, { useEffect, useState } from "react";
import Bottom from "../../../components/Bottom";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify'
import { baseUrl, toastOptions } from "../../../components/data";
import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import Header from "../../../components/Header";
const Index = () => {
    const router = useRouter();

    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])


    const { user, admin } = useAuth();
    const [upload, setUUpload] = React.useState(null);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [change, setChange] = useState(false)
    const [result, setResult] = useState()
    const [deleteId, setDeleteId] = useState("");
    const { id } = router.query


    useEffect(() => {


        axios.get(`${baseUrl}/uploads?id=${id}`).then((res) => {

            setLoading(false)
            setUUpload(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [id, change])

    useEffect(() => {
        if (!upload) return;
        if (upload.read) return;
        axios.put(`${baseUrl}/uploads?id=${id}`).then((res) => {

            setLoading2(false)
            setChange(!change)

        }).catch((err) => {

            setLoading2(false)
        })
    }, [upload])



    useEffect(() => {
        if (!upload) return

        axios.patch('http://127.0.0.1:5000/predict', { disease: upload.disease }).then((res) => {

            setResult(res.data)

        })

    }, [upload])

    const handleDelete = () => {

        setLoading1(true)
        axios.delete(`${baseUrl}/uploads?id=${id}`).then((res) => {
            toast.success("Upload Deleted Sucessfull", toastOptions)
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
        axios.put(`${baseUrl}/uploads?id=${id}`).then((res) => {

            setLoading2(false)
            setChange(!change)

        }).catch((err) => {

            setLoading2(false)
        })


    }


    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />

        <Navbar add={true} />
        <Header title="Message" />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col  tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >upload</h1>
                    {upload ? <div className="overflow-x-auto w-full">
                        <div className="flex flex-col">
                            <div className="flex items-center w-full justify-center  max-h-[250px] overflow-scr
                            
                            oll"><img src={upload.url} alt="" className="object-cover" /></div>

                            <div dangerouslySetInnerHTML={{ __html: result }} className="mt-5"></div>
                            <div className="flex px-8 gap-4 py-5">
                                {/* {upload.read ? <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                >Already Read</button> : loading2 ? <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                >Loading...</button> : <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                    onClick={() => handleRead()}
                                >Mark As Read</button>} */}
                                {loading1 ? <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                >Loading...</button> : <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                    onClick={() => router.push(`/pedi/worker/${upload.workerId}`)}
                                >View Worker</button>}
                            </div>
                        </div>
                    </div> :
                        !loading ?



                            <Loading data="Upload Prolly Deleted" />


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

export default Index;
