const { faker } = require('@faker-js/faker');
const axios = require('axios');

// This helper function populates our db with fake posts.
const populatePostDb = async () => {
const populateDb = async () => {

  const data = await axios.get('http://localhost:3000/user/all');
  const users = await data.data;
  let arr = [];

  users.map((user) =>
    arr.push({
      author_id: user,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(5),
    }),
  );

  arr.map((post) =>
    axios
      .post('http://localhost:3000/post/new', post)
      .then((res) => console.log(res)),
  );
};
