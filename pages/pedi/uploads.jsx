import React, { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify'
import { baseUrl, toastOptions } from "../../components/data";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Header from "../../components/Header";
const Index = () => {
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])


    const { user, admin } = useAuth();
    const [uploads, setUploads] = React.useState([]);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [change, setChange] = useState(false)
    const [check, setCheck] = useState(false);
    const [deleteId, setDeleteId] = useState("");



    const router = useRouter();



    useEffect(() => {

        axios.get(`${baseUrl}/uploads`).then((res) => {

            setLoading(false)
            setUploads(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [change])
    const handleDelete = () => {

        setLoading1(true)
        axios.delete(`${baseUrl}/uploads?id=${deleteId}`).then((res) => {
            toast.success("Upload Deleted Sucessfull", toastOptions)
            setLoading1(false)
            setCheck(false)
            setChange(!change)
        }).catch((err) => {
            toast.error("Something went wrong", toastOptions)
            setLoading1(false)
        })


    }


    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />
        <Header title="Uploads" />
        <Navbar />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col  tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Uploads</h1>
                    <div className="overflow-x-auto w-full">
                        {
                            uploads.length ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">
                                <table className="table w-full ">
                                    <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox text-black border-black border-[2px]" readOnly />
                                                </label>
                                            </th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Read</th>


                                            <th className="" >  {check ? <button className="text-[16px] font-normal bg-red-800 text-white py-2 px-4" onClick={() => handleDelete()}>Delete</button> : <button className="text-[14px] font-bold">VIEW</button>}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uploads.map((order, i) => {

                                            return <tr key={i} className="my-2 px-8 border-black border-b" >
                                                <th>
                                                    <label>
                                                        <input type="checkbox" className="checkbox text-black border-black border-[2px]" onChange={(e) => {
                                                            setCheck(e.target.checked)
                                                            setDeleteId(order._id)

                                                        }} />
                                                    </label>
                                                </th>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={order.url} alt={order.url} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{order.disease}</span>
                                                    </div>
                                                </td>



                                                <td className="py-4">
                                                    <div className="w-full flex justify-start text-xl cursor-pointer">
                                                        <buttom className="bg-red-900 p-1 text-white rounded-lg">{order.read ? "True" : 'False'}</buttom>
                                                    </div>
                                                </td>
                                                <td className="py-4" onClick={() => {
                                                    router.push(`/pedi/upload/${order._id}`)
                                                }}>
                                                    <div className="w-full flex justify-start text-xl cursor-pointer">
                                                        {<buttom className="bg-red-900 p-1 text-white rounded-lg">View</buttom>}
                                                    </div>
                                                </td>

                                            </tr>
                                        })}


                                    </tbody>
                                </table>
                            </div> : !loading ?



                                <Loading data="No uploads added yet" />


                                :

                                <Loading data='loading...' />



                        }

                    </div>


                </div>
            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Index;
