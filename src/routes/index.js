module.exports = (app) => {
  require("./auth")(app);
  require("./../middlewares/auth")(app); 
  require("./user")(app);  


}