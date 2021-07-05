import React, {useEffect,useState} from 'react'
import { useMutation, gql } from "@apollo/client"
import imageCompressor from 'browser-image-compression'
import axios from "axios";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Box,Button,Text } from "@chakra-ui/react"
const STOREIMAGE = gql`
mutation ($id:ID!,$storeBackgroundImage:String!){
    storeImage(id:$id,storeBackgroundImage:$storeBackgroundImage){
    message
    }
  }
`;
const StoreImage = ({storeId,nextStep,store,prevStep}) => {
    const router = useRouter()
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [photoload,setPhotoLoad]=useState(false)
    const [storeimage,{error }] = useMutation(STOREIMAGE,{ errorPolicy: 'all' });
    useEffect(async() => {
        if(url){
            const {data}= await storeimage({variables:{id:storeId,storeBackgroundImage:url},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
             if(data) nextStep()
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
    <Box p={5} px={[0,0,5,5,20]} w={["200px","200px","100%"]} m={0}>    
      <form >
         <Box display={["block","block","flex"]} alignItems="center" justifyContent="space-between">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{maxWidth:"250px"}}/>
          {error && <p>{error?.message}</p>}
          <Box>
          {store && <Button onClick={prevStep} mr={2}  mt={[2,2,0]}>Back</Button>}
          <Button type="submit" onClick={postPhoto} disabled={photoload||!image} isLoading={photoload} mt={[2,2,0]} >Finish</Button>
          </Box>
          </Box>
    </form>
    </Box> 
    )
}

export default StoreImage
