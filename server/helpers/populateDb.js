const { faker } = require('@faker-js/faker');
const axios = require('axios');

// This helper function populates our db with fake users from fakerjs.
const populateDb = () => {
  let res = [];

  for (let i = 0; i < 20; i += 1) {
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
    };
    res.push(data);
  }

  res.map(async (data) => {
    await axios.post('http://localhost:3000/user/register', {
      username: data.username,
      password: data.password,
      avatar: data.avatar,
    });
  });
};
