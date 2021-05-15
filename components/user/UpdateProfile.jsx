import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
const UPDATEUSER = gql`
mutation ($name:String!,$profilePic:String!,$contactNumber:String!,$country:String!,$city:String!,$SocialMediaAcc:String!,$zipcode:String!){
    updateUser(name:$name,profilePic:$profilePic,contactNumber:$contactNumber,country:$country,city:$city,SocialMediaAcc:$SocialMediaAcc,zipcode:$zipcode){
      name
      profilePic
      contactNumber
      country
      city
      SocialMediaAcc
      zipcode
    }
  }
`

const UpdateProfile = ({user}) => {
    const router = useRouter()
    const [updateUser,{data, loading,error }] = useMutation(UPDATEUSER,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm({
        defaultValues: {
            name: user.name,
            profilePic: user.profilePic,
            contactNumber: user.contactNumber,
            country: user.country,
            city: user.city,
            SocialMediaAcc: user.SocialMediaAcc,
            zipcode: user.zipcode
          }
    });
    const onSubmit = async({name,profilePic,contactNumber,country,city,SocialMediaAcc,zipcode}) => {
            const{data}=await  updateUser({variables:{name:name,profilePic:profilePic,contactNumber:contactNumber,country:country,city:city,SocialMediaAcc:SocialMediaAcc,zipcode:zipcode},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
            if(data){
             router.push('/user/profile')
            }
    };
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Name</label>
          <input {...register("name")} />
          <br/>
          <label htmlFor="email">Profile Picture</label>
          <input {...register("profilePic")} />
          <br/>
          <label htmlFor="email">Contact Number</label>
          <input {...register("contactNumber")} />
          <br/>
          <label htmlFor="email">Country</label>
          <input {...register("country")} />
          <br/>
          <label htmlFor="email">City</label>
          <input {...register("city")} />
          <br/>
          <label htmlFor="email">Social Media Account</label>
          <input {...register("SocialMediaAcc")} />
          <br/>
          <label htmlFor="email">Zipcode</label>
          <input {...register("zipcode")} />
          <br />
          { error && <p>{error?.message}</p> }
     {loading ? <p className="p-2 text-white font-mono">Loading...</p>:<button type="submit" disabled={loading||data}>
       Login
          </button>}
     
        </form>
      </div>
    );
}

export default UpdateProfile
