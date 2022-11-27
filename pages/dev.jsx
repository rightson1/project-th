import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import HomeNav from "../components/HomeNav";
const Us = () => {
    const router = useRouter()
    const variants = {
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: .2,
                delayChildren: .2,
            },

        },

        initial: {
            opacity: 0

        }

    }
    return <div className="w-screen h-screen overflow-hidden bg-[rgb(150,150,150)] -md md:p-8 ">
        <div className="w-full h-full bg-[rgb(200,200,200)] rounded p-4 overflow-y-auto overflow-x-hidden md:p-8">
            <HomeNav />
            <div className="flex  flex-col relative py-8 ">

                <div className="flex  flex-col">
                    <div className="flex w-full justify-between">
                        <div className="w-[150px] h-[150px] grid grid-rows-5 grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((item, index) => {
                                return <div className="h-[4px] w-[4px] bg-black rounded-[50%]" key={index}></div>
                            })}
                        </div>

                    </div>

                    <div className="flex  flex-col relative py-8">

                        <div className="flex  px-4   w-full h-full max-w-[400px] max-h-[400px] bg-[rgba(0,0,0,.9)] flex-col justify-center min-h-[250px]  gap-4 text-white  z-[3] self-end ">
                            <h1 className="font-semibold text-2xl xm:text-3xl text-white ">About Developer</h1>
                            <p className="text-[12px] fomt-thin opacity-60"> Developed By Rightson Kirigha a 2nd year Riara university Student who is passionate about developing new ideas

                            </p>
                        </div>

                        <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
                            <img src="/tomato.png" alt="" className="h-full w-full object-cover " />
                        </div>



                    </div>




                </div>





            </div>

        </div>


    </div>;

}
export default Us;