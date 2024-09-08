import { NextResponse } from 'next/server';
import { heroes } from '@/app/config.ts/person'; // Импортируем тип их конфигурации
import prisma from '@/app/module/prisma_client'; // Импортируйте prisma для работы с вашей базой данных

export async function POST(request: Request) {
    try {
        const { id_account, id_person } = await request.json(); // Получаем только имя и id_account из запроса
        // Проверка на существование героя в базе данных
        const account = await prisma.account.findFirst({
            where: { id: Number(id_account) }
        });
        if (!account) {
            return NextResponse.json({ message: 'Такого аккаунта не существует' }, { status: 404 })
        }
        const person = await prisma.person.findFirst({ where: { id: id_person, id_account: account.id } })
        if (!person) { return NextResponse.json({ message: 'Нельзя сменить персонажа на несуществующего' }, { status: 404 }) }
        await prisma.account.update({ where: { id: person.id_account }, data: { select_user: person.id } })
        const heroConfig = heroes.find(hero => hero.name === person.name);

        if (!heroConfig) {
            return NextResponse.json({ message: 'Герой не найден в конфигурации' }, { status: 400 });
        }

        return NextResponse.json({ 
            message: 'Герой успешно изменен', 
            person: {
                name: heroConfig.name,
                nickname: person.nickname,
                class: heroConfig.translit, // Предполагая, что у вас есть поле class в модели Person
                health: person.health,
                strength: person.strength,
                dexterity: person.dexterity,
                intelligence: person.intelligence,
                stars: person.stars,
                //skills: heroConfig.skills,
                //passives: heroConfig.passives,
                image: heroConfig.image,
                id_account: Number(id_account), // Передаем id_account
            }
        });
    } catch (error) {
        console.error('Ошибка при сохранении героя:', error);
        return NextResponse.json({ message: 'Ошибка при Загрузки героя' }, { status: 500 });
    }
}
