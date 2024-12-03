
import { useEffect, useState } from "react";

export const useAddMockRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMock, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/mockData.json");
        if (!res.ok) {
          throw new Error("Error al cargar los datos");
        }
        const resData = await res.json();
        setData(resData);
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addNewRegister = (data) => {
    setIsLoading(true);
    console.log("Data recibida para agregar nuevo registro", data);
    setData([...dataMock, data]);
    console.log(dataMock)
  };

  return { addNewRegister, dataMock };
};
