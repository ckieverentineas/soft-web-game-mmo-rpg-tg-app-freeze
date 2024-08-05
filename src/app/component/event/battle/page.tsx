import { useState, useRef, useEffect } from 'react';
import './Battle.css';

interface Monster {
    name: string;
    health: number;
    attack: number;
    agility: number;
    intellect?: number;
    summon?: string;
    specialAbility?: string;
    image?: string;
}

interface Player {
    maxHealth: number;
    currentHealth: number;
    maxMana: number;
    currentMana: number;
    attack: number;
}

interface BattleProps {
    monsters: Monster[];
    onClose: () => void;
}

const HEALTH_MULTIPLIER = 10;

function Battle({ monsters, onClose }: BattleProps) {
    const initialPlayer: Player = {
        maxHealth: 100,
        currentHealth: 100,
        maxMana: 0,
        currentMana: 0,
        attack: 4,
    };

    const [player, setPlayer] = useState(initialPlayer);
    const [currentMonsters, setCurrentMonsters] = useState<Monster[]>([]);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isBattleActive, setIsBattleActive] = useState(false);
    const [currentMonsterIndex, setCurrentMonsterIndex] = useState<number | null>(null);
    const logRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const initializedMonsters = monsters.map(monster => ({
            ...monster,
            health: monster.health * HEALTH_MULTIPLIER,
        }));
        setCurrentMonsters(initializedMonsters);
        setPlayer(prev => ({
            ...prev,
            maxMana: initializedMonsters.reduce((acc, m) => acc + (m.intellect || 0) * 4, 0),
            currentMana: 0,
        }));
    }, [monsters]);

    const logMessage = (message: string) => {
        setBattleLog(prev => [message, ...prev]);
        logRef.current?.scrollTo(0, logRef.current.scrollHeight);
    };

    const startBattle = () => {
        setBattleLog([]);
        setCurrentMonsterIndex(null);
        setIsBattleActive(true);
        logMessage(`Начинается бой с ${currentMonsters.map(m => m.name).join(', ')}!`);
    };

    const attackMonster = () => {
        if (currentMonsterIndex === null || currentMonsters[currentMonsterIndex].health <= 0) return;

        const monster = currentMonsters[currentMonsterIndex];
        const damageToMonster = Math.min(monster.health, player.attack);
        const newMonsterHealth = monster.health - damageToMonster;

        logMessage(`Вы атаковали ${monster.name} и нанесли ${damageToMonster} урона.`);
        logMessage(`${monster.name} осталось здоровья: ${newMonsterHealth}`);

        setCurrentMonsters(prev => {
            const updatedMonsters = [...prev];
            updatedMonsters[currentMonsterIndex].health = newMonsterHealth;
            return updatedMonsters;
        });

        if (newMonsterHealth <= 0) logMessage(`Вы победили ${monster.name}!`);

        setCurrentMonsterIndex(null);
        monsterTurn();
    };

    const monsterTurn = () => {
        const aliveMonsters = currentMonsters.filter(m => m.health > 0);
        if (aliveMonsters.length === 0) {
            logMessage(`Вы победили всех монстров!`);
            setIsBattleActive(false);
            return;
        }

        aliveMonsters.forEach(monster => {
            const damageToPlayer = Math.min(player.currentHealth, monster.attack);
            const newHealth = player.currentHealth - damageToPlayer;
            logMessage(`${monster.name} атакует вас и наносит ${damageToPlayer} урона.`);
            logMessage(`У вас осталось здоровья: ${newHealth}`);

            setPlayer(prev => ({ ...prev, currentHealth: newHealth }));
            if (newHealth <= 0) logMessage(`Вы проиграли бой!`);
        });
    };

    return (
        <div className="battle-container">
            <h3>Бой с монстрами</h3>

            <div className="monster-cards">
                <h4>Монстры:</h4>
                <div className="monster-card-container">
                    {currentMonsters.map((monster, index) => (
                        <div className="monster-card" key={index} onClick={() => setCurrentMonsterIndex(index)}>
                            <div className="monster-image-container">
                                {monster.image && <img src={monster.image} alt={monster.name} className="monster-image" />}
                            </div>
                            <div className="monster-header">
                                <span className="health-label">{monster.health}/{monster.health}❤️</span>
                                <span className="mana-label">{monster.intellect ? 4 * monster.intellect : 0}/12💧</span>
                            </div>
                            <div className="monster-stats">
                                <span className="attack-label">{monster.attack}⚔️</span>
                                <span className="agility-label">{monster.agility}⚡</span>
                            </div>
                            {currentMonsterIndex === index && <div className="crosshair"></div>}
                        </div>
                    ))}
                </div>
            </div>

            <h2>VS</h2>
            {currentMonsterIndex !== null && <div className="vs-container"><h4>{currentMonsters[currentMonsterIndex]?.name}</h4></div>}

            <div className="player-card">
                <div className="player-header">
                    <span className="health-label">{player.currentHealth}/{player.maxHealth}❤️</span>
                    <span className="mana-label">{player.currentMana}/{player.maxMana}💧</span>
                </div>
                <h4>Параметры игрока</h4>
                <p>Атака: {player.attack}</p>
            </div>

            <div className="controls-container">
                <button onClick={isBattleActive ? onClose : startBattle}>
                    {isBattleActive ? 'Сдаться' : 'Начать бой'}
                </button>
                {isBattleActive && currentMonsterIndex !== null && (
                    <button onClick={attackMonster}>Атаковать {currentMonsters[currentMonsterIndex]?.name}</button>
                )}
            </div>

            <h4>Лог боя:</h4>
            <ul ref={logRef} className="battle-log" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {battleLog.map((log, index) => <li key={index}>{log}</li>)}
            </ul>
        </div>
    );
}

export default Battle;
