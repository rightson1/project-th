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
const Disease = () => {
    const [loading, setLoading] = useState();
    const { user, admin } = useAuth();
    const [file, setFile] = useState(null);
    const [loading1, setLoading1] = useState(false)
    const [values, setValues] = useState();
    const [open, setOpen] = useState(false);


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])

    const handleEdit = (e) => {
        e.preventDefault();


        setLoading1(true)


        if (!file) {
            axios.post(`${baseUrl}/tomato`, values).then((res) => {
                setLoading1(false)


                toast.success("Disease Added Sucessfully", toastOptions);



            }).catch((err) => {
                setLoading1(false)
                toast.error("There was an error", toastOptions);
                console.log(err)
            })
        }
        else {

            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/disease/${name}`);
            uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {

                    const data = { ...values, url }
                    axios.post(`${baseUrl}/tomato`, data).then((res) => {
                        setLoading1(false)

                        toast.success("Disease Added Sucessfully", toastOptions);


                    }).catch((err) => {
                        setLoading1(false)
                        toast.error("There was an error", toastOptions);
                        console.log(err)
                    })

                })

            }).catch((err) => {
                setLoading(false)
                console.log(err);
            });
        }



    }


    return <div className=" min-h-[150vh] w-screen  relative">
        <Sidebar desk={true} />

        <Navbar add={true} />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav ">

            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-full md:w-3/4 h-[80%] overflow-y-auto ">


                <h1 className="text-2xl font-semibold text-center">Add Disease</h1>

                <form className="flex flex-col gap-2 p-4 items-center " onSubmit={handleEdit}>

                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Disease</label>
                        <input type="text" placeholder="Enter Disease  Name" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" name="diseases" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Causes</label>
                        <input type="text" placeholder="Enter Cause" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="causes" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Symptoms</label>
                        <textarea type="text" placeholder="Enter Symptoms" className="py-1 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="symptoms" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">comments</label>
                        <textarea type="text" placeholder="Enter Comments" className="py-1 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="comments" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="">Management</label>
                        <textarea type="text" placeholder="Enter Management" className="py-1 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="management" onChange={handleChange} />
                    </div>


                    <div className="flex flex-col text-green items-start w-full ">
                        <label htmlFor="image">Pick Image</label>
                        <label type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none flex items-center justify-center" name="price" htmlFor="image">
                            <BiImageAdd className="text-4xl" /> Pick IMage
                        </label>
                        <input type="file" id="image" className="hidden " name="image" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

                    </div>

                    {loading1 ? <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> SUBMIT</button>}

                </form>

            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Disease;
