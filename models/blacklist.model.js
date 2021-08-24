let query = "";
const addBlackList = (connection, data, callback) => {
  query = "INSERT INTO blacklist SET ?";
  connection.query(query, [data], callback);
};

const updateBlackList = (connection, token, email, callback) => {
  query = "UPDATE blacklist SET ? WHERE email=?";
  connection.query(query, [token, email], callback);
};

const fetchBlackList = (connection, email, callback) => {
  query = "SELECT * FROM blacklist WHERE email=?";
  connection.query(query, [email], callback);
};
const fetchBlackListAccount = (connection, email, token, callback) => {
  query = "SELECT * FROM blacklist WHERE email=? and token=?";
  connection.query(query, [email, token], callback);
};

module.exports = {
  addBlackList,
  fetchBlackList,
  updateBlackList,
  fetchBlackListAccount,
};
