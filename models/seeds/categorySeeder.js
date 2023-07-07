const db = require('../../config/mongoose');
const Category = require('../category');
const SEED_CATEGORY = [
  {
    name: '家居物業',
  },
  {
    name: '交通出行',
  },
  {
    name: '休閒娛樂',
  },
  {
    name: '餐飲食品',
  },
  {
    name: '其他',
  },
];

const CATEGORY_ICON = {
  家居物業: 'fa-solid fa-house',
  交通出行: 'fa-solid fa-van-shuttle',
  休閒娛樂: 'fa-solid fa-face-grin-beam',
  餐飲食品: 'fa-solid fa-utensils',
  其他: 'fa-solid fa-pen',
};

db.once('open', async () => {
  try {
    await Promise.all(
      Array.from({ length: SEED_CATEGORY.length }, (_, i) =>
        Category.create({
          name: SEED_CATEGORY[i].name,
          icon: CATEGORY_ICON[SEED_CATEGORY[i].name],
        })
      )
    );
    console.log('Seed category data created!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
