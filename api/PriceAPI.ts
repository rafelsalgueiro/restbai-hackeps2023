import { UserInput } from "@/interfaces/UserInput";
import { useState } from "react";

const API_BASE_URL = 'http://127.0.0.1:5000/r1r6';

export const fetchDataFromApiPrice = async (bodyInput: UserInput, parameterR1R6 : string) => {
    try {
        //const params = { client_key: '4451eee9b4efd17b513a33ff7f53a06123dbb5b91fecce2b0863307623f38eff'};  // Ejemplo de parámetros
        let body = buildBody(bodyInput, parameterR1R6);  // Ejemplo de cuerpo (body)
        console.log(body)
        return await fetchData(body);
        //console.log(apiData)
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
};

const fetchData = async (body?: any): Promise<any> => {
    try {
      // Construir la URL con parámetros si se proporcionan
      const url = new URL(API_BASE_URL);
  
      // Configurar la solicitud Fetch
      const response = await fetch(url.toString(), {
        method: 'POST',  // Cambia el método según tu necesidad (GET, POST, etc.)
        headers: {
          'Content-Type': 'application/json',  // Cambia el tipo de contenido según tu necesidad
          // Puedes agregar más encabezados según sea necesario
        },
        body: body ? JSON.stringify(body) : undefined,  // Agregar cuerpo si se proporciona
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  
const buildBody = (inputBody: UserInput, parameterR1R6 : string) => {
    let bodyJson = JSON.parse(parameterR1R6);
    (bodyJson as any).city = inputBody.zipcode;
    (bodyJson as any).squareFeets = inputBody.squareFeets;
    (bodyJson as any).propertyType = inputBody.propertyType;

    return bodyJson;
};
