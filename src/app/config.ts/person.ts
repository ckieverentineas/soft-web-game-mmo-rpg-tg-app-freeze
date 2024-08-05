export interface Hero {
    name: string;
    translit: string;
    health: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    stars: number;
    skills: string;
    passives: string;
    image: string;
}

export const heroes: Hero[] = [
    {
        name: "Воин",
        translit: "warrior",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "тяжелый удар мечом - 150% урона, 3 маны",
        passives: "хп +20%",
        image: "/art/class/warrior/warrior.jpg"
    },
    {
        name: "Чародей",
        translit: "the_magician",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "магический выстрел (рандомный): Земляной шар - 100% урона, 50% щита себе; Огненный шар - 150% урона; Воздушный таран - 100% урона, 50% шанс сбить с ног (запрет автоатаки); Водяная капля - 100% урона, 50% лечение себя",
        passives: "мана +20%",
        image: "/art/class/the_magician.jpg"
    },
    {
        name: "Лучник",
        translit: "archer",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "зачарованная стрела (не тратит действие) - на 1 ход стрелы наносят на 50% больше урона - 5 маны",
        passives: "с шансом 20% выпускает дополнительную стрелу в конце хода",
        image: "/art/class/archer.jpg"
    },
    {
        name: "Маг жизни",
        translit: "the_magician_of_life",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "касание восстановления - лечит 150% от урона союзному существу - 4 маны",
        passives: "мощность лечения увеличивается на 40%",
        image: "/art/class/the_magician_of_life.jpg"
    },
    {
        name: "Охотник",
        translit: "hunter",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "ярость (тратит действие волка) - волк впадает в ярость и наносит 150% урона - 3 маны",
        passives: "в боях вас сопровождает волк, ваши характеристики уменьшены на 30%, характеристики волка равны 50% от ваших изначальных (округляется всегда в меньшую сторону)",
        image: "/art/class/hunter.jpg"
    },
    {
        name: "Кузнец",
        translit: "blacksmith",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "заточка - увеличивает урон оружия на 10% на весь бой - 4 маны",
        passives: "увеличивает шанс получения материалов для ремесла на 20%",
        image: "/art/class/blacksmith.jpg"
    },
    {
        name: "Травник",
        translit: "herbalist",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 1,
        skills: "после применения зелья, с шансом 50% можно применить второе (5 маны при применении второго зелья)",
        passives: "увеличивает шанс получения ингредиентов для зелий на 20%",
        image: "/art/class/herbalist.jpg"
    },
    {
        name: "Шаман синей луны",
        translit: "the_shaman_of_the_blue_moon",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 4,
        skills: "призыв духа волка - наносит 200% урона (1 очко духа)",
        passives: "очки интеллекта становятся свободными характеристиками (шкала маны становится духовной энергией), выносливость ночью увеличена на 30%, 3 энергии максимум. Покурить трубку - вы получаете 1 очко энергии (с шансом 10% не тратит действие)",
        image: "/art/class/the_shaman_of_the_blue_moon/the_shaman_of_the_blue_moon.jpg"
    },
    {
        name: "Дитя удачи",
        translit: "the_child_of_luck",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 6,
        skills: "случайный навык любого класса 1-5⭐ (меняется каждый бой); (Лвл 5 - блокировка навыка); (Лвл 10 - дополнительный случайный навык)",
        passives: "все положительные небоевые вероятности повышены на 50%; (Лвл 5 - отрицательные понижены на 50%); (Лвл 10 - боевые повышены на 50%)",
        image: "/art/class/the_child_of_luck.jpg"
    },
    {
        name: "Монах",
        translit: "monk",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 2,
        skills: "стойка защиты - наносимый урон -50%, получаемый урон -50% (не тратит действие)",
        passives: "урон по монстрам увеличен на 50% (животные, люди и человекоподобные монстры не входят в категорию)",
        image: "/art/class/monk.jpg"
    },
    {
        name: "Инженер",
        translit: "engineer",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 3,
        skills: "турель - размещает на поле боя турель на 2 хода с 100% силы и здоровья (6 маны)",
        passives: "в конце хода чинит союзные механизмы на 50% от силы",
        image: "/art/class/engineer/engineer.jpg"
    },
    {
        name: "Повелитель теней",
        translit: "the_lord_of_shadows",
        health: 5,
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        stars: 5,
        skills: "удар тени - вы наносите 200%/300% урона (1 обычная/элитная тень)",
        passives: "очки интеллекта становятся свободными характеристиками (шкала маны становится количеством теней); За каждое убитое существо вы получаете тень (обычную/элитную); Теневая защита - с шансом 12,5% ваша тень закрывает вас от вражеской атаки и вы не получаете урон (1 обычная тень)",
        image: "/art/class/the_lord_of_shadows.jpg"
    }
];
