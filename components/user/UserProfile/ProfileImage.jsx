import React, { useState,useEffect } from 'react'
import { useMutation, gql } from "@apollo/client"
import { Box,Text,Image,Input,Button,Icon,useToast} from "@chakra-ui/react"
import { AiOutlineSave,AiOutlineEdit } from "react-icons/ai"
import imageCompressor from 'browser-image-compression'
import axios from "axios";
import Cookies from 'js-cookie'
import { PROFILE } from '../../../pages/user/profile'
import { useAuth } from '../../../lib/auth'

const UPDATEUSERIMAGE = gql`
mutation ($profilePic:String!){
    updateUserImage(profilePic:$profilePic){
      email
      id
      name
      profilePic
      contactNumber
      country
      city
      SocialMediaAcc
      zipcode
      Seller
  }
}
`

const ProfileImage = ({user}) => {
    const {authToken}=useAuth()
    const toast = useToast()
    const [image,setImage]=useState("")
    const [url, setUrl] = useState("");
    const [photoload,setPhotoLoad]=useState(false)
    const [edit,setEdit]=useState(false)
    const [updateUserImage,{error,loading }] = useMutation(UPDATEUSERIMAGE,{ errorPolicy: 'all',
      onCompleted:data =>{
        if(data){
          setEdit(false)
          setImage(null)
          toast({
            title: `Image upload success.`,
            description:"Succesfully updated your profile image",
            status:"success",
            position:"top-right",
            isClosable: true,
          })
        }
      },
      onError:error =>{
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
            await updateUserImage({variables:{profilePic:url},context:{headers:{token:Cookies.get('blackedmarket') || ""}},
        update(cache,{data}){
            if(data){
                cache.writeQuery({
                  query:PROFILE,
                  context:{headers:{token:authToken||" "}},
                  data:{
                    user:data.updateUserImage
                  }
                })
              }
        }})
        } 
    },[updateUserImage,url]);

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
        <Box p={8} my={[0,0,0,10]} width={["100%","100%","100%","40%"]} borderLeft="1px solid #EFEFEF" display="flex" flexDirection="column" alignItems="center">
           
           <Image src={user.profilePic} alt={user.name} width="266px" height="266px"  loading="lazy" fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
           {edit == false && <Button mt={5} onClick={()=>setEdit(true)}  bg={'white'} color={"#FC8E00"} border="2px solid #FC8E00"  _hover={{color: '#FC8E00',bg:"white"}} width="266px" ><Icon as={AiOutlineEdit} color="#FC8E00" mr={3} />Update Image</Button>}
            {edit &&  <Input mt={5} type="file" width="266px" onChange={(e) => setImage(e.target.files[0])} px={0} accept=".jpg,.jpeg,.png" border={0} cursor="pointer" _focus={{outline:"none"}} css={{'&::-webkit-file-upload-button': { background: '#FC8E00', color:"white",border:"3px solid #FC8E00",borderRadius:5,cursor:"pointer"}}} />}
            {image && <Button onClick={postPhoto}  mt={3}  bg={'white'} color={"#FC8E00"} border="2px solid #FC8E00"   _hover={{color: '#FC8E00',bg:"white"}} width="266px" isLoading={photoload || loading}><Icon as={AiOutlineSave} color="#FC8E00" mr={3} />Save chosen image</Button>}
            <Text color="gray" fontSize="13px" mt={2}>File size: maximum 1 MB</Text>
           <Text color="gray" fontSize="13px">File extension: .JPEG, .PNG</Text>
        </Box>
    )
}

export default ProfileImage
