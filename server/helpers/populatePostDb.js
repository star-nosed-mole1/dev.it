const { faker } = require('@faker-js/faker');
const axios = require('axios');

const populateDb = async () => {
  // axios.get('http://localhost:3000/user/all').then((res) => {
  //   // console.log(res);
  //   res.map((data) =>
  //     axios.post('http://localhost:3000/post/', {
  //       author_id: data._id,
  //       title: faker.hacker.noun(),
  //       content: faker.lorem.paragraph(),
  //     }),
  //   );
  // });
  let res = [];
  const user_ids = await axios.get('http://localhost:3000/user/all');
  user_ids.forEach((user) => res.push(user.id));
  res.map(
    async (id) =>
      await axios.post('http://localhost:3000/post/', {
        author_id: id,
        title: faker.hacker.noun(),
        content: faker.lorem.paragraph(),
      }),
  );
};

populateDb();
