import React, { useEffect, useState } from "react";
import Bottom from "../../../components/Bottom";
import WorkerNav from "../../../components/WorkerNav";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify'
import { baseUrl, toastOptions } from "../../../components/data";
import Loading from "../../../components/Loading";
import WorkerSide from "../../../components/WorkerSide";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { storage } from "../../../firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { motion } from 'framer-motion'
const Index = () => {
    const router = useRouter();
    const { user, admin } = useAuth();
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [disease, setDisease] = React.useState();
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [change, setChange] = useState(false)
    const [farms, setFarms] = useState([]);
    const [values, setValues] = useState();
    const { id } = router.query



    useEffect(() => {
        if (!admin) {
            router.push('/')
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


    return <div className=" h-screen w-screen  relative">
        <WorkerSide desk={true} />

        <WorkerNav worker={true} add={true} />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col px-8 tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Diseases</h1>
                    <div className="overflow-x-auto w-full md:px-8 shadow-lg p-2 rounded-lg">
                        {
                            disease ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">


                                <div className=" flex  gap-2 w-full   h-auto flex-col py-4      rounded-lg   md:flex-row">
                                    <div className="  w-full h-[300px] flex-1" >
                                        <img src={disease.url} alt="" className=" h-[90%]  w-full object-cover" />
                                    </div>
                                    <div className="flex flex-col  px-4 flex-2  gap-2 flex-1">
                                        <div className="grid grid-cols-1 gap-2 py-3">
                                            <div className="flex w-full  p items-center gap-2"><span className="font-bold text-[18px]">Disease:</span> <span className=" text-[18px]">{disease.diseases}</span> </div>

                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Causes:</span> <span className=" text-[18px]">{disease.causes}</span> </div>


                                        </div>

                                        <div className="flex gap-1  flex-wrap">
                                            <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                                onClick={() => setOpen1(true)}
                                            >View Details</button>



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

        {
            disease && <motion.div
                initial={{ x: '-200%' }}
                animate={
                    {
                        x: open1 ? 0 : '-200%',
                        transition: {
                            duration: 0.5


                        },
                    }
                }
                className="fixed  top-0 left-0  h-full p-4  w-full z-20  flex  justify-center pt-8  bg-[rgba(0,0,0,.9)] items-center  flex-col ">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-0 left-[50%] translate-x-[-50%] cursor-pointer" onClick={() => {
                    setOpen1(false)

                }} />
                <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-full md:w-[85%] h-[80%] overflow-y-auto overflow-x-hidden pb-[200px]">


                    <motion.h1
                        initial={{
                            x: '-100%'
                        }}
                        animate={{

                            x: 0
                        }}

                        className="text-2xl font-semibold text-center">{disease.diseases} Details</motion.h1>
                    <div className="flex flex-col">
                        <motion.div
                            initial={{
                                x: '100%'
                            }}
                            animate={{

                                x: 0
                            }}
                        >
                            <h1 className="text-green capitalize font-bold text-xl">Cause</h1>
                            <p>{disease.causes}</p>
                        </motion.div>
                        <motion.div
                            initial={{
                                x: '100%'
                            }}
                            whileInView={{

                                x: 0
                            }}
                        >
                            <h1 className="text-green capitalize font-bold text-xl">Symptoms</h1>
                            <p>{disease.symptoms}</p>
                        </motion.div>
                        <motion.div
                            initial={{
                                x: '-100%'
                            }}
                            whileInView={{

                                x: 0
                            }}
                        >
                            <h1 className="text-green capitalize font-bold text-xl">Comments</h1>
                            <p>{disease.comments}</p>
                        </motion.div>
                        <motion.div
                            initial={{
                                x: '-100%'
                            }}
                            whileInView={{

                                x: 0
                            }}
                        >
                            <h1 className="text-green capitalize font-bold text-xl">Management</h1>
                            <p>{disease.management}</p>
                        </motion.div>
                    </div>



                </div>
            </motion.div>
        }

        <Bottom worker={true} />

        <ToastContainer />
    </div>;
};

export default Index;
