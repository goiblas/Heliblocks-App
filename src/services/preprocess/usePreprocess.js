import { useState, useCallback } from "react";
import { preprocess as preprocessService } from "./preprocessor";

export const usePreprocess = (preprocessor) => {

    const [ error, setError] = useState(null)
    const [ preprocessing , setPreprocessing ] = useState(false)
    const [ processed, setProcessed ] = useState(null)

    const preprocess = useCallback( async(code) => {
      setPreprocessing(true)
      try {
        const response = await preprocessService(preprocessor, code);
        if (response.success) {
          setProcessed(response.code)
          setError(null)
        } else {
          setError(response.error) 
        }
      } catch (error) {
        setError(error)
      }
      setPreprocessing(false)
    }, [ preprocessor ])

    return { error, preprocessing, processed, preprocess }
}