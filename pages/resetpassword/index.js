import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
const RESETPASSWORD = gql`
mutation($email:String!){
    resetPassword(email:$email){
      token
    }
  }
`;
export default function Register() {
    const router = useRouter()
    const [resetpassword,{data, loading,error }] = useMutation(RESETPASSWORD,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({email}) => {
       await  resetpassword({variables:{email:email}})      
    };
    console.log(data)
    console.log(error)
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            {...register('email', {
              required: 'this is required',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email address',
              },
            })}
          />
          <br />
          {errors.email && errors.email.message}
          <br />
          { error && <p>{error?.message}</p> }
     {loading && <p className="p-2 text-white font-mono">Loading...</p>}
     <button type="submit" disabled={data}> Submit </button>
        </form>
      </div>
    );
  }