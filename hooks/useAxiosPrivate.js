import { axiosPrivate } from '../utils/axios'
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function useAxiosPrivate() {

  useEffect(() => {
    const axiosInterceptor = axiosPrivate.interceptors.request.use(
      async (config) => {
        try {
          const mytoken = await AsyncStorage.getItem("quizToken");

          if (mytoken !== null) {
            if (!config.headers["Authorization"]) {
              config.headers["Authorization"] = `Bearer ${mytoken}`;
            }
          }

          return config;
        } catch (error) {
          console.error("Error retrieving token from AsyncStorage:", error);
          return config;
        }
      },
      (err) => Promise.reject(err)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosInterceptor);
    };
  }, []);

  return axiosPrivate;
}



