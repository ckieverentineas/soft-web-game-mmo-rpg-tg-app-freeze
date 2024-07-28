"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface Subclass {
    name: string;
    stats: {
        health: number;
        strength: number;
        dexterity: number;
        intelligence: number;
        stars: number;
    };
}

interface CharacterClass {
    name: string;
    image: string;
    subclasses: Subclass[];
}

const classes: CharacterClass[] = [
    {
        name: 'Ближний бой',
        image: '/art/class/melee.jpg',
        subclasses: [
            { name: 'Крестьянин', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Рыцарь', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Плут', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Воин', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
        ],
    },
    {
        name: 'Дальний бой',
        image: '/art/class/ranged.jpg',
        subclasses: [
            { name: 'Лучник', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Стрелок', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Снайпер', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
        ],
    },
    {
        name: 'Магия',
        image: '/art/class/magic.jpg',
        subclasses: [
            { name: 'Чародей', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Заклинатель', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Алхимик', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
        ],
    },
    {
        name: 'Поддержка',
        image: '/art/class/support.jpg',
        subclasses: [
            { name: 'Лекарь', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Шаман', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
        ],
    },
    {
        name: 'Призыв',
        image: '/art/class/summoning.jpg',
        subclasses: [
            { name: 'Бог ужаса', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Призыватель', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Некромант', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
        ],
    },
    {
        name: 'Ремесло',
        image: '/art/class/crafting.jpg',
        subclasses: [
            { name: 'Кузнец', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
            { name: 'Портной', stats: { health: 5, strength: 5, dexterity: 5, intelligence: 5, stars: 0 } },
        ],
    },
];

export default function ClassSelector() {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(null);

    const handleClassClick = (className: string) => {
        setSelectedClass(className);
        setSelectedSubclass(null); // Сбрасываем выбранный подкласс
    };

    return (
        <div>
            <h1>Выберите класс:</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {classes.map((cl, index) => (
                    <div
                        key={index}
                        style={{
                            margin: '10px',
                            cursor: 'pointer',
                            border: selectedClass === cl.name ? '2px solid blue' : 'none',
                        }}
                        onClick={() => handleClassClick(cl.name)}
                    >
                        <img src={cl.image} alt={cl.name} style={{ width: '150px', height: '150px' }} />
                        <h2>{cl.name}</h2>
                    </div>
                ))}
            </div>
            {selectedClass && (
                <div>
                    <h3>Выбранный класс: {selectedClass}</h3>
                    <h4>Подклассы:</h4>
                    <div>
                        {classes
                            .find((cl) => cl.name === selectedClass)
                            ?.subclasses.map((subclass, index) => (
                                <div
                                    key={index}
                                    style={{
                                        cursor: 'pointer',
                                        margin: '5px 0',
                                        color: selectedSubclass?.name === subclass.name ? 'blue' : 'black',
                                    }}
                                    onClick={() => setSelectedSubclass(subclass)}
                                >
                                    {subclass.name}
                                </div>
                            ))}
                    </div>
                    {selectedSubclass && (
                        <div>
                            <h5>Выбранный подкласс: {selectedSubclass.name}</h5>
                            <p><strong>Статы:</strong></p>
                            <ul>
                                <li>Здоровье: {selectedSubclass.stats.health} ({selectedSubclass.stats.health*10} хп)</li>
                                <li>Сила: {selectedSubclass.stats.strength} ({Math.floor(selectedSubclass.stats.strength*0.5)}-{Math.ceil(selectedSubclass.stats.strength*1.5)} урон)</li>
                                <li>Ловкость: {selectedSubclass.stats.dexterity} (уклонение и инициатива)</li>
                                <li>Интеллект: {selectedSubclass.stats.intelligence} ({selectedSubclass.stats.intelligence*4} мана)</li>
                                <li>Звезды: {selectedSubclass.stats.stars}</li>
                            </ul>
                            <button>Выбрать</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}