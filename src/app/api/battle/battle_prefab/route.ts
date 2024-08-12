// pages/api/battle.js

import prisma from '../../lib/prisma'; // импортируйте ваш prisma клиент

export default async function handler(req, res) {
    const { context } = req.body; // Получаем контекст из запроса

    // Стадия подготовки данных к битве
    const user = await prisma.user.findFirst({ where: { idvk: context.peerId }, include: { classify: true } });
    const region = await prisma.region.findFirst({ where: { uid: user.id_region }, include: { location: true } });
    const effect_list = [];
    
    // Стадия инициализации мобов и игрока
    const mob_sel = await prisma.mob.findMany({ where: { id_location: region.location.id }, include: { classify: true } });
    const creature = { mob: [], boss: [] };

    mob_sel.forEach(mob => {
        if (mob.classify.name === 'моб') {
            creature.mob.push({ classify: mob.classify.name, team: 'enemy', xp: mob.xp, name: mob.name, atk: mob.atk, health: mob.health, health_max: mob.health_max, mana: mob.mana, skill: mob.skill });
        }
        if (mob.classify.name === 'босс') {
            creature.boss.push({ classify: mob.classify.name, team: 'enemy', xp: mob.xp, name: mob.name, atk: mob.atk, health: mob.health, health_max: mob.health_max, mana: mob.mana, skill: mob.skill });
        }
    });

    const queue_battle_init = [];
    queue_battle_init.push({ classify: user.classify.name, team: 'friend', xp: user.xp, name: user.name, atk: user.atk, health: user.health, health_max: user.health_max, mana: user.mana, skill: user.skill });

    const enemy_will = (region.mob_min === region.mob_max) ? region.mob_min : Math.floor(Math.random() * (region.mob_max - region.mob_min + 1)) + region.mob_min;
    for (let i = 0; i < enemy_will; i++) {
        queue_battle_init.push(creature.mob[Math.floor(Math.random() * creature.mob.length)]);
    }
    
    for (let i = 0; i < region.boss; i++) {
        if (creature.boss.length > 0) {
            queue_battle_init.push(creature.boss[Math.floor(Math.random() * creature.boss.length)]);
        }
    }
    
    const queue_battle = [];
    const limit = queue_battle_init.length;
    for (let j = 0; j < limit; j++) {
        const selector = Math.floor(Math.random() * queue_battle_init.length);
        
        queue_battle.push(queue_battle_init[selector]);
        queue_battle_init.splice(selector, 1);
    }

    // Сохраняем информацию о битве в базе данных
    await prisma.battle.upsert({
        create: {
            id_user: user.id,
            queue_battle: JSON.stringify(queue_battle),
            effect_list: JSON.stringify(effect_list),
            queue_dead: JSON.stringify([]),
            turn: 0,
            target: 0
        },
        update: {
            queue_battle: JSON.stringify(queue_battle),
            effect_list: JSON.stringify(effect_list),
            queue_dead: JSON.stringify([]),
            turn: 0,
            target: 0
        },
        where: { id_user: user.id }
    });

    // Отправляем результат битвы в ответе
    res.status(200).json({ success: true, battle_info: queue_battle });
}
