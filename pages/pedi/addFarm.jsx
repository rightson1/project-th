import React, { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify'
import { baseUrl, toastOptions } from "../../components/data";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { storage } from "../../firebase";
import Header from "../../components/Header";
const Index = () => {
    const [loading, setLoading] = useState();
    const { user, admin } = useAuth();
    const [file, setFile] = useState(null);



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
        const location = e.target.location.value;
        const size = e.target.size.value;
        const crops = e.target.crops.value;
        const data = { location, size, crops };

        if (!file) {

            axios.post(`${baseUrl}/farm`, data).then((res) => {
                setLoading(false)

                toast.success("Farm Added Successfully", toastOptions);

                e.target.reset()

            }).catch((err) => {
                setLoading(false)
                toast.error("There was an error", toastOptions);
            })


        } else {
            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/farm/${name}`);
            uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {

                    const values = { ...data, image: url, pic: name }
                    axios.post(`${baseUrl}/farm`, values).then((res) => {


                        toast.success("Farm Added Successfully", toastOptions);
                        setLoading(false)
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

    return <div className=" min-h-[150vh] w-screen  relative">
        <Sidebar desk={true} />
        <Header title={"Add Farm"} />
        <Navbar add={true} />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav ">

            <div className="flex flex-col px-8 tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Create New Farm</h1>
                    <form className="flex flex-col gap-8 items-center mt-10 w-full " onSubmit={handleSubmit}>
                        <div className="flex flex-col text-green items-start w-full ">
                            <label htmlFor="">Location</label>
                            <input type="text" placeholder="Enter Location " className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="location" />
                        </div>
                        <div className="flex flex-col text-green items-start w-full ">
                            <label htmlFor="">Size</label>
                            <input type="text" placeholder="Enter Size" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="size" />
                        </div>
                        <div className="flex flex-col text-green items-start w-full ">
                            <label htmlFor="">Crops</label>
                            <input type="text" placeholder="Enter Quantity (optional)" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="crops" />
                        </div>
                        <div className="flex flex-col text-green items-start w-full ">
                            <label htmlFor="image">Product Image</label>
                            <label type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none flex items-center justify-center" name="price" htmlFor="image">
                                <BiImageAdd className="text-4xl" /> {file ? file.name : "Pick Image"}
                            </label>
                            <input type="file" id="image" className="hidden " name="image" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

                        </div>

                        {loading ? <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> SUBMIT</button>}
                    </form>

                </div>
            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Index;
