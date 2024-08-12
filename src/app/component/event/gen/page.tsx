"use client";
import React, { useState } from 'react';

const ExploreForm: React.FC = () => {
    const [event, setEvent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const handleExplore = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();
            if (response.ok) {
                setEvent(data.event);
                console.log('Событие:', data.event);
            } else {
                console.error('Ошибка:', data.message);
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Исследование</h2>
            <form onSubmit={handleExplore}>
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
                    {loading ? 'Исследование...' : 'Исследовать'}
                </button>
            </form>
            {event && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Полученное событие: {event}</p>}
        </div>
    );
};

export default ExploreForm;
