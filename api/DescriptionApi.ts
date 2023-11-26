import { UserInput } from "@/interfaces/UserInput";
import { useState } from "react";

const API_BASE_URL = 'https://description.restb.ai/v2/describe/listing';

export const fetchDataFromApiDescription = async (bodyInput: UserInput) => {
        const params = { client_key: '4451eee9b4efd17b513a33ff7f53a06123dbb5b91fecce2b0863307623f38eff'};  // Ejemplo de parámetros
        let body = buildBody(bodyInput);  // Ejemplo de cuerpo (body)
        let response = await fetchData(params, body);
        return JSON.stringify(response);
};

const fetchData = async (params?: Record<string, string>, body?: any): Promise<any> => {
    try {
      // Construir la URL con parámetros si se proporcionan
      const url = new URL(API_BASE_URL);
      if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      }
  
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

const buildBody = (inputBody: UserInput) => {
    let bodyJson = {};
    (bodyJson as any).location = {};
    (bodyJson as any).location.address = inputBody.street;
    //(bodyJson as any).zipcode = inputBody.zipcode;
    (bodyJson as any).square_feet = inputBody.squareFeets;
    (bodyJson as any).location.city = inputBody.city;
    (bodyJson as any).location.state = inputBody.state;
    (bodyJson as any).location.country = inputBody.country;
    (bodyJson as any).property = {};
    (bodyJson as any).property.property_type = inputBody.propertyType;
    (bodyJson as any).tone = 'professional';
    (bodyJson as any).image = inputBody.images.map(function(imageUrl) {
        return { "url": imageUrl}
    });
    if (inputBody.garageSpaces) {
        (bodyJson as any).garageSpaces = inputBody.garageSpaces;
    }

    if (inputBody.yearBuilt) {
        (bodyJson as any).property.year_built = inputBody.yearBuilt;
    }
    //console.log(bodyJson);
    return bodyJson;
};