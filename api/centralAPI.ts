import { UserInput } from "@/interfaces/UserInput";
import { useState } from "react";
import { fetchDataFromApir1r2 } from "./R1R6API";
import { fetchDataFromApiPrice } from "./PriceAPI";
import { fetchDataFromApiDescription } from "./DescriptionApi";


export const centralAPI = async (bodyInput: UserInput) => {
    let responseR1r2API;
    let responsePriceAPI;
    let responseDescriptionAPI;

    try {
        responseR1r2API = await fetchDataFromApir1r2(bodyInput);
    } catch (error) {
        console.error('Error al llamar a la API r1r2API:', error);
    }

    try {
        if(responseR1r2API != undefined) 
            responsePriceAPI = await fetchDataFromApiPrice(bodyInput,responseR1r2API);
    } catch (error) {
        console.error('Error al llamar a la API r1r2API:', error);
    }

    try {
        responseDescriptionAPI = await fetchDataFromApiDescription(bodyInput);
    } catch (error) {
        console.error('Error al llamar a la API DescriptionAPI:', error);
    }

    
    if (responseR1r2API != undefined) {
        responseR1r2API = JSON.parse(responseR1r2API).response.solutions;
    }

    if (responsePriceAPI != undefined) {
        responsePriceAPI = JSON.parse(responsePriceAPI).price;
    }

    if (responseDescriptionAPI != undefined) {
        responseDescriptionAPI = JSON.parse(responseDescriptionAPI).response.description_blocks;
    }

    let jsonResponse = {'images_info': responseR1r2API, 'price': responsePriceAPI, 'descriptions': responseDescriptionAPI}
    return jsonResponse;
    /*
    try {
        let r1r2API = await fetchData(bodyInput);
    } catch (error) {
        console.error('Error al llamar a la API r1r2API:', error);
    }
    */
};
