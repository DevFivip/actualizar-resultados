const Humanoid = require("humanoid-js");

// Create a new humanoid instance
const humanoid = new Humanoid();

// Send Get request to the target website
humanoid
  .get("https://webservice.premierpluss.com/loteries/results")
  .then((res) => {
    console.log(res.body); // Print the result
  })
  // Catch errors if any
  .catch((err) => {
    console.log(err);
  });
