import { database } from "../firebase";
import { handleResponse } from "./utils" 

const collection =  database.collection("heliblocks")

export const getHeliblock = async(id) => {
    // try {
        const response = await collection.doc(id).get()
        return handleResponse(response);
    // } catch (error) {
    //     return { 
    //         errorMessage: "Something wor"
    //     }
    // }
}