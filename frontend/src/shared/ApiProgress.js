import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = apiPath => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress) => {
            if (url == apiPath) {
                setPendingApiCall(inProgress);
            }
        }

        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(request => {
                updateApiCallFor(request.url, true)
                return request;
            });

            responseInterceptor = axios.interceptors.response.use(response => {
                updateApiCallFor(response.config.url, false)
                return response;
            }, error => {
                updateApiCallFor(error.config.url, false)
                throw error;
            });
        };

        const unregisterInterceptors = () => {
            const { request, response } = axios.interceptors
            request.eject(requestInterceptor);
            response.eject(responseInterceptor);
        };

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }

    });


};

