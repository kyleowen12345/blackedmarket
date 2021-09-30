import React, {useEffect,useState} from 'react'
import { useMutation, gql } from "@apollo/client"
import imageCompressor from 'browser-image-compression'
import axios from "axios";
import { Box,Button,Text,Alert,AlertIcon } from "@chakra-ui/react"
import { useAuth } from '../../lib/auth';
import { PRODUCTINFO } from '../../pages/products/info/[id]';
import { STORESINFO } from '../../pages/stores/info/[id]';
const PRODUCTIMAGE = gql`
mutation ($id:ID!,$image:String!){
  productImage(id:$id,image:$image){
  id
  productName
  image
  price
  sold
  description
  }
}
`;
const ProductImage = ({productId,storeId,nextStep,product,prevStep}) => {
    const [image, setImage] = useState("");
    const {authToken}=useAuth()
    const [url, setUrl] = useState("");
    const [photoload,setPhotoLoad]=useState(false)
    const [productimage,{error,loading }] = useMutation(PRODUCTIMAGE,{ errorPolicy: 'all' });
    useEffect(async() => {
        if(url){
            const {data}= await productimage({variables:{id:productId,image:url},context:{headers:{token:authToken || ""}},refetchQueries:[{query:PRODUCTINFO,variables:{id:productId}},{query:STORESINFO,variables:{id:storeId}}]})
             if(data) nextStep()
        } 
    },[productimage,productId,url]);
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
		axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,data,config).then((data) => {setUrl(data?.data.secure_url); setPhotoLoad(false)}).catch((err) => {console.log(err);setPhotoLoad(false)});})
       };
    return (
    <Box p={5} px={[0,0,5,5,20]} w={["200px","200px","100%"]} height={"250px"} m={0}>     
      <form >
        <Box display={["block","block","flex"]} alignItems="center" justifyContent="space-between">  
          <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{maxWidth:"250px"}}/>
          {error && 
          <Alert status="error" w="100%">
            <AlertIcon />
            <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
          </Alert> 
          }
          <Box display="flex" alignItems="center" mt={[2,2,0]}>
          {product && <Button onClick={prevStep} disabled={loading || photoload} mr={2}  >Back</Button>}
          <Button type="submit" onClick={postPhoto} disabled={photoload||!image} isLoading={photoload || loading}>Finish</Button>
          </Box>
        </Box>
      </form> 
    </Box> 
    )
}

export default ProductImage