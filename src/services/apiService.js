
const API_URL = 'https://api.example.com';

const apiService = {
  // Método para obtener datos
  getData: async (endpoint) => {
    try {
      //const response = await fetch(`${API_URL}/${endpoint}`);
      const response = await fetch('/mockData.json');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error en la petición GET:', error);
      throw error;
    }
  },

  getExperienceById: async (id) => {
    try {
      const response = await fetch('/mockData.json');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      const experience = data.find(x => x.id === id);      
      return experience;      
    } catch (error) {
      console.error('Error en la petición GET:', error);
      throw error;
    }
  },

  // Método para enviar datos (POST)
  postData: async ( payload={message:"Hello World!"}) => {
    try {
      const response = await fetch('/mockData.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la petición POST:', error);
      throw error;
    }
  },

  //metodo para enviar imagen a Cloudinary
  postImage: async (imageBynarized) => {
    const preset_name = "q93jy2fr";
 const cloud_name = "xxavierargentino";

    try {
      const formData = new FormData();
      formData.append('file', imageBynarized);
      formData.append('upload_preset', preset_name);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      
    }
  },

  // Método para actualizar datos (PUT)
  putData: async (endpoint, payload) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la petición PUT:', error);
      throw error;
    }
  },

  // Método para eliminar datos (DELETE)
  deleteData: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.status === 204;
    } catch (error) {
      console.error('Error en la petición DELETE:', error);
      throw error;
    }
  }
};

export default apiService;
