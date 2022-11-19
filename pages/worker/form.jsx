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
import { AiFillCamera } from "react-icons/ai";
const Index = () => {
    const { admin, worker } = useAuth();
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)


        let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
        const fileRef = ref(storage, `/worker/${name}`);
        uploadBytes(fileRef, file).then((res) => {
            getDownloadURL(res.ref).then((url) => {

                const data = { ...values, avatar: url, pic: name }
                axios.put(`${baseUrl}/tomato?id=${worker._id}`, data).then((res) => {
                    setLoading(false)

                    toast.success("Image sent sucesfully", toastOptions);

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

    return <div className=" min-h-full w-screen  relative ">
        <WorkerSide desk={true} />

        <WorkerNav />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav pb-[100px] px-4 ">


            <form className="flex flex-col gap-4 items-center mt-10 w-full " onSubmit={handleSubmit}>

                <div className="flex flex-col text-green items-start w-full">
                    <label htmlFor="image">Product Image</label>
                    <label type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none flex items-center justify-center" required name="file" htmlFor="image">
                        <AiFillCamera className="text-4xl" /> Pick Image or Take Photo
                    </label>
                    <input type="file" id="image" className="hidden " name="image" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

                </div>
                <div className="flex flex-col text-green items-start w-full ">
                    <label htmlFor="">Plant Type</label>
                </div>


                {loading ? <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> Loading...</button> : <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2"> SUBMIT</button>}
            </form>



        </div>

        <Bottom worker={true} />

        <ToastContainer />
    </div>;
};

export default Index;
