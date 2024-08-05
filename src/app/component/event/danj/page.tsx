"use client";

import { useState } from 'react';
import Battle from '../battle/page';
import './Dungeon.css'; // Импортируем стили

interface Monster {
    name: string;
    health: number; 
    attack: number;
    agility: number;
    intellect?: number;
    summon?: string; 
    specialAbility?: string; 
    image?: string; // Свойство для изображения
}

const monstersData: Monster[] = [
    {
        name: 'Синий слизень',
        health: 3,
        attack: 3,
        agility: 3,
        intellect: 1,
        summon: 'Маленький синий слизень (2/2/1)',
        image: '/art/mobs/blue slime.jpg'
    },
    {
        name: 'Красный слизень',
        health: 3,
        attack: 4,
        agility: 3,
        image: '/art/mobs/red slime.jpg'
    },
    {
        name: 'Зелёный слизень',
        health: 4,
        attack: 3,
        agility: 3,
        image: '/art/mobs/green slime.jpg'
    },
    {
        name: 'Жёлтый слизень',
        health: 3,
        attack: 3,
        agility: 4,
        image: '/art/mobs/yellow slime.jpg'
    },
];

const eliteMonster: Monster = {
    name: 'Чёрный слизень',
    health: 7,
    attack: 5,
    agility: 5,
    intellect: 3,
    specialAbility: 'Прыжок сверху - 100% урона + 50% шанс оглушения, 5 маны',
    image: '/art/mobs/dark slime.jpg'
};

const boss: Monster = {
    name: 'Король слизней',
    health: 10,
    attack: 8,
    agility: 6,
    intellect: 6,
    specialAbility: 'Призыв рандомного обычного слизня - 10 маны',
    image: '/art/mobs/the king of slime.jpg'
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
        ...monster,
        health,
        attack,
        agility,
        intellect
    };
};

export default function Dungeon() {
    const [foundMonsters, setFoundMonsters] = useState<Monster[]>([]);
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);

    const findNormalMonsters = (count: number) => {
        const selectedMonsters = Array.from({ length: count }, getRandomNormalMonster);
        setFoundMonsters(selectedMonsters);
    };

    const findEliteMonsters = () => {
        const eliteMonsters = [eliteMonster, ...Array.from({ length: 3 }, getRandomNormalMonster)];
        setFoundMonsters(eliteMonsters);
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
        };

        const normalMonsters = Array.from({ length: 1 }, getRandomNormalMonster);
        setFoundMonsters([bossDetails, ...normalMonsters]);
    };

    const handleMonsterClick = (monster: Monster) => {
        setSelectedMonsters((prev) => [...prev, monster]);
    };

    const handleStartBattle = () => {
        setSelectedMonsters(foundMonsters);
        setFoundMonsters([]);
    };

    return (
        <div className="dungeon-background">
            <h2>Подземелье</h2>
            <div>
                <button onClick={() => findNormalMonsters(3)}>Найти обычных монстров (3)</button>
                <button onClick={findEliteMonsters}>Найти элитного монстра</button>
                <button onClick={fightBoss}>Напасть на босса</button>
            </div>
            <h3>Найдены монстры:</h3>
            {selectedMonsters.length > 0 ? (
                <Battle monsters={selectedMonsters} onClose={() => setSelectedMonsters([])} />
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {foundMonsters.map((monster, index) => (
                        <div key={index} onClick={() => handleMonsterClick(monster)} style={{ cursor: 'pointer' }}>
                            <div className="monster-card">
                                <img src={monster.image} alt={monster.name} className="monster-image" />
                                <div className="monster-info">
                                    <h4>{monster.name}</h4>
                                </div>
                                <div className="monster-stats">
                                    <p>Здоровье: {monster.health}</p>
                                    <p>Атака: {monster.attack}</p>
                                    <p>Ловкость: {monster.agility}</p>
                                    {monster.intellect && <p>Интеллект: {monster.intellect}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {foundMonsters.length > 0 && selectedMonsters.length === 0 && (
                <button onClick={handleStartBattle}>Начать бой со всеми найденными монстрами</button>
            )}
        </div>
    );
}
