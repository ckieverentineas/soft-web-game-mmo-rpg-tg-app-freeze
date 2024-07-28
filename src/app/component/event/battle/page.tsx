import { useState, useRef, useEffect } from 'react';
import './Battle.css';

interface Monster {
    name: string;
    health: number; // Здоровье в "здоровье"
    attack: number;
    agility: number;
    intellect?: number;
    summon?: string; // Призыв при смерти
    specialAbility?: string; // Специальная способность
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

const HEALTH_MULTIPLIER = 10; // 1 здоровье = 10 ХП

function Battle({ monsters, onClose }: BattleProps) {
    const initialPlayer: Player = {
        maxHealth: 100,
        currentHealth: 100,
        maxMana: 0,
        currentMana: 0,
        attack: 4
    };

    const [player, setPlayer] = useState(initialPlayer);
    const [currentMonsters, setCurrentMonsters] = useState<Monster[]>([]);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isBattleActive, setIsBattleActive] = useState(false);
    const [currentMonsterIndex, setCurrentMonsterIndex] = useState<number | null>(null);
    const logRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // Инициализация мобильных
        const initializedMonsters = monsters.map(monster => ({
            ...monster,
            health: monster.health * HEALTH_MULTIPLIER, // Текущее здоровье начинается с значения (здоровье * 10)
        }));
        setCurrentMonsters(initializedMonsters);
    }, [monsters]);

    // Установка максимальной маны игрока
    useEffect(() => {
        const maxMana = currentMonsters.reduce((acc, m) => acc + (m.intellect || 0) * 4, 0);
        setPlayer(prevPlayer => ({ ...prevPlayer, maxMana, currentMana: 0 }));
    }, [currentMonsters]);

    const startBattle = () => {
        setBattleLog([]);
        setCurrentMonsterIndex(null);
        setIsBattleActive(true);
        logMessage(`Начинается бой с ${currentMonsters.map(m => m.name).join(', ')}!`);
    };

    const logMessage = (message: string) => {
        setBattleLog(prevLog => [message, ...prevLog]);
    };

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [battleLog]);

    const attackMonster = () => {
        if (currentMonsterIndex === null || currentMonsters[currentMonsterIndex].health <= 0) return;

        const monster = currentMonsters[currentMonsterIndex];
        const damageToMonster = Math.min(monster.health, player.attack);
        const newMonsterHealth = monster.health - damageToMonster;

        logMessage(`Вы атаковали ${monster.name} и нанесли ${damageToMonster} урона.`);
        logMessage(`${monster.name} осталось здоровья: ${newMonsterHealth}`);

        setCurrentMonsters(prevMonsters => {
            const updatedMonsters = [...prevMonsters];
            updatedMonsters[currentMonsterIndex].health = newMonsterHealth;
            return updatedMonsters;
        });

        if (newMonsterHealth <= 0) {
            logMessage(`Вы победили ${monster.name}!`);
        }

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

        aliveMonsters.forEach((monster) => {
            const damageToPlayer = Math.min(player.currentHealth, monster.attack);
            const newHealth = player.currentHealth - damageToPlayer;

            logMessage(`${monster.name} атакует вас и наносит ${damageToPlayer} урона.`);
            logMessage(`У вас осталось здоровья: ${newHealth}`);

            setPlayer(prevPlayer => ({ ...prevPlayer, currentHealth: newHealth }));

            if (newHealth <= 0) {
                logMessage(`Вы проиграли бой!`);
                setIsBattleActive(false);
                return;
            }
        });
    };

    const healthPercent = (current: number, max: number) => (current / max) * 100;

    return (
        <div className="battle-container">
            <h3>Бой с монстрами</h3>

            <div className="monster-cards">
                <h4>Монстры:</h4>
                <div className="monster-card-container">
                    {currentMonsters.map((monster, index) => (
                        <div
                            key={index}
                            className="monster-card"
                            style={{ opacity: monster.health > 0 ? 1 : 0.5 }}
                            onClick={() => setCurrentMonsterIndex(index)}
                        >
                            <h5>{monster.name}</h5>
                            <div className="health-bar">
                                <div className="health-fill" style={{ width: `${healthPercent(monster.health, monster.health)}%` }} />
                            </div>
                            <p>Здоровье: {monster.health}/{monster.health}</p> {/* Отображаем здоровье в хп */}
                            <p>Атака: {monster.attack}</p>
                            <p>Ловкость: {monster.agility}</p>
                            {monster.intellect && (
                                <>
                                    <p>Интеллект: {monster.intellect}</p>
                                    <div className="mana-bar" style={{ background: 'lightblue' }}>
                                        <div className="mana-fill" style={{ width: `${healthPercent(monster.intellect ? 4 * monster.intellect : 0, monster.intellect ? 4 * monster.intellect : 0)}%` }} />
                                    </div>
                                    <p>Мана: {monster.intellect ? 4 * monster.intellect : 0}/{monster.intellect ? 4 * monster.intellect : 0}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <h2>VS</h2>

            {currentMonsterIndex !== null && (
                <div className="vs-container">
                    <h4>{currentMonsters[currentMonsterIndex]?.name}</h4>
                </div>
            )}

            <div className="player-card">
                <h4>Параметры игрока</h4>
                <p>Атака: {player.attack}</p>
                <div className="health-bar">
                    <h4>Ваше здоровье: {player.currentHealth}/{player.maxHealth}</h4>
                    <div className="health-fill" style={{ width: `${healthPercent(player.currentHealth, player.maxHealth)}%` }} />
                </div>
                <div className="mana-bar" style={{ background: 'lightblue' }}>
                    <h4>Ваша мана: {player.currentMana}/{player.maxMana}</h4>
                    <div className="mana-fill" style={{ width: `${healthPercent(player.currentMana, player.maxMana)}%` }} />
                </div>
            </div>

            <div className="controls-container">
                {!isBattleActive ? (
                    <button onClick={startBattle}>Начать бой</button>
                ) : (
                    <button onClick={onClose}>Сдаться</button>
                )}
                {isBattleActive && currentMonsterIndex !== null && (
                    <button onClick={attackMonster}>Атаковать {currentMonsters[currentMonsterIndex]?.name}</button>
                )}
            </div>

            <h4>Лог боя:</h4>
            <ul ref={logRef} className="battle-log" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {battleLog.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
}

export default Battle;
