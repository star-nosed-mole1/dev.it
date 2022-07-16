const { faker } = require('@faker-js/faker');
const axios = require('axios');

const populateCommentDb = async () => {
  const users = await axios
    .get('http://localhost:3000/user/all')
    .then((res) => {
      return res.data;
    });

  const posts = await axios
    .get('http://localhost:3000/post/all')
    .then((res) => {
      return res.data;
    });

  for (let i = 0; i < users.length; i += 1) {
    const comment = await axios.post('http://localhost:3000/comment/new', {
      author_id: users[i],
      post_id: posts[i]._id,
      content: faker.lorem.sentence(),
    });
    console.log(comment.data);
  }
};
