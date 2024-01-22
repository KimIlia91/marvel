import { useState, useCallback } from "react";
import ProcessStatus from "../enums/ProcessStatus";

export const useHttp = () => {
    const [ process, setProcess ] = useState(ProcessStatus.WAITING);

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        setProcess(ProcessStatus.LOADING);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok && response.status !== 404) {    
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            
            const data = await response.json();

            return data;
        } catch(e) {
            setProcess(ProcessStatus.ERROR);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess(ProcessStatus.LOADING)
    }, []);

    return { request, clearError, process, setProcess }
}