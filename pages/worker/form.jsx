import React, { useEffect } from "react";
import Bottom from "../../components/Bottom";
import WorkerNav from "../../components/WorkerNav";
import { useAuth } from "../../context/AuthContext";
import { cards } from "../../components/data";
import { Router, useRouter } from "next/router";
import { BiEditAlt } from "react-icons/bi";
import WorkerSide from "../../components/WorkerSide";
import Image from "next/image";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import { baseUrl, toastOptions } from "../../components/data";
import { toast, ToastContainer } from "react-toastify";
import { AiFillCamera, AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from 'framer-motion'
const Index = () => {
    const { admin, worker } = useAuth();
    const [file, setFile] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState()
    const [result, setResult] = React.useState()
    const [open1, setOpen1] = React.useState(false);
    const [prediction, setPrediction] = React.useState()
    const [loading1, setLoading1] = React.useState(false)
    const [img, setImg] = React.useState(true)

    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])


    const handleUpload = async (e) => {
        setLoading1(true)
        let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
        const fileRef = ref(storage, `/worker/${name}`);
        let form = new FormData();
        form.append('file', file);
        uploadBytes(fileRef, file).then((res) => {
            getDownloadURL(res.ref).then((url) => {

                axios.post(`${baseUrl}/uploads`, { url, disease: prediction, workerId: worker._id }).then((res) => {
                    setLoading1(false)
                    toast.success("Upload Was A Sucess", toastOptions);
                    console.log(res.data)
                }).catch((err) => {
                    setLoading1(false)
                    toast.error("There was an error", toastOptions);
                })
            })
        }).catch((err) => {
            setLoading1(false)
            toast.error("There was an error", toastOptions);
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!file) {
            toast.error('Please upload a photo', toastOptions)
            setLoading(false)
            return;

        }

        let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
        const fileRef = ref(storage, `/worker/${name}`);
        let form = new FormData();
        form.append('file', file);
        axios.post('http://127.0.0.1:5000/predict', e.target).then((res) => {
            setOpen1(true)
            setResult(res.data)

        })
        axios.put('http://127.0.0.1:5000/predict', e.target).then((res) => {

            setPrediction(res.data)
        })

        setLoading(false)


    }


    return <div className=" min-h-full w-screen  relative ">
        <WorkerSide desk={true} />

        <WorkerNav />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav pb-[100px] px-4 ">


            <form className="flex flex-col gap-4 items-center mt-10 w-full "
                onSubmit={handleSubmit}
            >

                <div className="flex flex-col text-green items-start w-full">
                    <label htmlFor="image">Upload Image</label>
                    <label type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none flex items-center justify-center" required name="file" htmlFor="image">
                        <AiFillCamera className="text-4xl" /> {file ? file.name.toUpperCase() : 'Pick Image or Take Photo'}
                    </label>
                    <input type="file" id="image" className="hidden " name="file" accept="image/*" onChange={(e) => {
                        setFile(e.target.files[0])
                        setImg(true)
                    }} />
                    {file && img && <div className="flex relative justify-center w-full my-5 max-h-[250px]">
                        <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-0 left-[50%] translate-x-[-50%] cursor-pointer" onClick={() => {
                            setImg(false)

                        }} />
                        <img src={URL.createObjectURL(file)} alt="" className="object-cover" />

                    </div>}
                </div>



                {loading ? <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> SUBMIT</button>}



            </form>


        </div>
        <div>


        </div>
        {
            result && <motion.div
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

                        className="text-2xl font-semibold text-center">Result</motion.h1>
                    <div className="flex flex-col">
                        <motion.div
                            initial={{
                                x: '100%'
                            }}
                            animate={{

                                x: 0
                            }}
                        >

                            <div className="flex flex-col">
                                <div className="flex items-center w-full justify-center  max-h-[250px] overflow-scr
                            
                            oll"><img src={URL.createObjectURL(file)} alt="" className="max-h-[250px]" /></div>

                                <div dangerouslySetInnerHTML={{ __html: result }} className="mt-5"></div>
                                {loading1 ? <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                >Loading...</button> : <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                    onClick={() => handleUpload()}
                                >Send To Admin</button>}
                            </div>



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
