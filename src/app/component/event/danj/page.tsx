"use client";

import { useState } from 'react';
import Battle from '../battle/page';

interface Monster {
    name: string;
    health: number;
    attack: number;
    agility: number;
    intellect?: number;
    summon?: string; // Призыв при смерти
    specialAbility?: string; // Специальная способность
}

const monstersData: Monster[] = [
    {
        name: 'Синий слизень',
        health: 3,
        attack: 3,
        agility: 3,
        intellect: 1,
        summon: 'Маленький синий слизень (2/2/1)',
    },
    {
        name: 'Красный слизень',
        health: 3,
        attack: 4,
        agility: 3,
    },
    {
        name: 'Зелёный слизень',
        health: 4,
        attack: 3,
        agility: 3,
    },
    {
        name: 'Жёлтый слизень',
        health: 3,
        attack: 3,
        agility: 4,
    },
];

const eliteMonster: Monster = {
    name: 'Чёрный слизень',
    health: 7,
    attack: 5,
    agility: 5,
    intellect: 3,
    specialAbility: 'Прыжок сверху - 100% урона + 50% шанс оглушения, 5 маны',
};

const boss: Monster = {
    name: 'Босс',
    health: 10,
    attack: 8,
    agility: 6,
    intellect: 6,
    specialAbility: 'Призыв рандомного обычного слизня - 10 маны',
};

const getRandomStat = (baseStat: number, variance: number): number => {
    const min = Math.floor(baseStat * (1 - variance));
    const max = Math.ceil(baseStat * (1 + variance));
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomNormalMonster = (): Monster => {
    const randomIndex = Math.floor(Math.random() * monstersData.length);
    const monster = monstersData[randomIndex];
    const health = getRandomStat(monster.health, 0.3);
    const attack = getRandomStat(monster.attack, 0.3);
    const agility = getRandomStat(monster.agility, 0.3);
    const intellect = monster.intellect ? getRandomStat(monster.intellect, 0.3) : undefined;

    return {
        name: monster.name,
        health,
        attack,
        agility,
        intellect
    };
};

export default function Dungeon() {
    const [foundMonsters, setFoundMonsters] = useState<Monster[]>([]);
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]); // Массив для выбранных монстров

    const findNormalMonsters = (count: number) => {
        const selectedMonsters: Monster[] = [];
        for (let i = 0; i < count; i++) {
            selectedMonsters.push(getRandomNormalMonster());
        }
        setFoundMonsters(selectedMonsters);
    };

    const findEliteMonsters = () => {
        const eliteMonsters = Array.from({ length: 1 }, () => getRandomNormalMonster());
        setFoundMonsters([...eliteMonsters, getRandomNormalMonster(), getRandomNormalMonster(), getRandomNormalMonster()]);
    };

    const fightBoss = () => {
        const health = getRandomStat(boss.health, 0.3);
        const attack = getRandomStat(boss.attack, 0.3);
        const agility = getRandomStat(boss.agility, 0.3);
        const intellect = boss.intellect ? getRandomStat(boss.intellect, 0.3) : undefined;
        const bossDetails = {
            ...boss,
            health,
            attack,
            agility,
            intellect
        }; // Генерация босса
        const normalMonsters = Array.from({ length: 1 }, () => getRandomNormalMonster());
        setFoundMonsters([bossDetails, ...normalMonsters]);
    };

    const handleMonsterClick = (monster: Monster) => {
        setSelectedMonsters((prev) => [...prev, monster]); // Добавляем выбранного монстра
    };

    const handleStartBattle = () => {
        setSelectedMonsters(foundMonsters); // Начинаем бой со всеми найденными монстрами
        setFoundMonsters([]); // Очищаем список найденных после начала битвы
    };

    return (
        <div>
            <h2>Подземелье</h2>
            <div>
                <button onClick={() => findNormalMonsters(3)}>Найти обычных монстров (3)</button>
                <button onClick={findEliteMonsters}>Найти элитного монстра</button>
                <button onClick={fightBoss}>Напасть на босса</button>
            </div>
            <h3>Найдены монстры:</h3>
            {selectedMonsters.length > 0 ? (
                <Battle monsters={selectedMonsters} onClose={() => setSelectedMonsters([])} /> // Бой со всеми сгенерированными монстрами
            ) : (
                <ul>
                    {foundMonsters.map((monster, index) => (
                        <li key={index} onClick={() => handleMonsterClick(monster)} style={{ cursor: 'pointer' }}>
                            {monster.name} (Здоровье: {monster.health}, Атака: {monster.attack}, Ловкость: {monster.agility}
                            {monster.intellect ? `, Интеллект: ${monster.intellect}` : ''})
                        </li>
                    ))}
                </ul>
            )}
            {foundMonsters.length > 0 && selectedMonsters.length === 0 && (
                <button onClick={handleStartBattle}>Начать бой со всеми найденными монстрами</button>
            )}
        </div>
    );
}
