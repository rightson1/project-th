import React from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import axios from "axios";
import { baseUrl, toastOptions } from "../../components/data"
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
const Register = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [key, setKey] = React.useState(false)
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const codes = e.target.codes.value


        axios.patch(`${baseUrl}/pedi`, { codes }).then(async (res) => {
            setLoading(false)
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                const data = { email, username, password }
                axios.post(`${baseUrl}/worker`, data).then((res) => {
                    router.push('/')
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)

                    toast.error("there was an error", toastOptions)

                    setLoading(false)

                })

            } catch (err) {
                toast.error(err.message, toastOptions)

                setLoading(false)
            }



        }).catch((err) => {
            setLoading(false)
            toast.error("Wrong Code", toastOptions)

        })




    }


    return <div className="overflow-x-hidden  flex flex-col" >
        <Header title="Register" />
        <div className="item  w-full flex justify-center py-4">
            <img src="kindu.png" alt="" className="max-w-[200px] md:max-w-[300px]" />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-green text-center">WORKER REGISTERATION FORM</h1>
            <div className="flex flex-col  w-full justify-center items-center mt-7 px-8 gap-8">
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter name" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="username" />
                </div>
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="email" />
                </div>
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Enter Password</label>
                    <input type="Password" placeholder="Enter Password" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="password" />
                </div>
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Registration Key</label>
                    <input type="text" placeholder="Enter key provided by admin" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="codes" />
                </div>

                <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2" type="submit">{loading ? 'Please Wait....' : "Register"}</button>
                <p>Already have an account? <button className="text-green cursor-pointer" onClick={() => router.push("/")}>Login</button></p>

            </div>

        </form>
        <ToastContainer />

    </div>
}

export default Register;