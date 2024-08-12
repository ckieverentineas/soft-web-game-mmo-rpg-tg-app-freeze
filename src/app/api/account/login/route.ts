import { Decrypt_Data } from "@/app/module/crypto";
import prisma from "@/app/module/prisma_client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Проверка на не null, не undefined и не пустую строку
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return NextResponse.json({ message: 'Электронная почта не может быть пустой' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
        return NextResponse.json({ message: 'Пароль не может быть пустым' }, { status: 400 });
    }

    const user = await prisma.account.findFirst({
        where: { login: email },
    });

    if (user) {
        const encryptedPassword = Decrypt_Data(user.password); // Шифруем введённый пароль
        console.log(`${email} --> ${password} = ${encryptedPassword}`)
        if (password === encryptedPassword) {
            return NextResponse.json({ message: 'Успешный вход', user: { id: user.id } }, { status: 200 }); // Отправляем только ID
        }
    }
    
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
}
