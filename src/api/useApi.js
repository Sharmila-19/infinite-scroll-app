import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (page = 1, limit = 5, searchTerm = '') => {
    try {
        const params = {
            _start: (page - 1) * limit,
            _limit: limit,
        };
        console.log(`API Call: page=${page}, limit=${limit}, searchTerm=${searchTerm}, _start=${params._start}`);
        const response = await axios.get(`${BASE_URL}/users`, { params });
        let fetchUser= response.data;
        return fetchUser;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};