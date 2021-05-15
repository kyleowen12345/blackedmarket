import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useAuth } from "../lib/auth";
const LOGIN = gql`
mutation($email:String!,$password:String!){
    login(email:$email,password:$password){
      token
    }
  }
`;
export default function Login() {
    const router = useRouter()
    const {Login}=useAuth()
    const [login,{data, loading,error }] = useMutation(LOGIN,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({email,password}) => {
            const{data}=await  login({variables:{email:email,password:password}})
            if(data){
             Login(data?.login.token)
             router.push('/stores/1')
            }
    };
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
  
          <label htmlFor="password">Password</label>
          <input
            type='password'
            {...register('password', {
              required: 'this is required',
              minLength: {
                value: 3,
                message: 'Min length is 5',
              },
            })}
          />
          <br />
          {errors.password && errors.password.message}
          <br />
          { error && <p>{error?.message}</p> }
     {loading ? <p className="p-2 text-white font-mono">Loading...</p>:<button type="submit" disabled={loading||data}>
       Login
          </button>}
     
        </form>
      </div>
    );
  }