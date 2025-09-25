import {Joi} from "celebrate";
import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;

export class User {
    id: string;
    name: string;
    email: string;
    password?: string
    imageProfile?: string

    constructor(data: User | any) {
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.password = data.password
        this.imageProfile = data.imageProfile
    }
}

export const newUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    imageProfile: Joi.string(),
})

export const updateUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum(),
    imageProfile: Joi.string(),
})

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
})

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required(),
})

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore(user: User): firestore.DocumentData {
        const {id,password, ...data} = user
        return data
    },

    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): User {
        return new User({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}
