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

const category_icon = {
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid',
};

db.once('open', async () => {
  try {
    await Promise.all(
      Array.from({ length: SEED_CATEGORY.length }, (_, i) =>
        Category.create(SEED_CATEGORY[i])
      )
    );
    console.log('Seed category data created!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
