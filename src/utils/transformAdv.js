module.exports.transformAdv = ({ userId, _id, id, updatedAt, ...rest }) => ({
  id,
  ...rest,
});
