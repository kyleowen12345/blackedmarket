import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import Link from 'next/link'
const NEWPASSWORD = gql`
mutation($token:String!,$password:String!){
    newPassword(token:$token,password:$password){
      token
    }
  }
`;
export default function Register() {
    const router = useRouter()
    const { id } = router.query
    const [newpassword,{data, loading,error }] = useMutation(NEWPASSWORD,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({password}) => {
       await  newpassword({variables:{token:id,password:password}})   
    };
    console.log(id)
    console.log(data)
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">Password</label>
          <input
            type='password'
            {...register('password', {
              required: 'this is required',
              minLength: {
                value: 5,
                message: 'Min length is 5',
              },
            })}
          />
          <br />
          {errors.password && errors.password.message}
          <br />
          { error && <p>{error?.message}</p> }
     {loading && <p className="p-2 text-white font-mono">Loading...</p>}
     <button type="submit" disabled={data}> Submit </button>
        </form>
        {data && <Link href="/login">
          <a>Login and checkout your new password</a>
        </Link>}
      </div>
    );
  }