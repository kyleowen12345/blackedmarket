import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useAuth } from "../lib/auth";
const SIGNUP = gql`
mutation($name:String!,$email:String!,$password:String!){
    createUser(name:$name,email:$email,password:$password){
      token
    }
  }
`;
export default function Register() {
    const router = useRouter()
    const {signUp}=useAuth()
    const [signup,{data, loading,error }] = useMutation(SIGNUP,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({name,email,password}) => {
            const{data}= await signup({variables:{name:name,email:email,password:password}})
            if(data){
            signUp(data?.createUser.token)
            router.push('/stores/1')
            }
    };
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">First Name</label>
          <input
            placeholder="firstName"
            {...register('name', {
              required: 'this is a required',
              minLength: {
                value: 5,
                message: 'Min length is 5',
              },
            })}
          />
          <br />
          {errors.name && errors.name.message}
          <br />
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
                value: 5,
                message: 'Min length is 5',
              },
            })}
          />
          <br />
          {errors.password && errors.password.message}
          <br />
          { error && <p>{error?.message}</p> }
     {loading ? <p className="p-2 text-white font-mono">Loading...</p>:<button type="submit" disabled={loading||data}>
       Register
          </button>}
     
        </form>
      </div>
    );
  }