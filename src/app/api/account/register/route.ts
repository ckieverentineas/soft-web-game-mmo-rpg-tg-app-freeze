// pages/api/register.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/module/prisma_client';
import { Encrypt_Data } from "@/app/module/crypto"; // Предположим, что у вас есть функция для шифрования пароля

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Проверка на пустые значения
    if (!email || !password) {
        return NextResponse.json({ message: 'Электронная почта и пароль обязательны' }, { status: 400 });
    }

    // Проверка на существование пользователя
    const existingUser = await prisma.account.findFirst({
        where: { login: email },
    });

    if (existingUser) {
        return NextResponse.json({ message: 'Пользователь с такой электронной почтой уже существует' }, { status: 409 });
    }

    // Шифруем пароль
    const encryptedPassword = Encrypt_Data(password);

    // Создание нового пользователя
    const newUser = await prisma.account.create({
        data: {
            login: email,
            password: encryptedPassword,
        },
    });

    return NextResponse.json({ message: 'Регистрация успешна', user: newUser }, { status: 201 });
}
