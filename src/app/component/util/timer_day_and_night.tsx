import React, { useEffect, useState } from 'react';

const DayNightTimer = () => {
  const [timeState, setTimeState] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch('/api/time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             target: 'time'
          }), 
        }); // Используем адрес API в Next.js
        if (!response.ok) {
          throw new Error('Ошибка при получении времени с сервера');
        }
        const { unixTime } = await response.json(); // Получаем время из ответа
        handleTime(unixTime);
      } catch (error) {
        console.error('Ошибка при получении времени:', error);
      }
    };

    const handleTime = (serverTime: number) => {
      const currentTime: any = new Date(serverTime * 1000); // Приводим время к миллисекундам
      const isEven = currentTime.getHours() % 2 === 0; // Проверяем четность часа
      setTimeState(isEven ? '🌕' : '🌙');

      // Рассчитываем оставшееся время до следующего изменения
      const nextChange: any = new Date(currentTime);
      nextChange.setHours(nextChange.getHours() + 1, 0, 0, 0); // Устанавливаем на следующий полный час
      const timeDiff = nextChange - currentTime; // Временной разница (мс)
      setRemainingTime(Math.floor(timeDiff / 1000)); // Оставшиеся секунды
    };

    fetchServerTime();

    // Таймер для обновления оставшегося времени каждую секунду
    const timer = setInterval(() => {
      setRemainingTime(prevRemainingTime => {
        if (prevRemainingTime <= 0) {
          fetchServerTime(); // Обновляем время, если таймер завершился
          return 0;
        }
        return prevRemainingTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Очищаем интервал при размонтировании
  }, []);

  const formatRemainingTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes} м ${seconds} с`;
  };

  return (
    <div className="flex items-center p-4 pr-4 bg-gray-800 text-white rounded shadow-md">
      <h2 className="text-xl font-bold">{timeState}</h2>
      <p>{formatRemainingTime()}</p>
    </div>
  );
};

export default DayNightTimer;
