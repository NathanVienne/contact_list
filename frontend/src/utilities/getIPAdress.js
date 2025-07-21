import axios from "axios";

async function getIP() {
    try {
        const data = await axios.get('https://api.ipify.org?format=json')
        console.log('Adresse IP =>', data.data.ip);
        
        return data.data.ip
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
}

export default getIP;