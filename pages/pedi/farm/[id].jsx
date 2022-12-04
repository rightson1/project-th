import React, { useEffect, useState } from "react";
import Bottom from "../../../components/Bottom";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify'
import { baseUrl, toastOptions } from "../../../components/data";
import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from 'framer-motion'
import Header from "../../../components/Header";
const Index = () => {
    const router = useRouter();
    const { user, admin } = useAuth();
    const [farm, setFarm] = React.useState();
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false)
    const [values, setValues] = useState()
    const [file, setFile] = useState(null)
    const { id } = router.query


    useEffect(() => {
        if (!admin) {
            router.push('/')
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

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleDelete = () => {
        const corfirm = window.confirm("Are you sure you want to delete this farm?")
        if (corfirm) {
            setLoading1(true)
            axios.delete(`${baseUrl}/farm?id=${id}`).then((res) => {
                toast.success("Farm Deleted Sucessfull", toastOptions)
                setLoading1(false)

                setChange(!change)
            }).catch((err) => {
                toast.error("Something went wrong", toastOptions)
                setLoading1(false)
            })

        }


    }
    const handleEdit = (e) => {
        e.preventDefault();
        setLoading3(true)

        if (!file) {

            axios.put(`${baseUrl}/farm?id=${id}`, values).then((res) => {
                setLoading3(false)

                toast.success("Farm Edited Successfully", toastOptions);

                e.target.reset()
                setChange(!change)

            }).catch((err) => {
                setLoading3(false)
                toast.error("There was an error", toastOptions);
            })


        } else {
            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/farm/${name}`);
            uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {

                    const data = { ...values, image: url, pic: name }
                    axios.put(`${baseUrl}/farm?id=${id}`, data).then((res) => {
                        setLoading3(false)

                        toast.success("Farm Edited Successfully", toastOptions);

                        e.target.reset()
                        setChange(!change)

                    }).catch((err) => {
                        setLoading3(false)
                        toast.error("There was an error", toastOptions);
                    })

                }).catch((err) => {
                    setLoading3(false)
                    console.log(err);
                });
            })



        }
    }



    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />

        <Navbar add={true} />
        <Header title={farm ? farm.name : "Farm"} />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col px-8 tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Farms</h1>
                    <div className="overflow-x-auto w-full md:px-8">
                        {
                            farm ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">


                                <div className=" flex  gap-2 w-full   h-auto flex-col py-4  shadow-lg    rounded-lg   ">
                                    <div className="  w-full h-[300px]" >
                                        <motion.img src={farm?.image ? farm.image : "/farm.jpg"}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: '-.6deg'
                                            }}

                                            alt="" className=" h-[90%] object-cover w-full cursor-pointer" />
                                    </div>
                                    <div cl
                                        assName="flex flex-col  px-4 flex-2  gap-2">
                                        <div className="grid grid-cols-2">
                                            <div className="flex w-full  p items-center gap-2"><span className="font-bold text-[18px]">Name:</span> <span className=" text-[18px]">{farm.name}</span> </div>

                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Location:</span> <span className=" text-[18px]">{farm.location}</span> </div>
                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Size:</span> <span className=" text-[18px]">{farm.size}</span> </div>
                                            <div className="flex w-full   items-center gap-2"><span className="font-bold text-[18px]">Crops:</span> <span className=" text-[18px]">{farm.crops}</span> </div>


                                        </div>

                                        <div className="flex gap-1 w-full justify-center ">

                                            <button className="w-auto px-4 my-4 gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer hover:bg-transparent hover:shadow-lg hover:text-black duration-[100] transition-all" onClick={() => {
                                                handleDelete()
                                            }}>Delete Farm</button>


                                            <button className="w-auto px-4 my-4 gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer  hover:bg-transparent hover:shadow-lg hover:text-black duration-[100] transition-all" onClick={() => {
                                                setOpen(true)
                                            }}>Edit Farm</button>


                                        </div>

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

            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-full max-w-[600px]">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                    setOpen(false)
                    setLoading3(false)

                }} />

                <h1 className="text-2xl font-semibold text-center">Edit Farm</h1>

                <form className="flex flex-col gap-2" onSubmit={handleEdit}>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Location</label>
                        <input type="text" placeholder="Enter Location " onChange={handleChanges} className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" name="location" />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Size</label>
                        <input type="text" placeholder="Enter Size" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" onChange={handleChanges} name="size" />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Crops</label>
                        <input type="text" placeholder="Enter Quantity (optional)" onChange={handleChanges} className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="crops" />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="image">Product Image</label>
                        <label type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none flex items-center justify-center" name="price" htmlFor="image">
                            <BiImageAdd className="text-4xl" /> {file ? file.name : "Pick Image"}
                        </label>
                        <input type="file" id="image" className="hidden " name="image" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

                    </div>

                    {loading3 ? <button className="bg-green py-3 px-4 text-white rounded-md w-full flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-full flex justify-center items-center gap-2 "> SUBMIT</button>}
                </form>
            </div>
        </motion.div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Index;
