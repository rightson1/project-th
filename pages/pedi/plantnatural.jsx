import React, { useEffect } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { cards } from "../../components/data";
import { Router, useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import { FcSearch, FcLike, FcRating } from "react-icons/fc";
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import Loading from "../../components/Loading";
import { MdOutlineExpandMore } from "react-icons/md";
import { motion } from "framer-motion"
import axios from "axios"
import { baseUrl } from "../../components/data";


const Index = () => {
    const { admin } = useAuth();
    const [products, setProducts] = React.useState([]);
    const [offer, setOffer] = React.useState(false);
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [loading1, setLoading1] = React.useState(true);
    const [loading2, setLoading2] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [all, setAll] = React.useState(false);
    const [found, setFound] = React.useState([]);

    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/login')
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
        return <div className=" flex  gap-2 w-full md:w-[45%]  h-[200px] bg-[rgba(23,191,99,.1)]    rounded-lg  md:max-w-[350px]  max-w-[430px] cursor-pointer  tlm:min-w-[400px] " >
            <div className=" h-full  overflow-hidden p-4 flex-1  w-full" >
                <img src={product.url} alt="" className=" h-[90%] object-contain  rounded-[10px] opacity-80" />
            </div>
            <div className="flex flex-col  px-4 flex-1 gap-4">
                <div className="flex w-full justify-between pt-4 items-center"><span className="font-bold text-[18px]">{product.diseases}</span><span><FcLike className="text-xl" /></span> </div>

                <div className="flex w-full  gap-4 items-center  "><span className="font-semibold text-[18px]">Cause: </span>
                    <span className="">{product.causes}</span>
                </div>

                <button className="p-2 bg-green text-white rounded-md" onClick={() => router.push(`/pedi/item/${product._id}`)}> View More</button>
            </div>


        </div>
    }

    return <div className=" h-screen w-screen  relative">
        <Sidebar desk={true} />

        <Navbar />
        <div className="text-black mt-10 ty:left-[300px] absolute w-full ty:w-nav pb-[100px]">

            <div className="flex flex-col px-8 tl:p-4 my-8 gap-5">
                <h1 className=" py-4 font-bold text-green text-center  underline text-2xl">Search For pesticide,Herbicede and Fungicide </h1>

                <iframe src="https://www.planetnatural.com/" frameborder="0" className="h-screen shadow-lg p-4"></iframe>

            </div>

        </div>
        <Bottom admin={true} />


    </div>;
};

export default Index;
