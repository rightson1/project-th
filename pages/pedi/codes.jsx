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
        const codes = e.target.codes.value;
        setLoading(true)


        axios.put(`${baseUrl}/pedi?email=${user.email}`, { codes }).then((res) => {
            setLoading(false)

            toast.success("Code Changed Successfully", toastOptions);

            e.target.reset()

        }).catch((err) => {
            setLoading(false)
            toast.error("There was an error", toastOptions);
        })



    }

    return <div className=" min-h-[150vh] w-screen  relative">
        <Sidebar desk={true} />

        <Navbar add={true} />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav ">

            <div className="flex flex-col px-8 tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Registration Key</h1>
                    <form className="flex flex-col gap-8 items-center mt-10 w-full " onSubmit={handleSubmit}>

                        <div className="flex flex-col  border-[1px] my-4 p-2  shadow-lg rounded-b-[20px] rounded-tr-[20px] gap-4">
                            <div className="flex  gap-4 ">
                                <p className="text-green"

                                >This key will prevent unauthorised users from creating employee accounts</p>
                            </div>


                        </div>
                        <div className="flex flex-col text-green items-start w-full ">
                            <label htmlFor="">Change Key</label>
                            <input type="text" placeholder="Enter Key" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" name="codes" />
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
