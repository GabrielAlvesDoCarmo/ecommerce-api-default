import {User} from "../models/user.model";
import {FirebaseAuthError, getAuth, UpdateRequest, UserRecord} from "firebase-admin/auth";
import {EmailAlreadyExistsError} from "../errors/email-already-exists.error";
import {signInWithEmailAndPassword, getAuth as getFirebaseAuth, UserCredential, signOut, sendPasswordResetEmail, signInAnonymously} from "firebase/auth"
import {UnauthorizedError} from "../errors/unauthorizedError";
import {FirebaseError} from "firebase/app"

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

    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.name,
            email: user.email,
            photoURL: user.imageProfile,
        }
        if (user.password){
            props.password = user.password
        }
        await getAuth().updateUser(id, props)
    }

    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password).catch(err => {
            if (err instanceof FirebaseError && err.code ==="auth/invalid-credential"){
                throw new UnauthorizedError()
            }
            throw err
        });
    }

    async recovery(email: string){
        await sendPasswordResetEmail(getFirebaseAuth(), email)
    }

    async delete(id: string){
        await getAuth().deleteUser(id)
    }

    async logout() {
        return await signOut(getFirebaseAuth());
    }

    async anonymous(): Promise<UserCredential> {
        return signInAnonymously(getFirebaseAuth())
    }
}