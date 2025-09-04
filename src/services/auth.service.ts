import {User} from "../models/user.model";
import {FirebaseAuthError, getAuth, UserRecord} from "firebase-admin/auth";
import {EmailAlreadyExistsError} from "../errors/email-already-exists.error";
import {signInWithEmailAndPassword,getAuth as getFirebaseAuth, UserCredential,signOut } from "firebase/auth"

export class AuthService {


    async create(user: User): Promise<UserRecord> {
        try {
            return await getAuth().createUser({
                email: user.email,
                emailVerified: false,
                password: user.password,
                displayName: user.name,
                photoURL: user.imageProfile,
            });
        } catch (err) {
            if (err instanceof FirebaseAuthError && err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        }
    }

    async login(email: string, password: string):Promise<UserCredential> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    }

    async logout(){
        return await signOut(getFirebaseAuth());
    }
}