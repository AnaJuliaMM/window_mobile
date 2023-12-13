import axios, { AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://sensorwindow.pythonanywhere.com/api/';

// Interfaces
export interface ApiResponse {
  city_id: number;
  city_name: string;
  country: string;
  date: string;
  date_br: string;
  humidity: number;
  id: number;
  precipitation: number;
  pressure: number;
  state: string;
  temperature: number;
  wind_direction: string;
  wind_direction_degrees: number | null;
  wind_gust: number;
  wind_velocity: number;
}

export interface ApiResponseSensor {
  id: number,
  is_raining: boolean
}


// GET Request - Predicions
export const fetchData = async (): Promise<ApiResponse[] > => {
  try {
    const response: AxiosResponse<ApiResponse[]> = await axios.get(`${BASE_URL}/previsao`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erro ao consumir a API:', axiosError.message);
    console.error('Status do erro:', axiosError.response?.status);
    throw new Error('Falha ao obter dados da API');
  }
};
 
// GET Request - Sensor
export const fetchSensorsData = async (): Promise<ApiResponseSensor []> => {
  try {
    const response: AxiosResponse< ApiResponseSensor []> = await axios.get(`${BASE_URL}/sensor`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erro ao consumir a API:', axiosError.message);
    console.error('Status do erro:', axiosError.response?.status);
    throw new Error('Falha ao obter dados da API');
  }
}


// GET Request - Retrieve sensor
export const retrieveSensorData = async (id: number): Promise<ApiResponseSensor> => {
  try {
    const response: AxiosResponse< ApiResponseSensor> = await axios.get(`${BASE_URL}/sensor/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erro ao consumir a API:', axiosError.message);
    console.error('Status do erro:', axiosError.response?.status);
    throw new Error('Falha ao obter dados da API');
  }
}
