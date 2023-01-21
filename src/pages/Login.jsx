import axios from "axios"
import { Label, TextInput, Button, Card } from "flowbite-react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit, setError } = useForm()


  const onSubmit = async (data) => {
    const response =  await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data,{
      withCredentials: true
    }).catch((error) => {
      if (error.response.status === 404) {
        return setError('email', { type: 'notfound', message: error.response.data.message })
      }
      else if (error.response.status === 400) {
        return setError('password', { type: 'wrongpassword', message: error.response.data.message })
      }
    })
    if(response){
      navigate('/home')
    }
  }

  


  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="h-screen flex items-center">


        <Card className="container max-w-full md:max-w-screen-md mx-auto px-4">
          <div className="justify-center grid">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="logo" className="w-32 h-32" />
            <h1 className="text-center mt-5 font-bold text-3xl">LOGIN</h1>
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
                  {...register('email', {
                    required: "Email harus diisi",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="alert-error" role="alert">{errors.email?.message}</p>}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="password1"
                    value="Your password"
                  />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  {...register('password', {
                    required: "Password harus diisi",
                    minLength: {
                      value: 8,
                      message: 'Password harus lebih dari 8 karakter'
                    }
                  }
                  )}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p className="alert-error" role="alert">{errors.password?.message}</p>}
              </div>
              <div className="flex items-center">
                <Label htmlFor="agree">
                  Dont Have account?{' '}
                  <a
                    href="/register"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Register Here
                  </a>
                </Label>
              </div>
              <Button type="submit">
                Submit
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>


  )

}

export default Login
