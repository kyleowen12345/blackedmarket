import React, {useEffect,useState} from 'react'
import { useMutation, gql } from "@apollo/client"
import imageCompressor from 'browser-image-compression'
import axios from "axios";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Box,Button,useToast } from "@chakra-ui/react"
import { STORESINFO } from '../../../../pages/stores/info/[id]';
import { useAuth } from '../../../../lib/auth';

const STOREIMAGE = gql`
mutation ($id:ID!,$storeBackgroundImage:String!){
  storeImage(id:$id,storeBackgroundImage:$storeBackgroundImage){
    id
    storeName
    storeAddress
    storeDescription
    storeType
    sellerName{
      id
      email
      name
    }
    socialMediaAcc
    contactNumber
    createdAt
    storeBackgroundImage
  }
}
`;
const StoreImage = ({storeId,store,prevStep}) => {
    const router = useRouter()
    const toast = useToast()
    const {authToken}=useAuth()
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [photoload,setPhotoLoad]=useState(false)
    const [storeimage,{error,loading }] = useMutation(STOREIMAGE,{ errorPolicy: 'all',
      onCompleted: data => {
        if(data){
          router.push(`/stores/info/${storeId}`)
              toast({
                title: `Image upload success.`,
                description:store ? "Succesfully updated your store's image" : "Successfully added store image",
                status:"success",
                position:"top-right",
                isClosable: true,
              })
        }
      },
      onError:error => {
        if(error){
          toast({
            title: `Image upload failed.`,
            description: `${error.message}`,
            status:"error",
            position:"top-right",
            isClosable: true,
          })
        }
      }
  });

    useEffect(async() => {
        if(url){
          await storeimage({variables:{id:storeId,storeBackgroundImage:url},context:{headers:{token:authToken || ""}},
          update(cache,{data}){
            const oldStoreDetail = cache.readQuery({query:STORESINFO,variables:{id:storeId}})
            
            if(data && oldStoreDetail){
              cache.writeQuery({
                query:STORESINFO,
                variables:{id:storeId},
                data:{
                  storeInfo:{
                    __typename:"StoreswithProduct",
                    isUserAFollower:false,
                    products:oldStoreDetail.storeInfo.products,
                    store:data.storeImage
                  }
                }
              })
            }
          }})
        } 
    },[storeimage,storeId,url]);


    const postPhoto = async(e) => {
    e.preventDefault();
    setPhotoLoad(true)
    const options = {maxSizeMB: 0.3,maxWidthOrHeight: 1920,useWebWorker: true}
		imageCompressor(image,options).then(compressFile=>{
		const data = new FormData();
		data.append("file", compressFile);
		data.append("upload_preset", "insta-clone");
		data.append("cloud_name", "kaking");
		const config = {headers: { "content-type": "multipart/form-data" },};
		axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,data,config)
    .then((data) => {
      setUrl(data?.data.secure_url)
       setPhotoLoad(false)
       toast({
        title: `Image upload ongoing.`,
        description:"Please wait a little bit more..",
        status:"info",
        position:"top-right",
        duration:1000,
        isClosable: true,
      })
      })
    .catch((err) => {
      toast({
        title: `Image upload failed.`,
        description: `Cloudinary error`,
        status:"error",
        position:"top-right",
        isClosable: true,
      })
      setPhotoLoad(false)
    });})
       };
       
    return (
    <Box p={5} px={[0,0,5,5,20]} w={["200px","200px","100%"]} height={"250px"} m={0}>    
      <form >
         <Box display={["block","block","flex"]} alignItems="center" justifyContent="space-between">
          <input type="file" disabled={loading || photoload} onChange={(e) => setImage(e.target.files[0])} style={{maxWidth:"250px"}}/>
          <Box>
          {store && <Button onClick={prevStep} disabled={photoload || loading} mr={2}  mt={[2,2,0]}>Back</Button>}
          <Button type="submit" onClick={postPhoto} disabled={loading||photoload||!image} isLoading={photoload} mt={[2,2,0]} >Upload</Button>
          </Box>
          </Box>
    </form>
    </Box> 
    )
}

export default StoreImage
