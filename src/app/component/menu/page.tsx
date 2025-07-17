"use client";
import Header from '../account/header/page';
import './menu.css';
import Link from 'next/link';

export default function Dungeon() {
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="grid">
                    <Link href="/profile" className="item">Профиль + инвентари</Link>
                    {/*<Link href="/time" className="item">Время</Link> /*/}
                    <Link href="/settings" className="item">Настройки</Link>
                    <Link href="/rating" className="item locked">🔒 Рейтинг</Link>
                    <Link href="/exchange" className="item">Обмен</Link>
                    <Link href="/achievements" className="item">Достижения</Link>
                    <Link href="/component/event/single-dungeon" className="item">Одиночное подземелье (сад)</Link>
                    <Link href="/tower" className="item">Башня</Link>
                    <Link href="/arena" className="item locked">🔒 Арена</Link>
                    <Link href="/group-dungeon" className="item locked">🔒 Групповое подземелье (гад)</Link>
                    <Link href="/dragon-lair" className="item">Драконье логово</Link>
                    <Link href="/invasion" className="item locked">🔒 Нашестие</Link>
                    <Link href="/forge" className="item">Кузница</Link>
                    <Link href="/alchemy-lab" className="item">Алхимическая лаборатория</Link>
                    <Link href="/shop" className="item">Магазин</Link>
                </div>
            </div> 
        </div>
    );
}
