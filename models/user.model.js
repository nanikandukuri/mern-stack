let query = "";
const createUser = (connection, data, callback) => {
  query = "INSERT INTO users SET ?";
  connection.query(query, [data], callback);
};

const fetchUser = (connection, email, callback) => {
  query = "SELECT *,'' as password FROM users WHERE email=?";
  connection.query(query, [email], callback);
};
const updateUser = (connection, data, email, callback) => {
  query = "UPDATE users SET ? WHERE email=?";
  connection.query(query, [data, email], callback);
};
const deleteUserAccount = (connection, email, callback) => {
  query = "DELETE FROM users WHERE email=?";
  connection.query(query, [email], callback);
};
const verifyUserAccount = (connection, refreshtoken, callback) => {
  query = "SELECT * FROM users WHERE refreshtoken=? and expiretoken>?";
  connection.query(query, [refreshtoken, Date.now()], callback);
};
const signinUserAccount = (connection, email, callback) => {
  query = "SELECT * FROM users WHERE email=? and verified=1 and activestatus=1";
  connection.query(query, [email], callback);
};

module.exports = {
  createUser,
  fetchUser,
  updateUser,
  deleteUserAccount,
  verifyUserAccount,
  signinUserAccount,

};
