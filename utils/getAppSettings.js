import { BASE_URL, APP_SETTINGS } from '@env';

export async function getAppSettings(){
    try {
        const response = await fetch(BASE_URL + APP_SETTINGS, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error.message);
    }
}