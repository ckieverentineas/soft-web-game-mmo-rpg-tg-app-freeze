import { NextResponse } from 'next/server';

export const events = [
    { type: 'Обычный монстр', chance: 56.5 },
    { type: 'Элитный монстр', chance: 15 },
    { type: 'Босс', chance: 5 },
    { type: 'ПвП', chance: 10 },
    { type: 'Сундук', chance: 5 },
    { type: 'Продавец зелий', chance: 2 },
    { type: 'Шахтёр', chance: 2 },
    { type: 'Наёмник', chance: 2 },
    { type: 'Кристалл', chance: 2 },
    { type: 'Торговец ценностями', chance: 0.5 },
];

function getRandomEvent(): string | null {
    const random = Math.random() * 100; // Генерируем случайное число от 0 до 100
    let cumulativeChance = 0;

    for (const event of events) {
        cumulativeChance += event.chance;

        if (random <= cumulativeChance) {
            return event.type;
        }
    }

    return null; // Если ничего не найдено, вернуть null
}

export async function POST(request: Request) {
    try {
        // Здесь можно обработать входные данные, если это необходимо
        const data = await request.json(); // Получаем данные из запроса, если нужно
        console.log('Полученные данные:', data); // Для отладки; удалить позже

        const event = getRandomEvent(); // Получаем случайное событие

        return NextResponse.json({ message: 'Исследование завершено', event });
    } catch (error) {
        console.error('Ошибка при исследовании:', error);
        return NextResponse.json({ message: 'Ошибка при исследовании' }, { status: 500 });
    }
}
