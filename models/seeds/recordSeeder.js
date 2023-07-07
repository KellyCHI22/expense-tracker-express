const db = require('../../config/mongoose');
const bcrypt = require('bcryptjs');

const User = require('../user');
const Record = require('../record');
const Category = require('../category');
const SEED_RECORD = [
  {
    id: 1,
    name: '租金',
    date: new Date('6/1/2023'),
    amount: 25000,
    category: '家居物業',
  },
  {
    id: 2,
    name: '電影：驚奇隊長',
    date: new Date('6/3/2023'),
    amount: 250,
    category: '休閒娛樂',
  },
  {
    id: 3,
    name: '捷運',
    date: new Date('6/15/2023'),
    amount: 120,
    category: '交通出行',
  },
  {
    id: 4,
    name: '晚餐',
    date: new Date('6/15/2023'),
    amount: 60,
    category: '餐飲食品',
  },
  {
    id: 5,
    name: '午餐',
    date: new Date('6/20/2023'),
    amount: 60,
    category: '餐飲食品',
  },
];

const SEED_USER = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    records: [1, 3, 4, 5],
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
    records: [2],
  },
];

db.once('open', async () => {
  try {
    await Promise.all(
      Array.from({ length: SEED_USER.length }, (_, i) => {
        const { name, email, password } = SEED_USER[i];
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => User.create({ name, email, password: hash }));
      })
    );
    await Promise.all(
      Array.from({ length: SEED_RECORD.length }, async (_, i) => {
        const category = await Category.findOne({
          name: SEED_RECORD[i].category,
        }).lean();
        const user = SEED_USER.find((user) =>
          user.records.includes(SEED_RECORD[i].id)
        );
        const userData = await User.findOne({ name: user?.name }).lean();
        await Record.create({
          name: SEED_RECORD[i].name,
          date: SEED_RECORD[i].date,
          amount: SEED_RECORD[i].amount,
          userId: userData._id,
          categoryId: category._id,
        });
      })
    );
    console.log('Seed record data created!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
