import axios from "axios";

const BASE_URL = "https://gms-1-t3u4.onrender.com";

const getMonthlyJoined = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/monthly-member`, { withCredentials: true });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


const fourToSevenDaysExpire = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/within-4-7-expiring`, { withCredentials: true });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}



const threeDayExpire = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/within-3-days-expiring`, { withCredentials: true });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


const expired = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/expired-member`, { withCredentials: true });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}




const inActiveMembers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/inactive-member`, { withCredentials: true });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export {getMonthlyJoined,threeDayExpire,expired,fourToSevenDaysExpire,inActiveMembers};