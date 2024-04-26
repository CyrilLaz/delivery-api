module.exports.createDirectory = (path) => {
    require("fs").mkdirSync(path, { recursive: true });
};
