module.exports = {
  data: (data) => ({ data, status: "ok" }),
  error: (error) => ({ error, status: "error" }),
};
