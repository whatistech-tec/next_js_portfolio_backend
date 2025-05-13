
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function Photo(
    {
        _id, 
        title: existingTitle,
        slug: existingslug,
        images: existingimages,
      
    }
) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingslug || '');
    const [images, setImages] = useState(existingimages || []);
    
    //for images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadingImageQueue = [];

    async function createBlog(ev){
        ev.preventDefault();

        if (isUploading){
            await Promise.all(uploadImagesQueue)
        }

        const data = {title, slug, images};

        if (_id){
            await axios.put('/api/photos',{...data,_id})
            toast.success('Data Updated')
        }else{
            await axios.post('/api/photos',data)
            toast.success('Data Created')
            
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
        router.push('/gallery')
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

    //for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-')
        setSlug(newSlug);
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
            {/* blog slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug (seo friendly url)</label>
                <input
                    type="text"
                    id="slug"
                    placeholder="Enter Slug url"
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>
         
            {/* blog images */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="images">Images (first image will be shown as thumbnail, you can drag)</label>
                    <input type="file" id="fileInput" className="mt-1" accept="image/*" multiple onChange={uploadImages}/>
                </div>
                <div className="w-100 flex flex-left mt-1">
                    {isUploading && <Spinner/>}
                    
                </div>
            </div>
   
            <div className="w-100 mb-1">
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE BLOG</button>
            </div>
        </form>
        

 

    </>
}

