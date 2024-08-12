// lib/locations.js

export const locations = {
    'Древо-5': {
        mobs: {
            normal: [
                { name: 'Синий слизень', health: 3, strength: 3, agility: 3, intelligence: 1, skill: '(После смерти призывает маленького синего слизня 2/1/1 - 4 маны)' },
                { name: 'Красный слизень', health: 3, strength: 4, agility: 3, intelligence: 0, skill: '-' },
                { name: 'Зелёный слизень', health: 4, strength: 3, agility: 3, intelligence: 0, skill: '-' },
                { name: 'Жёлтый слизень', health: 3, strength: 3, agility: 4, intelligence: 0, skill: '-' },
            ],
            elite: [
                { name: 'Чёрный слизень', health: 7, strength: 5, agility: 5, intelligence: 3, skill: '(Прыжок сверху - 100% урона + 50% шанс оглушения, 5 маны)' },
            ],
            boss: [
                { name: 'Король слизней', health: 10, strength: 8, agility: 6, intelligence: 6, skill: '(Призыв рандомного обычного слизня - 10 маны)' },
            ],
        }
    },
    // Добавьте другие локации здесь
    'Подземелье-1': {
        mobs: {
            normal: [
                { name: 'Обычный монстр 1', health: 4, strength: 2, agility: 2, intelligence: 0, skill: '-' },
                { name: 'Обычный монстр 2', health: 5, strength: 3, agility: 1, intelligence: 1, skill: '(Удар в спину - 10 маны)' },
            ],
            elite: [],
            boss: [],
        }
    },
    // и т.д.
};
