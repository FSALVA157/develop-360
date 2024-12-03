import { useState } from "react";
import apiService from "../services/apiService";



export default function useConvertToApi(data) {

    const [isLoading, setisLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const convertExperience = async (data) => {
        setisLoading(true);
        setSuccess(null);
        setError(null);
    try {
        const results = await Promise.allSettled([
            apiService.postImage(data.imageBynarized),
        ])

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Peticion ${index} exitosa: `, result.value);
            }else{
                console.log(`Peticion ${index} falló: `, result.reason);
            }
        });
    } catch (error) {
        console.log('Error General: ', error);
    }       


    }
  

    return{
        convertExperience,
        isLoading,
        success,
        error
    }

}