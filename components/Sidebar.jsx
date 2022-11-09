import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineUser } from "react-icons/ai"
import { useAuth } from "../context/AuthContext"
import { MdOutlineLocalOffer, MdPeopleOutline, MdReport } from "react-icons/md"
import { GiFarmTractor } from "react-icons/gi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { GrUserWorker } from "react-icons/gr"
import { BsFillEnvelopeFill } from "react-icons/bs"
import Image from "next/image";

const Sidebar = ({ desk }) => {
    const router = useRouter()
    const { user, logout } = useAuth()


    const Side = () => (
        <ul className="flex flex-col w-full  py-4 ">



            <li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100" onClick={() => router.push('/pedi')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 ">
                    <AiOutlineHome className="text-xl cursor-pointer" />
                    <button className="ml-3">Home</button>

                </button>
            </li>

            <li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100" onClick={() => router.push('/pedi/farms')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <GiFarmTractor className="text-xl" />
                    <button className="ml-3">Farms</button>

                </button>
            </li>
            <li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100" onClick={() => router.push('/pedi/addFarm')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <AiOutlineAppstoreAdd className="text-xl" />
                    <button className="ml-3">Add Farm</button>

                </button>
            </li>

            <li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100" onClick={() => router.push('/pedi/')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <IoMdNotificationsOutline className="text-xl" />
                    <button className="ml-3">Notifications</button>
                    <button className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">10</button>
                </button>
            </li>

            <li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100" onClick={() => router.push('/pedi/workers')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <GrUserWorker className="text-xl" />
                    <button className="ml-3">Workers</button>

                </button>
            </li>

            <li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100" onClick={() => router.push('/pedi/plantnatural')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <BsFillEnvelopeFill className="text-xl" />
                    <button className="ml-3">Plant Natural
                    </button>

                </button>
            </li>





            <li className="my-px cursor-pointer hover:bg-gray-100" onClick={async () => {
                await logout()
                router.push('/')

            }}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <button className="flex items-center justify-center text-lg text-red-400">
                        <svg fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                        </svg>
                    </button>
                    <button className="ml-3">Logout</button>
                </button>
            </li>
        </ul>
    )
    if (desk) {

        return <div className="hidden ty:flex ty:fixed pt-[40px] left-0 w-[300px] max-w-xs p-4 bg-white  flex-col overflow-y-auto shadow-lg overflow-x-hidden borider-r-[4px] bord0er-[rgba(0,0,0,.1)] min-h-screen">
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src="/avatar.png" alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col t">
                    <h1 className="font-semibold text-xl">{user?.username}</h1>
                    <h1 className="font-light">{user?.email?.slice(0, 20)}...</h1>
                </div>


            </div>
            <Side />

        </div>
    }
    else {
        return <div className="flex flex-col w-full max-w-xs p-4 bg-white h-full ">
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src="/avatar.png" alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col t">
                    <h1 className="font-semibold text-xl">{user?.username}</h1>
                    <h1 className="font-light">{user?.email?.slice(0, 20)}...</h1>
                </div>


            </div>
            <Side />
        </div>
    };

}



export default Sidebar;
