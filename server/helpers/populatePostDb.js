const { faker } = require('@faker-js/faker');
const axios = require('axios');

// This helper function populates our db with fake posts.
const populateDb = async () => {
  let res = [];
  axios.get('http://localhost:3000/user/all').then((res) =>
    res.map((user) => {
      axios.post('http://localhost:3000/post/new', {
        author_id: user,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(Math.floor(Math.random() * 6)),
      });
    }),
  );
  return res;
};

console.log(populateDb());
