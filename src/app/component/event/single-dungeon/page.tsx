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
                handleEvent(data.event); // Вызовите функцию для обработки события
            } else {
                console.error('Ошибка:', data.message);
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEvent = (eventType: string | null) => {
        if (!eventType) return;

        switch (eventType) {
            case 'Обычный монстр':
                console.log('Вас атакует обычный монстр!');
                // Запустите необходимую логику для обычного монстра
                break;
            case 'Элитный монстр':
                console.log('Вас атакует элитный монстр!');
                // Запустите необходимую логику для элитного монстра
                break;
            case 'Босс':
                console.log('Вы столкнулись с боссом!');
                // Запустите необходимую логику для босса
                break;
            case 'ПвП':
                console.log('Вы вступили в ПвП бой!');
                // Запустите необходимую логику для ПвП
                break;
            case 'Сундук':
                console.log('Вы нашли сундук!');
                // Запустите необходимую логику для сундука
                break;
            case 'Продавец зелий':
                console.log('Вы встретили продавца зелий!');
                // Запустите необходимую логику для продавца зелий
                break;
            case 'Шахтёр':
                console.log('Вы встретили шахтёра!');
                // Запустите необходимую логику для шахтёра
                break;
            case 'Наёмник':
                console.log('Наёмник присоединился к вам!');
                // Запустите необходимую логику для наёмника
                break;
            case 'Кристалл':
                console.log('Вы нашли кристалл!');
                // Запустите необходимую логику для кристалла
                break;
            case 'Торговец ценностями':
                console.log('Вы встретили торговца ценностями!');
                // Запустите необходимую логику для торговца ценностями
                break;
            default:
                console.log('Неизвестное событие');
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