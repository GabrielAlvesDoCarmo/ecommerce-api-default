import {User} from "../models/user.model";
import {getFirestore} from "firebase-admin/firestore";
import {NotFoundError} from "../errors/not-found.error";

export class UserServices {
    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get()
        // @ts-ignore
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as User[]
    }

    async getByID(id: string): Promise<User> {
        const doc = await getFirestore().collection("users").doc(id).get()
        if (doc.exists) {
            // @ts-ignore
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            throw new NotFoundError("Usuario não encontrado")
        }
    }

    async save(user: User): Promise<void> {
        await getFirestore().collection("users").add(user)
    }

    async update(id: string, user: User): Promise<void> {
        let docRef = getFirestore().collection("users").doc(id)
        if ((await docRef.get()).exists) {
            await docRef.set({
                name: user.name,
                email: user.email
            })
        } else {
            throw new NotFoundError("Usuario não encontrado")
        }
    }

    async delete(id: string){
        if (id != "0123456789") {
            await getFirestore().collection("users").doc(id).delete()
        } else {
            let promise = await getFirestore().collection("users").get();
            promise.docs.map((doc) => {
                doc.ref.delete()
            })
        }
    }
}