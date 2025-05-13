import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import LoginLayout from "@/components/LoginLayout";
import {useRouter} from "next/router";

const router = useRouter();

const {id} = router.query;

const [productInfo, setProductInfo] = useState(null);

useEffect(() =>{
    if (!id) {
        return;
    }else{
        axios.get('/api/photos?id=' + id).then(response =>{
            setProductInfo(response.data)
        })
    }
}, [id])

export default function EditPhoto() {


    return <>
        <Head>
            <title>Update Photo</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard/><span>/</span> <span>Edit Photo</span>
                </div>
                <div className="mt-3">
                    {
                        productInfo && (
                            <Blog {...productInfo}/>
                        )
                    }
                </div>
            </div>
        </div>
    </>
}