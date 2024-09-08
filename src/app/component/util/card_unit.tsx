import React from 'react';

interface MonsterProps {
    name: string;
    health: number;
    attack: number;
    agility: number;
    intellect?: number;
    summon?: string;
    specialAbility?: string;
    image?: string;
}

interface MobComponentProps {
    monster: MonsterProps;
}

const Card_Unit: React.FC<MobComponentProps> = ({ monster }) => {
    const currentHp = monster.health*4
    const maxHp = monster.health*4
    const currentMana = monster.intellect ? monster.intellect*10 : 0
    const maxMana = monster.intellect ? monster.intellect*10 : 0
  return (
    <div className="flex items-center justify-center">
      <div className="mr-0 w-10 h-48 ml-2 bg-gray-200 rounded">
        <div
          className="bg-red-500 rounded-t"
          style={{ height: `${(currentHp / maxHp) * 100}%` }}
        />
        <span className="text-black text-lg">HP</span>
      </div>
      <div className="relative">
        <img src={monster.image} alt="Mob Image" className="w-48 h-48" />
        <div className="absolute top-0 left-0 text-lg">
          <span>❤️: {monster.health}</span>
        </div>
        <div className="absolute top-0 right-0 text-lg">
          <span>💧: {monster.intellect}</span>
        </div>
        <div className="absolute bottom-0 left-0 text-lg">
          <span>🗡: {monster.attack}</span>
        </div>
        <div className="absolute bottom-0 right-0 text-lg">
          <span>🦶: {monster.agility}</span>
        </div>
      </div>
      <div className="ml-0 w-10 h-48 mr-2 bg-gray-200 rounded">
        <div
          className="bg-blue-500 rounded-t"
          style={{ height: `${(currentMana / maxMana) * 100}%` }}
        />
        <span className="text-black text-lg">MP</span>
      </div>
    </div>
  );
};

export default Card_Unit;