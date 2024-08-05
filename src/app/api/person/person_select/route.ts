import { Hero, heroes } from '@/app/config.ts/person';
import { NextRequest, NextResponse } from 'next/server';

const chances = [
    { stars: 1, weight: 80 },
    { stars: 2, weight: 10 },
    { stars: 3, weight: 5 },
    { stars: 4, weight: 3 },
    { stars: 5, weight: 1 },
];

// Функция для получения случайного индекса на основе весов
const weightedRandom = (items: { stars: number; weight: number }[]): number => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += items[i].weight;
        if (random <= cumulativeWeight) {
            return items[i].stars; // Возвращаем звезды выбранного героя
        }
    }

    return items[items.length - 1].stars; // Возвращаем последний элемент по умолчанию
};

const getRandomHero = (usedHeroes: Set<string>): Hero | undefined => {
    // Фильтруем героев, исключив 6★
    const filteredHeroes = heroes.filter(hero => hero.stars < 6);
    const selectedStars = weightedRandom(chances);

    const availableHeroes = filteredHeroes.filter(
        (hero) => hero.stars === selectedStars && !usedHeroes.has(hero.name)
    );

    if (availableHeroes.length > 0) {
        return availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    }

    return undefined;
};

const rollHeroes = (): Hero[] => {
    const selectedHeroes: Hero[] = [];
    const usedHeroes = new Set<string>();

    while (selectedHeroes.length < 5) {
        const hero = getRandomHero(usedHeroes);
        if (hero) {
            selectedHeroes.push(hero);
            usedHeroes.add(hero.name);
        }
    }

    // Проверяем условия для гарантированного 2★ героя
    const countUnstarred = selectedHeroes.filter(hero => hero.stars < 2).length;
    if (countUnstarred === 5) {
        // 99.99% шанс на получение 2★ героя
        const randGuarantee = Math.random() * 100;
        if (randGuarantee <= 99.99) {
            const guaranteedHero = heroes.filter(hero => hero.stars == 2 && !usedHeroes.has(hero.name));
            if (guaranteedHero.length > 0) {
                const heroToReplaceIndex = Math.floor(Math.random() * 5);
                selectedHeroes[heroToReplaceIndex] = guaranteedHero[Math.floor(Math.random() * guaranteedHero.length)];
                console.log('Гарант: получен 2★ герой');
            }
        } else {
            // Неудача, выдаем 6★ героя
            const sixStarHeroes = heroes.filter(hero => hero.stars === 6 && !usedHeroes.has(hero.name));
            if (sixStarHeroes.length > 0) {
                const heroToReplaceIndex = Math.floor(Math.random() * 5);
                selectedHeroes[heroToReplaceIndex] = sixStarHeroes[Math.floor(Math.random() * sixStarHeroes.length)];
                console.log('Невероятная неудача: получен 6★ герой');
            }
        }
    }

    return selectedHeroes;
};

export async function POST(request: NextRequest) {
    try {
        const rolledHeroes = rollHeroes();
        return NextResponse.json(rolledHeroes);
    } catch (error) {
        console.error('Ошибка:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
