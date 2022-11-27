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
const Message = () => {
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading1(true)
        const text = e.target.text.value;
        const data = { text, senderId: worker._id, sender: worker.username, profile: worker.avatar }

        if (!file) {
            axios.post(`${baseUrl}/message`, data).then((res) => {
                setLoading1(false)
                toast.success("Message Sent Sucessfully", toastOptions);
                e.target.reset()

            }).catch((err) => {
                setLoading1(false)
                toast.error("There was an error", toastOptions);
            })
        }
        else {
            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/message/${name}`);

            uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {
                    data.url = url;
                    axios.post(`${baseUrl}/message`, data).then((res) => {
                        setLoading1(false)
                        toast.success("Message Sent Sucessfully", toastOptions);
                        e.target.reset()
                        setFile('')
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
    }




    return <div className=" min-h-full w-screen  relative ">
        <WorkerSide desk={true} />

        <WorkerNav />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav pb-[100px] px-4 ">


            <form className="flex flex-col gap-4 items-center mt-10 w-full "
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col text-green items-start w-full">
                    <label htmlFor="">Enter Message</label>
                    <input type="text" placeholder="Enter Message" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="text" />
                </div>
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



                {loading1 ? <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> SUBMIT</button>}



            </form>


        </div>
        <div>


        </div>



        <Bottom worker={true} />

        <ToastContainer />
    </div>;
};

export default Message;
