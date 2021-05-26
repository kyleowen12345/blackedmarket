import React, {useEffect,useState} from 'react'
import { useMutation, gql } from "@apollo/client"
import imageCompressor from 'browser-image-compression'
import axios from "axios";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
const STOREIMAGE = gql`
mutation ($id:ID!,$storeBackgroundImage:String!){
    storeImage(id:$id,storeBackgroundImage:$storeBackgroundImage){
    message
    }
  }
`;
const StoreImage = ({storeId}) => {
    const router = useRouter()
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [photoload,setPhotoLoad]=useState(false)
    const [storeimage,{error }] = useMutation(STOREIMAGE,{ errorPolicy: 'all' });
    useEffect(async() => {
        if(url){
            const {data}= await storeimage({variables:{id:storeId,storeBackgroundImage:url},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
             if(data) router.push(`/stores/info/${storeId}`)
        } 
    },[storeimage,storeId,url]);
    const postPhoto = async(e) => {
        e.preventDefault();
        setPhotoLoad(true)
        const options = {maxSizeMB: 0.1,maxWidthOrHeight: 1920,useWebWorker: true}
		imageCompressor(image,options).then(compressFile=>{
		const data = new FormData();
		data.append("file", compressFile);
		data.append("upload_preset", "insta-clone");
		data.append("cloud_name", "kaking");
		const config = {headers: { "content-type": "multipart/form-data" },};
		axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,data,config).then((data) => {setUrl(data?.data.secure_url); setPhotoLoad(false)}).catch((err) => {console.log(err);setPhotoLoad(false)});})
       };
       console.log(url)
    return (
    <form >
    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
    {error && <p>{error?.message}</p>}
    {photoload ?<p>Uploading...</p>:<button type="submit" onClick={postPhoto} disabled={photoload||!image}>Finish</button>}
    </form> 
    )
}

export default StoreImage
