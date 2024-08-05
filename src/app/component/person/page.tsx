"use client";
import { Hero } from '@/app/config.ts/person';
import { useState } from 'react';
import './Person.css'; // Импортируем файл стилей

export default function Person() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [attempts, setAttempts] = useState<number>(0); // Состояние для счетчика попыток
    const [successCount, setSuccessCount] = useState<number>(0); // Состояние для счетчика успешных попыток

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
            // Проверяем, есть ли среди выпавших героев 6★ герой
            const hasSixStarHero = data.some((hero: Hero) => hero.stars === 6);
            setIsLocked(hasSixStarHero); // Блокируем кнопку, если 6★ герой в пуле
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleSelectHero = (hero: Hero) => {
        if (isLocked && hero.stars !== 6) return; // Запрет выбора, если 6★ герой уже выпал и выбран не 6★ герой

        setSelectedHero(hero);
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

    const runAutoTest = async () => {
        const testAttempts = 30520; // Количество попыток для теста
        let successCount = 0;

        for (let i = 0; i < testAttempts; i++) {
            const response = await fetch('/api/person/person_select', { method: 'POST' });
            if (!response.ok) {
                console.error('Ошибка при получении данных:', response.statusText);
                return;
            }

            const data = await response.json();
            const sixStarHero = data.find((hero: Hero) => hero.stars === 6);
            if (sixStarHero) {
                successCount++;
            }
        }

        setAttempts(testAttempts);
        setSuccessCount(successCount);
        console.log(`Успешные попытки: ${successCount} из ${testAttempts}`);
    };

    return (
        <div>
            <h1>Выбор героя</h1>
            <button className="action-button" onClick={fetchHeroes} disabled={isLocked}>Выбрать героев</button> {/* Блокировка кнопки */}
            <button className="action-button" onClick={saveHero} disabled={!selectedHero}>Сохранить выбранного героя</button>
            <button className="action-button" onClick={runAutoTest}>Запустить автотест</button>
            <div className="container">
                {heroes.map((hero) => (
                    <div 
                        key={hero.name} 
                        className={`heroCard ${selectedHero === hero ? 'selected' : ''}`} 
                        onClick={() => handleSelectHero(hero)} 
                        style={{ cursor: isLocked && hero.stars !== 6 ? 'not-allowed' : 'pointer', opacity: isLocked && hero.stars !== 6 ? 0.5 : 1 }} // Изменение стиля при блокировке
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
            <div>
                <h3>Результаты автотеста</h3>
                <p>Количество попыток: {attempts}</p>
                <p>Успешные попытки (получили 6★ героя): {successCount}</p>
            </div>
        </div>
    );
}
