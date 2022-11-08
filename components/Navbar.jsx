import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io"
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router"
import { BsArrowLeft } from "react-icons/bs"
import axios from "axios"
import { baseUrl } from "./data";
import Sidebar from "./Sidebar";
const Navbar = ({ add }) => {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth();
    const router = useRouter();

    return <div className="flex flex-col p-4 gap-4 md:pr-5">
        <div className="flex justify-between fixed top-0 left-0 ty:left-[300px] p-4 h-[70px] z-20 bg-[rgba(255,255,255,.98)] w-full ty:w-nav ty:pr-5  shadow-md">
            {!add ? <p className="text-green cursor-pointer" onClick={() => router.push('/')}>HOME</p> : <BsArrowLeft className="text-green text-3xl cursor-pointer" onClick={() => router.back()} />}
            <div className="hidden md:flex gap-4 text-green" >
                <button className="cursor-pointer" onClick={() => router.push('/pedi/farms')}>FARMS</button>
                <button className="cursor-pointer" onClick={() => router.push('/pedi/workers')}>WORKERS</button>
                <button className="cursor-pointer" onClick={() => router.push('/pedi')}>NOTIFICATIONS</button>
            </div>
            <button className=" relative tl:flex tlm:hidden" onClick={() => {

                router.push('/notifications')
            }}>
                <div className="absolute -top-3 -right-2 text-green rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center">
                    0
                </div>
                <IoMdNotificationsOutline className="text-3xl text-green  " />
            </button>
            <div className="hidden md:flex gap-4 text-green" >
                LOGOUT
            </div>

            <div className="flex flex-col gap-2 items-end  mr-4 tx:mr-0 cursor-pointer bg-white  md:hidden" onClick={() => setOpen(!open)}>
                <motion.div
                    animate={{
                        rotate: open ? -45 : 0,
                        y: open ? -5 : 0,
                        width: open ? "40px" : "40px",
                        transformOrigin: "right",
                    }}
                    className="w-[20px] h-[2px] bg-green " ></motion.div>
                <motion.div
                    animate={{
                        rotate: open ? 45 : 0,
                        y: open ? 5 : 0,

                        transformOrigin: "right",
                    }}

                    className="w-[40px] h-[2px] bg-green"></motion.div>
                <motion.div
                    animate={{
                        rotate: open ? 45 : 0,
                        x: open ? '100vw' : 0,

                        transformOrigin: "right",
                    }}

                    className="w-[40px] h-[2px] bg-green"></motion.div>
            </div>
        </div>
        <motion.div
            animate={{
                x: open ? 0 : '-200vw',

            }}
            initial={{
                x: '-200vw',
            }}

            className="fixed z-20 top-[80px] overflow-auto min-h-screen w-screen flex justify-start bg-[rgba(0,0,0,.8)] y-10"  >

            <div className="h-screen  bg-gray-100  overflow-y-scroll w-[300px] ">

                <Sidebar />
            </div>
        </motion.div>

    </div>
};

export default Navbar;
