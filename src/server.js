const app = require("./app");
const port = process.env.PORT || 4000;

app.listen(port, function(req, res){
  console.log("Express server is running on the port %d on %s mode", this.address().port, app.settings.env)
})