import {User} from "../models/user.model";
import {getAuth, UserRecord} from "firebase-admin/auth";
import {EmailAlreadyExistsError} from "../errors/email-already-exists.error";


export class AuthService {


    create(user: User): Promise<UserRecord>{
        return getAuth().createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            displayName: user.name,
            photoURL: user.imageProfile,
        }).catch(err => {
            if (err.code === "auth/email-already-exists"){
                throw new EmailAlreadyExistsError()
            }
            throw err
        })
    }

    deleteAllUsers(ids: string[]){
        return getAuth().deleteUsers(ids)
    }
}