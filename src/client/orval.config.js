module.exports = {
  shopping: {
    output: {
      mode: "tags-split",
      target: "src/API",
      //schemas: "src",
      client: "react-query",
      mock: true,
      prettier: true,
    },
    input: {
      target: "./swagger.json",
    },
  },
};
