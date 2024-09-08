import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DayNightTimer from '../../util/timer_day_and_night';

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

const Header = () => {
  const [hero, setHero] = useState<Hero>();
  const [heroes, setHeroes] = useState<Array<Hero>>([]);
  const [showHeroSelector, setShowHeroSelector] = useState(false);

  useEffect(() => {
    const idAccount = localStorage.getItem('id_account');
    if (idAccount) {
      fetchHeroByAccount(idAccount);
      fetchHeroesByAccount(idAccount);
    }
  }, []);

  const fetchHeroByAccount = async (idAccount: string) => {
    try {
        const response = await fetch('/api/person/person_default', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_account: Number(idAccount) }),
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при загрузке героя');
        }
        
        const accountData = await response.json();
        if (accountData) {
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
                image: accountData.person.image,
                crdate: new Date(),
                update: new Date(),
                id_account: accountData.person.id_account,
            });
        }
        
    } catch (error) {
        console.error('Ошибка при загрузке героя в header:', error);
    }
  };
  
  const fetchHeroesByAccount = async (idAccount: string) => {
    try {
        const response = await fetch('/api/person/person_all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_account: Number(idAccount) }),
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при загрузке всех героев');
        }

        const accountData: { message: string, persons: Array<any> } = await response.json();

        if (Array.isArray(accountData.persons)) {
            setHeroes(accountData.persons);
        } else {
            console.error("Полученные данные не являются массивом:", accountData);
        }
        
    } catch (error) {
        console.error('Ошибка при загрузке героев в header:', error);
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
      const response = await fetch('/api/person/person_change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedHero,
          id_account: parseInt(idAccount, 10), id_person: updatedHero.id
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
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <div className="flex items-center bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded mr-2" onClick={handleHeroSelectorToggle}>
        {hero?.image && <img src={hero.image} alt={hero.nickname} className="ml-2 h-10 w-10 rounded-full mr-2"/>} 
        <span className="font-bold">{hero?.nickname} ({hero?.name}{'⭐'.repeat(hero ? hero.stars : 0)})</span>
      </div>
      <div className="flex items-center">
        <span className="font-bold">
          <label className='ml-2' title='Здоровье'>{hero?.health}❤️</label>
          <label className='ml-2' title='Сила'>{hero?.strength}🗡</label>
          <label className='ml-2' title='Ловкость'>{hero?.dexterity}🦶</label>
          <label className='ml-2' title='Интеллект'>{hero?.intelligence}💧</label>
        </span>
      </div>
      {showHeroSelector && (
        <div className="absolute bg-gray-700 rounded shadow-lg mt-12 p-4 max-h-60 overflow-y-auto w-64 z-10" style={{ top: '30%', left: '0.75%' }}>
          {heroes.map((h) => (
            <div 
              key={h.id} 
              className="flex items-center py-2 cursor-pointer hover:bg-gray-600" 
              onClick={() => handleHeroChange(h)}>
              {h.image && <img src={h.image} alt={h.nickname} className="h-8 w-8 rounded-full mr-2"/>}
              <span>{h.nickname}</span>
            </div>
          ))}
          <div className="flex items-center py-2 cursor-pointer hover:bg-gray-600">
            <Link href="/component/person" className="flex items-center">
              <span className="mr-2">+</span> Добавить героя
            </Link>
          </div>
        </div>
      )}
      
      <div className="flex items-center">
        <DayNightTimer />
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
