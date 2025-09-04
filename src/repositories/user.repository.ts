import {getFirestore} from "firebase-admin/firestore";
import {User} from "../models/user.model";
import {firestore} from "firebase-admin";
import CollectionReference = firestore.CollectionReference;
import {getAuth} from "firebase-admin/auth";

export class UserRepository {
    private collection: CollectionReference

    constructor() {
        this.collection = getFirestore().collection("users")
    }
    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get()
        // @ts-ignore
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as User[]
    }

    async getByID(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get()
        if (doc.exists) {
            // @ts-ignore
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            return null
        }
    }

    async save(user: User) {
        delete user.password
        await this.collection.doc(user.id).set(user)
    }

    async update(id: string, user: User) {
        let docRef = this.collection.doc(id)
        await docRef.set({
            name: user.name,
            email: user.email
        })
    }

    async delete(id: string){
        let usersIDS: string[] = []
        if (id != "0123456789") {
            await this.collection.doc(id).delete()
        } else {
            let promise = await this.collection.get();
            promise.docs.map((doc) => {
                usersIDS.push(doc.id)
                doc.ref.delete()
            })
            await getAuth().deleteUsers(usersIDS)
        }
    }

}