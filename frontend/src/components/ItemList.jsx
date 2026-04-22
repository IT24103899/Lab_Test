import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api';

export default function ItemList({ refreshTrigger }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await getItems();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteItem(id);
            fetchItems();
        }
    };

    if (loading) return <p>Loading items...</p>;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Item List</h2>
            {items.length === 0 ? (
                <p>No items found. Add one above!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {items.map(item => (
                        <li key={item._id} style={{ 
                            border: '1px solid #ddd', 
                            padding: '1rem', 
                            marginBottom: '1rem', 
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <strong>{item.name}</strong> - ${item.price}
                                <br />
                                <small>{item.description}</small>
                            </div>
                            <button 
                                onClick={() => handleDelete(item._id)}
                                style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
