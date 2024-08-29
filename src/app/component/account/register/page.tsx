// pages/register.tsx
"use client"
import './auth.css';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проверка формата электронной почты
        if (!emailPattern.test(email)) {
            setError('Пожалуйста, введите корректный адрес электронной почты.');
            return;
        }

        const response = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setSuccess(data.message);
            setTimeout(() => {
                // Перенаправление на страницу входа через несколько секунд
                window.location.href = '/component/account/login'; // Измените путь на нужный
            }, 3000);
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>Регистрация</h1>
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
                <button type="submit" className="submit-button">Зарегистрироваться</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <p className="switch-page">
                Уже есть аккаунт? <Link href="/component/account/login">Войдите здесь</Link>
            </p>
        </div>
    );
}
