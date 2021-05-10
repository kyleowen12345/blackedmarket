import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';


const SIGNUP = gql`
mutation($name:String!,$email:String!,$password:String!){
    createUser(name:$name,email:$email,password:$password){
      token
      user{
        id
        email
        name
        password
      }
    }
  }
`;
export default function Register() {
    const [signup,{ loading,error }] = useMutation(SIGNUP,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({name,email,password}) => {
        try {
            const {data}= await  signup({variables:{name:name,email:email,password:password}})
            if(data){
            console.log(data)
            }else{
              return
            }
           
             } catch (error) {
               console.log(error)
             }
    
    };
    console.log(error)
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
          {errors.firstName && errors.firstName.message}
          <br />
          <label htmlFor="email">Email</label>
          <input
            placeholder="bluebill1049@hotmail.com"
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
                value: 2,
                message: 'Min length is 2',
              },
            })}
          />
          <br />
          {errors.lastName && errors.lastName.message}
          <br />
  
          
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }