import {useRouter} from "next/router";
import axios from "axios";
import Head from "next/head";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {BsPostcard} from "react-icons/bs";


export default function DeleteProduct() {

    const router = useRouter();
    
    const {id} = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() =>{
        if (!id) {
            return;
        }else{
            axios.get('/api/blogs?id=' + id).then(response =>{
                setProductInfo(response.data)
            })
        }
    }, [id]);

    function goBack(){
        router.push('/blogs')
    }
    async function deleteBlog() {
        await axios.delete('/api/blogs?id=' + id)
        toast.success('deleted successifully')
        goBack();
    }
    


    return <>
        <Head>
            <title> Delete Blog </title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard/><span>/</span> <span>Edit Blog</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg 
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                    </svg>
                    <p className="cookieHeading">Are you sure?</p>
                    <p className="cookieDescription">If you delete this website content it will be permanently deleted!</p>
                    <div className="buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}