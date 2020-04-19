
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

