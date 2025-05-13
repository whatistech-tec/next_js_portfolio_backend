import useFetchData from "@/hooks/useFetchData";
import {SiBloglovin} from "react-icons/si";
import Link from "next/link"
import Dataloading from "@/components/Dataloading";
import {useState} from 'react';
import {FaRegEye} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";

export default function contacts() {

        //pagination
        const [currentPage, setCurrentPage] = useState(1);
        const[perPage] = useState(7);
    
        //search
        const [searchQuery, setSearchQuery] = useState('');
    
        //fetch blog data
        const [alldata, loading] = useFetchData('/api/contacts');
    
        //function to handle page change
        const paginate = (pageNumber) =>{
            setCurrentPage(pageNumber);
        }
    
        //total number of blogs
        const allblog = alldata.length;
    
        //filter all data based on search query
        const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.tolowerCase().includes(searchQuery.tolowerCase()))
    
        //calculate index of the first blog displayed on thwe current page
        const indexOfFirstBlog = (currentPage - 1) * perPage;
        const indexOfLastBlog = currentPage * perPage;
    
        //Get current page's blog
        const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    
        const publishedblogs = currentBlogs;
    
        const pageNumbers = [];
    
        for(let i=1; i<= Math.ceil(allblog / perPage); i++){
            pageNumbers.push(1);
        }

    return <>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All <span>Contacts</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/><span>/</span> <span>Add Contact</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Contact:</h2>
                    <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..."/>
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>Project</th>
                            <th>Open Contact</th>
                            
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
                                    <td colSpan={6} className="text-center">No Contact Found</td>
                                </tr>
                            ) : (
                                publishedblogs.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><h3>{contact.name}</h3></td>
                                        <td><h3>{contact.email}</h3></td>
                                        <td><h3>{contact.phone}</h3></td>
                                        <td><h3>{contact.project[0]}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={'/contacts/view/' + contact._id}><button><FaRegEye/></button></Link>
                                                {/* <Link href={'/contacts/delete/' + contact._id}><button><RiDeleteBin6Fill/></button></Link> */}
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </>}
                    </tbody>
                </table>
                {/* for pagination */}
                {publishedblogs.length === 0 ? ("") : (
                    <div className="blogpagination">
                        <button onClick={() => paginate(currentPage - 1)}disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                            <button key={number}
                                onClick={() => paginate(number)}
                                className={`${currentPage === number ? 'active': ''}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                    </div>
                )}
            </div>
        </div>
   
    </>
}