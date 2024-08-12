// pages/index.tsx
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Добро пожаловать в Мир Приключений!</h1>
                <p>Исследуйте опасные подземелья, сражайтесь с врагами и накапливайте богатства.</p>
            </header>
            <section className="features">
                <div className="feature">
                    <h2>Одиночные Приключения</h2>
                    <p>Используйте свои навыки для преодоления сложных уровней и получения уникальных наград.</p>
                </div>
                <div className="feature">
                    <h2>Командные Сражения</h2>
                    <p>Соберите команду и объедините усилия для победы над мощными боссами!</p>
                </div>
                <div className="feature">
                    <h2>Рейтинги и Достижения</h2>
                    <p>Соревнуйтесь с другими игроками и достигайте высших позиций!</p>
                </div>
            </section>
            <section className="call-to-action">
                <Link href="/component/account/login" className="cta-button">Начать Приключение</Link>
            </section>
            <footer className="footer">
                <p>&copy; 2023 Мир Приключений. Все права защищены.</p>
            </footer>
        </div>
    );
}
