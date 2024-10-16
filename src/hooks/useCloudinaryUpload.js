import { useState } from "react";

export const useCloudinaryUpload = () => {
 const preset_name = "q93jy2fr";
 const cloud_name = "xxavierargentino";

 const [urlImageCl, setUrlImageCl] = useState('')
 const [isLoading, setIsLoading] = useState(false)

 const uploadImageCl = async (file) => {
  setIsLoading(true)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset_name);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      console.log("Respuesta de Cloudinary", data);
      setUrlImageCl(data.secure_url)
      setIsLoading(false)  
  } catch (error) {
    throw new Error("Error al subir imagen");
    
  } 
  
}

return {urlImageCl, uploadImageCl }

}