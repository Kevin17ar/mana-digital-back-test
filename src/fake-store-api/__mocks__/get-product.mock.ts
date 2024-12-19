import { AxiosRequestConfig, AxiosResponse } from "axios";

export const mockGetProduct = (): AxiosResponse<any, any> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
    }
    return {
        data: {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
                rate: 3.9,
                count: 120
            }
        }
        ,
        status: 200,
        statusText: 'OK',
        headers: {
            contnetType: 'application/json'
        },
        config
    } as AxiosResponse<any, any>
};

export const mockGetProductNotFound = (): AxiosResponse<any, any> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
    }
    return {
        data: '',
        status: 200,
        statusText: 'OK',
        headers: {
            contnetType: 'application/json'
        },
        config
    } as AxiosResponse<any, any>
};