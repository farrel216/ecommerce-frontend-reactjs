import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react"
const Login = ({isLogin,setIsLogin}) => {

    const onSubmitHandler = () =>{
        setIsLogin(true)
    }


    return(
        <div className="h-screen flex items-center">

        <Card className="container max-w-full md:max-w-screen-md mx-auto px-4">
        <div className="justify-center grid">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="logo" className="w-32 h-32"/>
            <h1 className="text-center mt-5 font-bold text-3xl">LOGIN</h1>
        </div>
        <div className="container mx-auto max-w-xl items-center">
            <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
      id="email1"
      type="email"
      placeholder="name@flowbite.com"
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
      />
    </div>
    <TextInput
      id="password1"
      type="password"
    />
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="remember" />
    <Label htmlFor="remember">
      Remember me
    </Label>
  </div>
  <Button type="submit">
    Submit
  </Button>
</form>
        </div>
        </Card>
        </div>

    )

}

export default Login
