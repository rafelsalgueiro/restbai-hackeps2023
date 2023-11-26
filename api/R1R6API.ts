import { UserInput } from "@/interfaces/UserInput";
import { useState } from "react";

const API_BASE_URL = 'https://property.restb.ai/v1/multianalyze';

export const fetchDataFromApir1r2 = async (bodyInput: UserInput) => {
    let params = { client_key: '4451eee9b4efd17b513a33ff7f53a06123dbb5b91fecce2b0863307623f38eff'};  // Ejemplo de parámetros
    let body = buildBody(bodyInput);  // Ejemplo de cuerpo (body)
    let response = await fetchData(params, body);
    return JSON.stringify(response);
};

const fetchData = async (params?: Record<string, string>, body?: any): Promise<any> => {

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
  };

const buildBody = (inputBody: UserInput) => {
    let bodyJson = {
        "image_urls": inputBody.images,
        "solutions": {"roomtype": 1.0, "r1r6": null}
      };

    return bodyJson;
};