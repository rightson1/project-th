import React from "react";
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineShoppingCart, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "./data";
import { BiUserCircle } from "react-icons/bi";
import { useAuth } from "../context/AuthContext"

const Bottom = ({ admin }) => {
    const router = useRouter();
    const { buyer } = useAuth()

    if (admin) {
        return (
            <div className="w-full h-screen ty:hidden">
                {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile--> */}



                <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <button className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/pedi')}>
                            <AiOutlineHome className="mx-auto text-2xl" />
                            <span className="tab tab-home block text-xs">Home</span>
                        </button>
                        <button className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/pedi/addFarm')}>

                            <AiOutlineAppstoreAdd className="mx-auto text-2xl " />
                            <span className="tab tab-kategori block text-xs">Add Farm</span>
                        </button>
                        <button className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/pedi/workers')}>

                            <AiOutlineShoppingCart className="mx-auto text-2xl " />
                            <span className="tab tab-explore block text-xs">Workers</span>
                        </button>

                    </div>
                </section>
            </div>
        )

    }


    return (
        <div className="w-full h-screen ty:hidden">
            {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile--> */}



            <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                <div id="tabs" className="flex justify-between">
                    <button className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/worker')}>
                        <AiOutlineHome className="mx-auto text-2xl" />
                        <span className="tab tab-home block text-xs">Home</span>
                    </button>
                    <button className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => {
                        router.push("/worker/form")

                    }}>

                        <AiOutlineAppstoreAdd className="mx-auto text-2xl " />
                        <span className="tab tab-kategori block text-xs">Upload</span>
                    </button>
                    <button className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => {
                        router.push("/worker/profile")
                    }}>

                        <BiUserCircle className="mx-auto text-2xl " />
                        <span className="tab tab-explore block text-xs">Profile</span>
                    </button>


                </div>
            </section>
            <ToastContainer />
        </div>
    )

};

export default Bottom;
