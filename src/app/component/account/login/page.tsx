"use client"
import './auth.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Для навигации

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Добавлено состояние для успешного сообщения
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null); // Сбрасываем сообщение об ошибке
        setSuccessMessage(null); // Сбрасываем сообщение об успехе

        const response = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('id_account', data.user.id); // Сохраняем идентификатор пользователя
            
            setSuccessMessage('Успешный вход! Вы будете перенаправлены через 3 секунды'); // Устанавливаем сообщение об успехе
            
            // Перенаправление после успешного входа через 3 секунды
            setTimeout(() => {
                router.push('/component/menu'); // Замените '/menu' на ваш маршрут
            }, 3000);
        } else {
            const data = await response.json();
            setErrorMessage(data.message || 'Неверный логин или пароль'); // Устанавливаем сообщение об ошибке
        }
    };

    return (
        <div className="auth-container">
            <h1>Логин</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Войти</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>} {/* Выводим сообщение об успехе */}
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Выводим сообщение об ошибке */}
            <p className="switch-page">
                Нет аккаунта? <Link href="/component/account/register">Зарегистрируйтесь здесь</Link>
            </p>
        </div>
    );
}
