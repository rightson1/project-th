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
const Index = () => {
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])


    const { user, admin } = useAuth();
    const [workers, setWorker] = React.useState([]);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [change, setChange] = useState(false)
    const [check, setCheck] = useState(false);
    const [deleteId, setDeleteId] = useState("");



    const router = useRouter();



    useEffect(() => {

        axios.get(`${baseUrl}/worker`).then((res) => {

            setLoading(false)
            setWorker(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [])


    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />

        <Navbar />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col  tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Workers</h1>
                    <div className="overflow-x-auto w-full">
                        {
                            workers.length ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">
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
                                            <th>Farm</th>


                                            <th >  <button className="text-[16px] font-normal">View</button></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workers.map((order, i) => {

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
                                                                <img src={order.avatar} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{order.username}</span>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{order.farm ? order.farm : "None"}</span>
                                                    </div>
                                                </td>



                                                <td className="py-4" onClick={() => {
                                                    router.push(`/pedi/worker/${order._id}`)
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



                                <Loading data="No workers added yet" />


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
