import React, { useEffect } from "react";
import Bottom from "../../components/Bottom";
import WorkerNav from "../../components/WorkerNav";
import { useAuth } from "../../context/AuthContext";
import { Router, useRouter } from "next/router";
import WorkerSide from "../../components/WorkerSide";
import { FcSearch, FcLike, FcRating } from "react-icons/fc";
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { baseUrl } from "../../components/data";
import { motion } from "framer-motion"
import { MdOutlineExpandMore } from "react-icons/md";
import Loading from "../../components/Loading";
import { format } from "timeago.js"
import axios from "axios"
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";


const Index = () => {
    const { admin, worker } = useAuth();
    const [products, setProducts] = React.useState([]);
    const [offer, setOffer] = React.useState(false);
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [loading1, setLoading1] = React.useState(true);
    const [loading2, setLoading2] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [all, setAll] = React.useState(false);
    const [found, setFound] = React.useState([]);
    const [notification, setNotification] = React.useState();

    const router = useRouter();
    const toastOptions = {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
    };
    useEffect(() => {
        if (!admin) {
            router.push('/')
            return;
        }
    }, [admin])

    useEffect(() => {

        axios.get(`${baseUrl}/tomato`).then((res) => {
            setProducts(res.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })


    }, [])
    useEffect(() => {
        if (worker) {

            axios.get(`${baseUrl}/message?receiver=${worker._id}`).then((res) => {
                res.data.map((item) => {
                    toast.success(item.text, toastOptions)
                    axios.delete(`${baseUrl}/message?id=${item._id}`).then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    }
                    )
                })

            }).catch((err) => {
                console.log(err)

            })

        }
    }, [worker])
    useEffect(() => {
        axios.get(`${baseUrl}/tomato`).then((res) => {
            setLoading1(false);
            setOffers(res.data)
        }).catch((err) => {
            console.log(err)
            setLoading1(false);
        })


    }, [])
    const handleSubmit = (e) => {
        setLoading2(true)
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(true);
        axios.get(`${baseUrl}/tomato?search=${search}`).then((res) => {
            setFound(res.data)
            setLoading2(false);
            e.target.reset()

        }).catch((err) => {
            console.log(err)
            setLoading2(false);
            setSearch(false);
        })
    }


    const Card = ({ product }) => {
        return <motion.div
            initial={{
                scaleX: .7,


            }}
            whileInView={{
                scaleX: 1,

            }}


            className=" flex  gap-2 w-full md:w-[45%]  h-[200px] bg-[rgba(23,191,99,.1)]    rounded-lg  md:max-w-[350px]  max-w-[430px] cursor-pointer  tlm:min-w-[400px] " >
            <div className=" h-full  overflow-hidden p-4 flex-1  w-full" >
                <img src={product.url} alt="" className=" h-[90%] object-contain  rounded-[10px] opacity-80" />
            </div>
            <div className="flex flex-col  px-4 flex-1 gap-4">
                <div className="flex w-full justify-between pt-4 items-center"><span className="font-bold text-[18px]">{product.diseases.slice(0, 15)}</span><span><FcLike className="text-xl" /></span> </div>

                <div className="flex w-full  gap-4 items-center  "><span className="font-semibold text-[18px]">Cause: </span>
                    <span className="">{product.causes}</span>
                </div>

                <button className="p-2 bg-green text-white rounded-md" onClick={() => router.push(`/worker/item/${product._id}`)}> View More</button>
            </div>


        </motion.div>
    }



    return <div className=" h-screen w-screen  relative">
        <WorkerSide desk={true} />
        <Header title={"Worker"} />
        <WorkerNav />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav ">

            <div className="flex flex-col px-8 tl:p-4 my-8 gap-5">


                <form className="flex  gap-2" onSubmit={handleSubmit} >
                    <input type="text" placeholder="Look for disease cause  or disease..." className="py-4  rounded-md border-[rgba(0,0,0,.7)] w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="search" />
                    <button className="p-4 border-[rgba(0,0,0,.5)] border-[1px] rounded-md" type="submit"  >{!loading2 ? <FcSearch className="text-2xl" /> : <AiOutlineLoading3Quarters className="text-2xl " />}</button>
                </form>
                <div className="flex  gap-2 w-full justify-between ">
                    <h1 className="font-bold text-2xl">Diseases</h1>
                    <h1 className=" text-green text-normal font-semibold  flex gap-3"><span>New To Old</span> <span><MdOutlineExpandMore className="text-2xl" /></span>  </h1>
                </div>
                {search ? <div onClick={() => setSearch(false)}><AiOutlineClose className="text-2xl cursor-pointer" /></div> : <div className="flex  justify-center w-full  gap-4 ">
                    <motion.button

                        animate={{
                            border: !offer ? '2px solid rgba(255,100,255,1)' : ''
                        }}
                        className="flex items-center justify-center  border-black py-2  px-2 text- rounded-lg border-[1px]  h-[30px]" onClick={() => setOffer(false)} >All</motion.button>


                </div>}
                <div className="flex flex-wrap w-full  gap-4 justify-center">
                    {
                        search ? (
                            found.length ?
                                found.map((product, index) => {
                                    return <Card product={product} key={index} />
                                }) :
                                !loading2 ? <Loading data="No products Found" /> :
                                    <Loading data="Loading..." />


                        ) : (products.length ?
                            products.map((product, index) => {
                                return <Card product={product} key={index} />
                            }) :
                            !loading ? <Loading data="No products added yet" /> :
                                <Loading data="Loading..." />


                        )



                    }


                </div>

            </div>

        </div>

        <Bottom worker={true} />
        <ToastContainer />

    </div>;
};

export default Index;
