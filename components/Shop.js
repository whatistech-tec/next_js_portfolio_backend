import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import {useState} from 'react';
import {MdDeleteForever} from 'react-icons/md';
import {useRouter} from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import {ReactSortable} from 'react-sortablejs';

export default function Shop(

    {
        _id, 
        title: existingTitle,
        slug: existingslug,
        images: existingimages,
        description: existingdescription,
        afilink: existingafilink,
        tags: existingtags,
        price: existingprice,
        status: existingstatus,
    }
) 
    
{

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingslug || '');
    const [images, setImages] = useState(existingimages || []);
    const [description, setDescription] = useState(existingdescription || '');
    const [client, setClient] = useState(existingclient || '');
    const [afilink, setAfilink] = useState(existingafilink || '');
    const [price, setPrice] = useState(existingprice || '');
    const [status, setStatus] = useState(existingstatus || '');
    
    //for images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadingImageQueue = [];

    async function createBlog(ev){
        ev.preventDefault();

        if (isUploading){
            await Promise.all(uploadImagesQueue)
        }

        const data = {title, slug, images, description, client, afilink, price, status};

        if (_id){
            await axios.put('/api/shops',{...data,_id})
            toast.success('Data Updated')
        }else{
            await axios.post('/api/shops',data)
            toast.success('Blog Created')
            
        }
        setRedirect(true);
    };
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);

            for(const file of files){
                const data = new FormData();
                data.append('file', file);

                uploadingImageQueue.push(
                    axios.post('/api/upload', data).then(res =>{
                        setImages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }
            //wait for all images to finish uploading
            await Promise.all(uploadingImageQueue);
            setIsUploading(false);
            toast.success('Images Uploaded')
        }else{
            toast.errors('An error occurred')
        }
    }
    if (redirect){
        router.push('/shops')
        return null;
    }

    function updateImagesOrder(images){
        setImages(images)
    }

    function handleDeleteImage(index){
        const updateImages = [...images];
        uploadImages.splice(index, 1);
        setImages(updateImages);
        toast.success('Image Deleted Successifully')
    }



    return <>
        <form className="addWebsiteform" onSubmit={createBlog}>
            {/* blog title */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter small title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            {/* client name */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="client">Afilate Link</label>
                <input
                    type="text"
                    id="client"
                    placeholder="Enter afilink"
                    value={afilink}
                    onChange={ev => setAfilink(ev.target.value)}
                />
            </div>
            {/* Live Preview */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="livepreview">Price</label>
                <input
                    type="text"
                    id="livepreview"
                    placeholder="Enter Price"
                    value={livepreview}
                    onChange={ev => setPrice(ev.target.value)}
                />
            </div>
            
            {/* Product images */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="images">Images (first image will be shown as thumbnail, you can drag)</label>
                    <input type="file" id="fileInput" className="mt-1" accept="image/*" multiple onChange={uploadImages}/>
                </div>
                <div className="w-100 flex flex-left mt-1">
                    {isUploading && <Spinner/>}
                    
                </div>
            </div>
            {/* image preview and image sortable */}
            {!isUploading && (
                <div className="flex">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className="flex gap-1">
                        {images?.map((link, index) => (
                            <div key={link} className="uploadedimg">
                                <img src={link} alt="image" className='object-cover'/>
                                <div className="deleteimg">
                                    <button onClick={() => handleDeleteImage(index)}><MdDeleteForever/></button>
                                </div>
                            </div>
                        ))}

                    </ReactSortable>
                </div>
            )}
            {/* markdown description */}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="images">Blog Content (for image: first upload and copy link and paste in ![alt text](link))</label>
                <MarkdownEditor

                    value={description}
                    onChange={(ev) => setDescription(ev.text)}
                    style={{width: '100%', height: '400px'}}
                    renderHTML={(text) => {
                        <ReactMarkdown components={{
                            code: ({node, inline, className, children, ...props}) => {
                                //for code
                                const match = /language-(\w+)/.exec(className || '');
                                if (inline){
                                    return <code>(children)</code>
                                }else if(match){
                                    return(
                                        <div style={{position: 'relative'}}>
                                            <pre style={{padding: '0', borderRadius: '5px', overflowX: 'auto', whitespace: 'pre-wrap'}} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{position:'absolute', top: '0', right: '0', zIndex: '1'}} onClick={() => navigator.clipboard.writeText(children)}>
                                                copy code
                                            </button>

                                        </div>
                                    )
                                }else{
                                    return <code {...props}>{children}</code>
                                }
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    }}
                />

            </div>
            {/* tags */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="tags">Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectOptions, option => option.value))} value={tags} name="tags" id="tags" multiple>
                    <option value='html'>html</option>
                    <option value='css'>css</option>
                    <option value='javascript'>javascript</option>
                    <option value='nextjs'>nextjs</option>
                    <option value='reactjs'>reactjs</option>
                    <option value='python'>python</option>
                    <option value='django'>django</option>
                    <option value='database'>database</option>
                </select>

            </div>
            {/* blog status */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status">Status</label>
                <select onChange={ev => setStatus(ev.target.value)} value={status} name="status" id="status">
                    <option value=''>No Select</option>
                    <option value='draft'>Draft</option>
                    <option value='publish'>Publish</option>
                </select>

            </div>
            <div className="w-100 mb-1">
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE DATA</button>
            </div>
        </form>
           
    </>
}

