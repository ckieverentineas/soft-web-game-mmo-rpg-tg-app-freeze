import React, { useState, useEffect } from 'react';

interface Hero {
  id: number;
  name: string;
  nickname: string;
  class: string;
  health: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  stars: number;
  crdate: Date;
  update: Date;
  image: string;
  id_account: number;
}

const defaultHero: Hero = {
    id: 1,
    name: 'Инженер',
    nickname: 'Джо',
    class: 'engineer',
    health: 5,
    strength: 5,
    dexterity: 5,
    intelligence: 5,
    stars: 3,
    image: '',
    crdate: new Date('2024-08-29T02:20:09.796Z'),
    update: new Date('2024-08-29T02:20:09.796Z'),
    id_account: 2,
  };
  
  const heroes: Hero[] = [
    { ...defaultHero },
    { id: 2, name: 'Воин', nickname: 'Артур', class: 'warrior', health: 6, strength: 7, dexterity: 5, intelligence: 3, stars: 5, image: '', crdate: new Date(), update: new Date(), id_account: 2 },
    // Другие герои...
  ];

const Header = () => {
  const [hero, setHero] = useState<Hero>();
  const [showHeroSelector, setShowHeroSelector] = useState(false);

  useEffect(() => {
    const idAccount = localStorage.getItem('id_account');
    if (idAccount) {
      fetchHeroByAccount(idAccount);
    }
  }, []);

  const fetchHeroByAccount = async (idAccount: string) => {
    try {
      const response = await fetch(`/api/person/person_default`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_account: Number(idAccount) }),
    }); // Запрос для получения информации о аккаунте
      const accountData = await response.json();
      if (accountData && response.ok) {
        setHero({
            id: accountData.person.id,
            name: accountData.person.name,
            nickname: accountData.person.nickname,
            class: accountData.person.class,
            health: accountData.person.health,
            strength: accountData.person.strength,
            dexterity: accountData.person.dexterity,
            intelligence: accountData.person.intelligence,
            stars: accountData.person.stars,
            image: accountData.person.image, // Добавлено поле image
            crdate: new Date(), 
            update: new Date(), 
            id_account: accountData.person.id_account,
        });
    }
    
    } catch (error) {
      console.error('Ошибка при загрузке героя в header:', error);
    }
  };

  const handleHeroSelectorToggle = () => {
    setShowHeroSelector(!showHeroSelector);
  };

  const handleHeroChange = (selectedHero: Hero) => {
    setHero(selectedHero);
    updateHero(selectedHero);
    setShowHeroSelector(false);
  };

  const updateHero = async (updatedHero: Hero) => {
    const idAccount = localStorage.getItem('id_account');
    if (!idAccount) return;

    try {
      const response = await fetch('/api/heroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedHero,
          id_account: parseInt(idAccount, 10), // Используем id_account из localStorage
        }), 
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении героя на сервере');
      }

      const result = await response.json();
      console.log('Герой успешно обновлен:', result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleLogout = () => {
    // Логика выхода здесь
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        {hero?.image && <img src={hero.image} alt={hero.nickname} className="ml-2 h-10 w-10 rounded-full mr-2"/>} {/* Отображение изображения */}
        <span className="font-bold">{hero?.nickname}</span>
      </div>
      <div className="flex items-center">
        <span className="font-bold">
          <label className='ml-2' title='Здоровье'>{hero?.health}❤️</label>
          <label className='ml-2' title='Сила'>{hero?.strength}⚔️</label>
          <label className='ml-2' title='Ловкость'>{hero?.dexterity}🦶</label>
          <label className='ml-2' title='Интеллект'>{hero?.intelligence}💧</label>
          <label className='ml-2' title='Звездность'>{hero?.stars}⭐</label>
        </span>
      </div>
      {showHeroSelector && (
        <div className="absolute bg-gray-700 rounded shadow-lg mt-2 p-4">
          {heroes.map((h) => (
            <div key={h.id} className="py-2 cursor-pointer hover:bg-gray-600" onClick={() => handleHeroChange(h)}>
              {h.nickname}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center">
        <button
          className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded mr-2"
          onClick={handleHeroSelectorToggle}
        >
          🔀
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Header;
