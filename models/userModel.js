let users = [];

const createUser = (email, password) => {
  const newUser = {
    id: users.length + 1,
    email,
    password,
  };
  users.push(newUser);
  return newUser;
};

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export { createUser, findUserByEmail };
