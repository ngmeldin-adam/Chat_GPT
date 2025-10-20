import {SignUp} from "@clerk/clerk-react"

const Signin = () => {
    return (
        <div className="h-full flex justify-center items-center">
              <SignUp path="/sign-up"  signInUrl="/sign-in"/>
        </div>
    )
}

export default Signin  ;