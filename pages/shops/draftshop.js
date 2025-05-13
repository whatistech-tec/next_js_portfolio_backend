import useFetchData from "@/hooks/useFetchData";
import {SiBloglovin} from "react-icons/si";
import Link from "next/link"
import Dataloading from "@/components/Dataloading";

import {useState} from 'react';
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";

export default function draftshop() {

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const[perPage] = useState(7);

    //search
    const [searchQuery, setSearchQuery] = useState('');

    //fetch blog data
    const [alldata, loading] = useFetchData('/api/shops');

    //function to handle page change
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    //total number of blogs
    const allblog = alldata.length;

    //filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(project => project.title.tolowerCase().includes(searchQuery.tolowerCase()))

    //calculate index of the first blog displayed on thwe current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    //Get current page's blog
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const publishedblogs = currentBlogs.filter(ab => ab.status === 'draft');

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(allblog / perPage); i++){
        pageNumbers.push(1);
    }


    return <>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Draft <span>Products</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/><span>/</span> <span>Add Product</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Products:</h2>
                    <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..."/>
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Edit / Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <tr>
                                <td>
                                    <Dataloading/>
                                </td>
                            </tr>
                        </> : <>
                            {publishedblogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center">No Products Found</td>
                                </tr>
                            ) : (
                                publishedblogs.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><img src={product.images[0]} width={180} alt="image"/></td>
                                        <td><h3>{product.title}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={'/shops/edit/' + project._id}><button><FaEdit/></button></Link>
                                                <Link href={'/shops/delete/' + project._id}><button><RiDeleteBin6Fill/></button></Link>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </>}
                    </tbody>
                </table>
            </div>
        </div>
       
    </>
}