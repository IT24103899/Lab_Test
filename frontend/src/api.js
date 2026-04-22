const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = `${BASE_URL}/items`;

console.log('Using API URL:', API_URL);

export const getItems = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createItem = async (item) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    return response.json();
};

export const deleteItem = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};

export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    return response.json();
};
