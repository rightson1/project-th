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
            router.push('/login')
            return;
        }
    }, [admin])


    const { user, admin } = useAuth();
    const [farms, setFarms] = React.useState([]);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [change, setChange] = useState(false)
    const [check, setCheck] = useState(false);
    const [deleteId, setDeleteId] = useState("");



    const router = useRouter();



    useEffect(() => {

        axios.get(`${baseUrl}/farm`).then((res) => {

            setLoading(false)
            setFarms(res.data)
        }).catch((err) => {

            setLoading(false)

        })


    }, [, change])
    const handleDelete = () => {

        setLoading1(true)
        axios.delete(`${baseUrl}/farm?id=${deleteId}`).then((res) => {
            toast.success("Farm Deleted Sucessfull", toastOptions)
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

        <Navbar />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav   pb-[200px]">

            <div className="flex flex-col  tl:p-4 ">

                <div className="flex flex-col px-8 tl:p-4 w-full items-center ">
                    <h1 className="text-3xl font-bold  text-green" >Farms</h1>
                    <div className="overflow-x-auto w-full">
                        {
                            farms.length ? <div className="my-8 justify-center w-full overflow-auto h-auto pb-8">
                                <table className="table w-full ">
                                    <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox text-black border-black border-[2px]" readOnly />
                                                </label>
                                            </th>
                                            <th>Name</th>
                                            <th>Location</th>


                                            <th >  <button className="text-[16px] font-normal">View</button></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {farms.map((order, i) => {

                                            return <tr key={i} className="my-2 px-8 border-black border-b" >
                                                <th>
                                                    <label>
                                                        <input type="checkbox" className="checkbox text-black border-black border-[2px]" onChange={(e) => {
                                                            setCheck(e.target.checked)
                                                            setDeleteId(order._id)

                                                        }} />
                                                    </label>
                                                </th>
                                                <td className="">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{order.name}</span>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="w-full flex justify-start text-xl">
                                                        <span>{order.location}</span>
                                                    </div>
                                                </td>



                                                <td className="py-4" onClick={() => {
                                                    router.push(`/pedi/farm/${order._id}`)
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



                                <Loading data="No Farms added yet" />


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
