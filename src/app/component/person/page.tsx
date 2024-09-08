"use client";
import { Hero } from '@/app/config.ts/person';
import { useState } from 'react';
import './Person.css'; // Импортируем файл стилей
import { useRouter } from 'next/navigation';

export default function Person() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [attempts, setAttempts] = useState<number>(0); 
    const [successCount, setSuccessCount] = useState<number>(0); 
    const [nickname, setNickname] = useState<string>(''); 
    const [successMessage, setSuccessMessage] = useState<string>(''); // Состояние для сообщения об успехе
    const router = useRouter(); // Инициализация useRouter

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
            setNickname(''); // Сбрасываем никнейм при новом выборе героев
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

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const saveHero = async () => {
        if (!selectedHero || !nickname) return;
        // Получаем id_account из локального хранилища
        const idAccount = localStorage.getItem('id_account'); // Замените 'id_account' на нужный ключ, если он другой
        const heroData = {
            ...selectedHero,
            nickname: nickname, // Добавляем никнейм к данным героя
            id_account: idAccount // Добавляем id_account к данным героя
        };

        try {
            const response = await fetch('/api/person/person_save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(heroData)
            });

            if (!response.ok) {
                console.error('Ошибка при сохранении героя:', response.statusText);
                return;
            }

            const data = await response.json();
            console.log(data.message);
            setSuccessMessage('Герой успешно создан!'); // Устанавливаем сообщение об успехе
            
            // Перенаправление через 3 секунды
            setTimeout(() => {
                router.push('/component/menu'); // Перенаправление на главную страницу
            }, 3000);
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
            <button className="action-button" onClick={fetchHeroes} disabled={isLocked}>
                Выбрать героев
            </button>
            <button className="action-button" onClick={saveHero} disabled={!selectedHero || !nickname}>
                Сохранить выбранного героя
            </button>
            <button className="action-button" onClick={runAutoTest}>
                Запустить автотест
            </button>
            {selectedHero && (
                <div className="action-button">
                    <h3>Введите никнейм для {selectedHero.name}</h3>
                    <input 
                        type="text" 
                        value={nickname} 
                        onChange={handleNicknameChange} 
                        placeholder="Ваш никнейм" 
                    />
                </div>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>} {/* Сообщение об успехе */}
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
