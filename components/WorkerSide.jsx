import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineUser, AiOutlineMessage } from "react-icons/ai"
import { useAuth } from "../context/AuthContext"
import { MdOutlineLocalOffer, MdPeopleOutline, MdReport } from "react-icons/md"
import { GiFarmTractor } from "react-icons/gi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { GrUserWorker } from "react-icons/gr"
import { BsFillEnvelopeFill } from "react-icons/bs"
import Image from "next/image";
import { motion } from "framer-motion"
const Sidebar = ({ desk }) => {
    const router = useRouter()
    const { worker: user, logout } = useAuth()
    const route = router.route

    const Side = () => (
        <ul className="flex flex-col w-full  py-4 h-full overflow-y-au">

            <motion.li className="my-px cursor-pointer border-b border-black-[2px] overflow-hidden hover:bg-gray-100"
                animate={{
                    border: route === "/worker" && "1px solid rgba(23,191,99)",


                }}


                onClick={() => router.push('/worker')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <AiOutlineHome className="text-xl cursor-pointer" />
                    <button className="ml-3">Home</button>

                </button>
            </motion.li>
            <motion.li className="my-px cursor-pointer border-b border-black-[2px] overflow-hidden hover:bg-gray-100"
                animate={{
                    border: route === "/worker/profile" && "1px solid rgba(23,191,99)",
                }}

                onClick={() => router.push('/worker/profile')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <AiOutlineUser className="text-xl cursor-pointer" />
                    <button className="ml-3">Profile</button>

                </button>
            </motion.li>

            <motion.li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100 overflow-hidden"
                animate={{
                    border: route === "/worker/form" && "1px solid rgba(23,191,99)",
                }}

                onClick={() => router.push('/worker/form')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <GiFarmTractor className="text-xl" />
                    <button className="ml-3">Upload Disease</button>

                </button>
            </motion.li>


            <motion.li className="my-px cursor-pointer border-b border-black-[2px] hover:bg-gray-100 overflow-hidden"
                animate={{
                    border: route === "/worker/message" && "1px solid rgba(23,191,99)",
                }}

                onClick={() => router.push('/worker/message')}>
                <button
                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                    <AiOutlineMessage className="text-xl" />
                    <button className="ml-3">Message</button>

                </button>
            </motion.li>







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

        return <div className="hidden ty:flex ty:fixed pt-[40px] left-0 w-[300px] max-w-xs p-4 bg-white  flex-col shadow-lg overflow-x-hidden borider-r-[4px] bord0er-[rgba(0,0,0,.1)] min-h-[200vh] overflow-y-scroll">
            <div className="flex gap-4">
                <div className=" min-w-[50px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
                    <Image src={user?.avatar ? user.avatar : "/avatar.png"} alt="" width="100%" objectFit="cover" height="100%" />
                </div>
                <div className="flex flex-col ">
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
                    <Image src={user?.avatar ? user.avatar : "/avatar.png"} alt="" width="100%" objectFit="cover" height="100%" />

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
