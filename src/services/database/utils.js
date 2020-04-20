import firebase from "./../firebase"

export const addToArray = value => firebase.firestore.FieldValue.arrayUnion(value)

export const handleResponse = doc => {
    if(doc.exists) {
        return {
            notFound: false,
            ...doc.data()
        };
    }

    return {
        notFound: true,
    }
}

export const handleError = error => {
    // @TODO send to sentry.io
    throw new Error("Something went wrong")
}