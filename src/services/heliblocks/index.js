import { getCollection, handleResponse, handleError } from "./../database" 

const collection = getCollection("heliblocks")

export const getHeliblock = async(id) => {
    const response = await collection.doc(id).get()
    return handleResponse(response);
}

export const setHeliblock = async (heliblock) => {
    try {
        const {id } = await collection.add(heliblock);
        return id
    } catch (error) {
        handleError(error)
    }
}