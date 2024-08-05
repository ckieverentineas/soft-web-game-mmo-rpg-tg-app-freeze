"use client";
import { Hero } from '@/app/config.ts/person';
import { useState } from 'react';
import './Person.css'; // Импортируем файл стилей

export default function Person() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
    const [isLocked, setIsLocked] = useState(false); // Новый состояние для блокировки выбора

    const fetchHeroes = async () => {
        try {
            const response = await fetch('/api/person/person_select', {
                method: 'POST'
            });
            
            if (!response.ok) {
                console.error('Ошибка при получении данных:', response.statusText);
                return;
            }
    
            const data = await response.json();
            setHeroes(data);
            setSelectedHero(null);
            setIsLocked(false); // Разблокируем выбор при новом запросе
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleSelectHero = (hero: Hero) => {
        if (hero.stars === 6) {
            setSelectedHero(hero); // Автоматически выбираем 6★ героя
            setIsLocked(true); // Блокируем дальнейший выбор
        } else {
            setSelectedHero(hero); // Выбор обычного героя
        }
    };

    const saveHero = async () => {
        if (!selectedHero) return;

        try {
            const response = await fetch('/api/person/person_save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedHero)
            });
            
            if (!response.ok) {
                console.error('Ошибка при сохранении героя:', response.statusText);
                return;
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div>
            <h1>Выбор героя</h1>
            <button className="action-button" onClick={fetchHeroes}>Выбрать героев</button>
            <button className="action-button" onClick={saveHero} disabled={!selectedHero}>Сохранить выбранного героя</button>
            <div className="container">
                {heroes.map((hero) => (
                    <div 
                        key={hero.name} 
                        className={`heroCard ${selectedHero === hero ? 'selected' : ''}`} 
                        onClick={() => !isLocked && handleSelectHero(hero)} // Блокируем выбор, если locked
                    >
                        <h2>{hero.name} ({hero.stars}⭐)</h2>
                        <img src={hero.image} alt={hero.name} className="heroImage" />
                        <p>Здоровье: {hero.health}</p>
                        <p>Сила: {hero.strength}</p>
                        <p>Ловкость: {hero.dexterity}</p>
                        <p>Интеллект: {hero.intelligence}</p>
                        <p>Навыки: {hero.skills}</p>
                        <p>Пассивки: {hero.passives}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
