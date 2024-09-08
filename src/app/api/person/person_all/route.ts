import { NextResponse } from 'next/server';
import { heroes } from '@/app/config.ts/person'; // Импортируем тип их конфигурации
import prisma from '@/app/module/prisma_client'; // Импортируйте prisma для работы с вашей базой данных

export async function POST(request: Request) {
    try {
        const { id_account } = await request.json(); // Получаем только имя и id_account из запроса
        // Проверка на существование героя в базе данных
        const account = await prisma.account.findFirst({
            where: { id: Number(id_account) }
        });
        if (!account) {
            return NextResponse.json({ message: 'Такого аккаунта не существует' }, { status: 404 })
        }
        let persons = await prisma.person.findMany({ where: { id_account: account.id } })
        if (persons.length < 1) {
            return NextResponse.json({ message: 'У вас еще нет персонажей' }, { status: 404 }) 
        }
        const ans = []
        for (const person of persons) {
            const heroConfig = heroes.find(hero => hero.name === person.name);
            if (!heroConfig) { continue }
            ans.push(
                {
                    ...person,
                    image: heroConfig.image,
                }
            )
        }
        return NextResponse.json({ 
            message: 'Герои успешно подгружены', 
            persons: ans
        });
        
    } catch (error) {
        console.error('Ошибка при сохранении героя:', error);
        return NextResponse.json({ message: 'Ошибка при Загрузки героя' }, { status: 500 });
    }
}
