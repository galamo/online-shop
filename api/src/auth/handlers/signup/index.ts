import { signupSchema } from "../../route"
import bcrypt from "bcrypt";

interface IPayload {
    password: string,
    email: string,
    firstName: string,
    lastName: string
}
const saltRounds = 10
export default function signUp(signUpPayload: IPayload) {
    const { email, firstName, lastName, password } = signUpPayload
  
    console.log(hashedPasswrod)
}

function getHashedPassword(password: string){

}

