let express = require('express');
let app = express();

let db = [];

app.get('/', function(req, res) {
  res.send('Hello World');
})

var server = app.listen(8080, function () {
  console.log("Server started!");
})

app.get('/create/', function(req, res) {
  res.status(200);
  res.send(db);
})

app.put('/create/', function(req, res) {
  if (inDB(req.query.item)) {
    res.status(400);
    res.send("Item already exists in db!");
  } else {
    db.push(req.query.item);
    res.status(200);
    res.send(req.query.item);
  }
})

app.delete('/create/', function(req, res) {
  let removeSuccess = removeFromDB(req.query.item);
  if(removeSuccess) {
    res.status(200);
    res.send("Remove success!");
  } else {
    res.status(400);
    res.send("Remove failed");
  }
})


app.patch('/create/', function(req, res) {
  if (removeFromDB(req.query.old)) {
      db.push(req.query.new);
      res.status(200);
      res.send("Update Success");
  } else {
      res.status(400);
      res.send("Object does not exist in db!");
  }
})


function removeFromDB(item) {
  let index = db.indexOf(item);

  if (index >= 0) {
    db.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function inDB(item) {
  let index = db.indexOf(item);
  return index >= 0;
}
