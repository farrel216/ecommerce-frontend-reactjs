import axios from "axios"
import { Label, TextInput, Button, Card } from "flowbite-react"
import { Helmet } from "react-helmet"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom"
const Register = () => {
  const navigate = useNavigate()
  const {register, formState:{errors}, handleSubmit, setError} = useForm()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data)
      if(response){
        navigate('/')
      }
    } catch (error) {
      return setError('email', {type:'duplicate', message: error.response.data.message})
    }
  }


    return(
        <>
        <Helmet>
            <title>Register Page</title>
        </Helmet>
        <div className="h-screen flex items-center">


        <Card className="container max-w-full md:max-w-screen-md mx-auto px-4">
        <div className="justify-center grid">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="logo" className="w-32 h-32"/>
            <h1 className="text-center mt-5 font-bold text-3xl">Register</h1>
        </div>
        <div className="container mx-auto max-w-xl items-center">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email"
        value="Your email"
      />
    </div>
    <TextInput
      id="email"
      type="email"
      placeholder="name@flowbite.com"
      {...register('email',{
        required: "Email harus diisi",
      })}
      aria-invalid={errors.email ? "true" : "false"} 
    />
    {errors.email && <p className="alert-error" role="alert">{errors.email?.message}</p>}
    
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="name"
        value="Your Name"
      />
    </div>
    
    <TextInput
      id="name"
      type="text"
      placeholder="Nama Lengkap"
      {...register('name',{
        required: "Nama harus diisi",
      })}
      aria-invalid={errors.name ? "true" : "false"} 
    />
    {errors.name && <p className="alert-error" role="alert">{errors.name?.message}</p>}
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password"
        value="Your password"
      />
    </div>
    <TextInput
      id="password"
      type="password"
      {...register('password',{
        required: "Password harus diisi",
        minLength:{
          value: 8,
          message: 'Password harus lebih dari 8 karakter'
        }
      }
      )}
      aria-invalid={errors.password ? "true" : "false"} 
    />
    {errors.password && <p className="alert-error" role="alert">{errors.password?.message}</p>}
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="confpassword"
        value="Your password"
      />
    </div>
    <TextInput
      id="confpassword"
      type="password"
      {...register('confPassword',{
        shouldUnregister: true,
        required: "Password harus diisi",
        validate: value => value === document.getElementById('password').value || "Password tidak sama"
      })}
      aria-invalid={errors.password ? "true" : "false"} 
    />
    {errors.confPassword && <p className="alert-error" role="alert">{errors.confPassword?.message}</p>}
  </div>
  <div className="flex items-center">
          <input
            id="agree"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox"
            {...register("agree", { required: "You must agree with terms & condition"})}
            aria-invalid={errors.agree ? "true" : "false"}
          />
          <label htmlFor="agree" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agree with <a href="/tandc" className="text-blue-600 dark:text-blue-500 hover:underline">terms & condition</a></label>
        </div>
  <Button type="submit">
    Register
  </Button>
</form>
        </div>
        </Card>
        </div>
        </>


    )

}

export default Register
