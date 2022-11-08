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
const Index = () => {
    const router = useRouter();
    const { user, admin } = useAuth();
    const [farm, setFarm] = React.useState();
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [change, setChange] = useState(false)
    const [check, setCheck] = useState(false);
    const { id } = router.query
    const [deleteId, setDeleteId] = useState("");





    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin])

    useEffect(() => {

        axios.get(`${baseUrl}/farm?id=${id}`).then((res) => {

            setLoading(false)
            setFarm(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [id, change])
    const handleDelete = () => {
        const corfirm = window.confirm("Are you sure you want to delete this farm?")
        if (corfirm) {
            setLoading1(true)
            axios.delete(`${baseUrl}/farm?id=${id}`).then((res) => {
                toast.success("Farm Deleted Sucessfull", toastOptions)
                setLoading1(false)
                setCheck(false)
                setChange(!change)
            }).catch((err) => {
                toast.error("Something went wrong", toastOptions)
                setLoading1(false)
            })

        }


    }


    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />

        <Navbar add={true} />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col px-8 tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Farms</h1>
                    <div className="overflow-x-auto w-full md:px-8">
                        {
                            farm ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">


                                <div className=" flex  gap-2 w-full   h-auto flex-col py-4  shadow-lg    rounded-lg   ">
                                    <div className="  w-full h-[300px]" >
                                        <img src={farm?.image ? farm.image : "/farm.jpg"} alt="" className=" h-[90%] object-cover w-full" />
                                    </div>
                                    <div cl
                                        assName="flex flex-col  px-4 flex-2  gap-2">
                                        <div className="grid grid-cols-2">
                                            <div className="flex w-full  p items-center gap-2"><span className="font-bold text-[18px]">Name:</span> <span className=" text-[18px]">{farm.name}</span> </div>

                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Location:</span> <span className=" text-[18px]">{farm.location}</span> </div>
                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Size:</span> <span className=" text-[18px]">{farm.size}</span> </div>
                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Crops:</span> <span className=" text-[18px]">{farm.crops}</span> </div>


                                        </div>

                                        <button className="flex gap-1 ">
                                            <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                            >Order</div>
                                            <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer" onClick={() => {
                                                handleDelete()
                                            }}>Delete Farm</button>


                                        </button>

                                    </div>

                                </div>

                            </div> : !loading ?



                                <Loading data="Farm does Not exist or it has been deleted" />


                                :

                                <Loading data='loading...' />



                        }

                    </div>


                </div>
            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Index;
