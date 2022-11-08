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
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from 'framer-motion'
const Index = () => {
    const router = useRouter();
    const { user, admin } = useAuth();
    const [farm, setFarm] = useState()
    const [open, setOpen] = useState(false);
    const [disease, setDisease] = React.useState();
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [change, setChange] = useState(false)
    const [farms, setFarms] = useState([]);
    const { id } = router.query




    // const handleEdit = () => {

    //     if (!farm) return;
    //     setLoading1(true)
    //     axios.put(`${baseUrl}/disease?id=${disease._id}`, { farm }).then((res) => {
    //         setLoading1(false)
    //         setOpen(false)
    //         setChange(!change)
    //         toast.success("Profile Updated Sucessfully", toastOptions);



    //     }).catch((err) => {
    //         setLoading1(false)
    //         toast.error("There was an error", toastOptions);
    //         console.log(err)
    //     })
    // }

    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin])

    useEffect(() => {

        axios.get(`${baseUrl}/tomato?id=${id}`).then((res) => {

            setLoading(false)
            setDisease(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [id, change])
    const handleDelete = () => {
        const corfirm = window.confirm("Are you sure you want to delete this disease?")
        if (corfirm) {
            setLoading1(true)
            axios.delete(`${baseUrl}/disease?id=${id}`).then((res) => {
                toast.success("disease Deleted Sucessfull", toastOptions)
                setLoading1(false)

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
                    <h1 className="text-3xl font-bold  text-green" >diseases</h1>
                    <div className="overflow-x-auto w-full md:px-8 shadow-lg p-2">
                        {
                            disease ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">


                                <div className=" flex  gap-2 w-full   h-auto flex-col py-4      rounded-lg   ">
                                    <div className="  w-full h-[300px]" >
                                        <img src={disease.url} alt="" className=" h-[90%]  w-full object-cover" />
                                    </div>
                                    <div cl
                                        assName="flex flex-col  px-4 flex-2  gap-2">
                                        <div className="grid grid-cols-2">
                                            <div className="flex w-full  p items-center gap-2"><span className="font-bold text-[18px]">Disease:</span> <span className=" text-[18px]">{disease.diseases}</span> </div>

                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Causes:</span> <span className=" text-[18px]">{disease.causes}</span> </div>


                                        </div>

                                        <div className="flex gap-1 ">
                                            <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                                onClick={() => setOpen(true)}
                                            >Change Farm</button>
                                            <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer" onClick={() => {
                                                handleDelete()
                                            }}>Delete disease</button>


                                        </div>

                                    </div>

                                </div>

                            </div> : !loading ?



                                <Loading data="disease does Not exist or it has been deleted" />


                                :

                                <Loading data='loading...' />



                        }

                    </div>


                </div>
            </div>

        </div>
        <motion.div
            initial={{ x: '-200%' }}
            animate={
                {
                    x: open ? 0 : '-200%',
                    transition: {
                        duration: 0.5


                    },
                }
            }
            className="fixed items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto bg-[rgba(0,0,0,.9)] items-center">

            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-full">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                    setOpen(false)

                }} />

                <h1 className="text-2xl font-semibold text-center">Change disease Farm</h1>

                <div className="flex flex-col gap-2">
                    <select name="" id="" className="p-4 shadow-lg outline-none cursor-pointer" onChange={(e) => setFarm(e.target.value)} >
                        <option value="" disabled>Select Farm</option>
                        {farms?.map((farm) => (<option key={farm._id} className="cursor-pointer" value={farm.name}>{farm.name}</option>))}

                    </select>
                    <button className="text-bold p-2 bg-green text-white w-full" onClick={''}>{loading1 ? "Loading...." : "Submit"}</button>
                </div>

            </div>
        </motion.div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Index;
