import { NextResponse } from 'next/server';
import { Hero } from '@/app/config.ts/person'; // Импортируем тип Hero

export async function POST(request: Request) {
    try {
        const hero: Hero = await request.json(); // Получаем данные из запроса

        // Здесь вы можете добавить код для сохранения в вашу базу данных
        // Например, используя библиотеку для работы с БД (MongoDB, PostgreSQL и т.д.)

        console.log('Сохраненный герой:', hero); // Для отладки; удалить позже

        return NextResponse.json({ message: 'Герой успешно сохранен' });
    } catch (error) {
        console.error('Ошибка при сохранении героя:', error);
        return NextResponse.json({ message: 'Ошибка при сохранении героя' }, { status: 500 });
    }
}
