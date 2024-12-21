export const BASE_URL = "https://sycret.ru/service/api/api";
export const API_KEY = "011ba11bdcad4fa396660c2ec447ef14";

export const getApiUrl = (method) => {
    return `${BASE_URL}/?ApiKey=${API_KEY}&MethodName=${method}`
}