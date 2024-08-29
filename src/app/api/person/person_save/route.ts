import { NextResponse } from 'next/server';
import { heroes } from '@/app/config.ts/person'; // Импортируем тип их конфигурации
import prisma from '@/app/module/prisma_client'; // Импортируйте prisma для работы с вашей базой данных

export async function POST(request: Request) {
    try {
        const { name, id_account, nickname } = await request.json(); // Получаем только имя и id_account из запроса

        // Проверка, существует ли герой в конфигурации
        const heroConfig = heroes.find(hero => hero.name === name);

        if (!heroConfig) {
            return NextResponse.json({ message: 'Герой не найден в конфигурации' }, { status: 400 });
        }

        // Проверка на существование героя в базе данных
        const existingHero = await prisma.person.findFirst({
            where: { name: nickname }
        });

        if (existingHero) {
            return NextResponse.json({ message: 'Герой с таким именем уже существует' }, { status: 400 });
        }

        // Сохранение героя в базу данных, используя данные из конфига
        const savedHero = await prisma.person.create({
            data: {
                name: heroConfig.name,
                nickname: nickname,
                class: heroConfig.translit, // Предполагая, что у вас есть поле class в модели Person
                health: heroConfig.health,
                strength: heroConfig.strength,
                dexterity: heroConfig.dexterity,
                intelligence: heroConfig.intelligence,
                stars: heroConfig.stars,
                //skills: heroConfig.skills,
                //passives: heroConfig.passives,
                //image: heroConfig.image,
                id_account: Number(id_account), // Передаем id_account
            },
        });

        console.log('Сохраненный герой:', savedHero); // Для отладки; удалить позже

        return NextResponse.json({ message: 'Герой успешно сохранен' });
    } catch (error) {
        console.error('Ошибка при сохранении героя:', error);
        return NextResponse.json({ message: 'Ошибка при сохранении героя' }, { status: 500 });
    }
}
