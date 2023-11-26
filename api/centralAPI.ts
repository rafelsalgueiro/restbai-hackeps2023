import { UserInput } from "@/interfaces/UserInput";
import { useState } from "react";
import { fetchDataFromApir1r2 } from "./R1R6API";
import { fetchDataFromApiPrice } from "./PriceAPI";


export const centralAPI = async (bodyInput: UserInput) => {
    let responseR1r2API;
    let responsePriceAPI;
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

    console.log(responsePriceAPI);
    /*
    try {
        let r1r2API = await fetchData(bodyInput);
    } catch (error) {
        console.error('Error al llamar a la API r1r2API:', error);
    }
    */
};
