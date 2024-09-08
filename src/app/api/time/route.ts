import { NextResponse } from 'next/server';
import { heroes } from '@/app/config.ts/person'; // Импортируем тип их конфигурации
import prisma from '@/app/module/prisma_client'; // Импортируйте prisma для работы с вашей базой данных

export async function POST(request: Request) {
    try {
        const currentTime = Math.floor(Date.now() / 1000); // Получаем текущее время в секундах
        return NextResponse.json({ message: 'Такого аккаунта не существует', unixTime: currentTime })
    } catch (error) {
        console.error('Ошибка при сохранении героя:', error);
        return NextResponse.json({ message: 'Ошибка при Загрузки героя' }, { status: 500 });
    }
}
