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
const Index = () => {
    const { admin, worker } = useAuth();
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        console.log(file)
    }, [file])

    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)


        if (!file) {

            axios.put(`${baseUrl}/worker?id=${worker._id}`, values).then((res) => {
                setLoading(false)

                toast.success("Profile Updated Sucessfully", toastOptions);

                e.target.reset()

            }).catch((err) => {
                setLoading(false)
                toast.error("There was an error", toastOptions);
            })


        } else {
            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/worker/${name}`);
            uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {

                    const data = { ...values, avatar: url, pic: name }
                    axios.put(`${baseUrl}/worker?id=${worker._id}`, data).then((res) => {
                        setLoading(false)

                        toast.success("Profile Updated Sucessfully", toastOptions);

                        e.target.reset()

                    }).catch((err) => {
                        setLoading(false)
                        toast.error("There was an error", toastOptions);
                    })
                }).catch((err) => {
                    setLoading(false)
                    console.log(err);
                });
            })



        }
    }

    return <div className=" min-h-full w-screen  relative ">
        <WorkerSide desk={true} />

        <WorkerNav />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav pb-[100px] px-4 ">

            <div className="flex  gap-8 shadow-lg p-4 bg-[rgba(23,191,99,.1)] " >
                <div className="relative ">
                    <Image src={file ? URL.createObjectURL(file) : worker?.avatar ? worker.avatar : "/avatar.png"} alt="" width="100%" objectFit="cover" height="100%" />
                    <label htmlFor="file" className="absolute p-2 shadow-lg bg-[rgba(0,0,0,.3)] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl"><BiEditAlt className="text-white" /></label>

                </div>    <input type="file" id="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                <div className="flex flex-col">
                    <h1 className="font-semibold text-xl">Rightson Kirigha</h1>
                    <h1 className="font-light">Nairobi,Starehe</h1>
                </div>
            </div>
            <form className="flex flex-col gap-4 items-center mt-10 w-full " onSubmit={handleSubmit}>
                <div className="flex flex-col text-green items-start w-full ">
                    <label htmlFor="">National Id</label>
                    <input onChange={handleChange} type="number" placeholder="Enter NationalId" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" name="nationalId" />
                </div>
                <div className="flex flex-col text-green items-start w-full ">
                    <label htmlFor="">Keen Name</label>
                    <input onChange={handleChange} type="text" placeholder="Enter Keen Name" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="keenName" />
                </div>
                <div className="flex flex-col text-green items-start w-full ">
                    <label htmlFor="">Keen Phone</label>
                    <input onChange={handleChange} type="tel" placeholder="Enter Keen Phone Number" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="keenPhone" />
                </div>
                <div className="flex flex-col text-green items-start w-full ">
                    <label htmlFor="">Residence</label>
                    <input onChange={handleChange} type="text" placeholder="Enter Your Residence" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="residence" />
                </div>


                {loading ? <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> SUBMIT</button>}
            </form>



        </div>

        <Bottom worker={true} />

        <ToastContainer />
    </div>;
};

export default Index;
