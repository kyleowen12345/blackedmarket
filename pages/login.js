import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
const LOGIN = gql`
mutation($email:String!,$password:String!){
    login(email:$email,password:$password){
      token
    }
  }
`;
export default function Login() {
    const router = useRouter()
    const [login,{ loading,error }] = useMutation(LOGIN,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({email,password}) => {
            const {data}= await  login({variables:{email:email,password:password}})
            if(data){
            Cookies.set('blackedmarket', data?.login.token,{expires:1,secure:true});
            router.push('/?page=1')
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
                value: 5,
                message: 'Min length is 5',
              },
            })}
          />
          <br />
          {errors.password && errors.password.message}
          <br />
          { error && <p>{error?.message}</p> }
     {loading ? <p className="p-2 text-white font-mono">Loading...</p>:<button type="submit" disabled={loading}>
       Signup
          </button>}
     
        </form>
      </div>
    );
  }