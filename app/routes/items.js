var nedb = require("nedb"),
    databaseUrl = "db/items.db",
    path = process.execPath.replace("regtest.exe", databaseUrl);


var db = {
  items: new nedb({ filename: path, autoload: true })
};

//-----test route
exports.test = function(req, res) {
  res.send(path);
};

//-----get all items
exports.getItems = function (req, res) {
  db.items.find({}, function(err, result) {
    res.send(result);
  });
}

//-----get item
exports.getItem = function (req, res) {
  var id = req.params.id;
  db.items.findOne({_id: id}, function(err, result) {
    res.send(result);
  });
}

//-----insert new item
exports.insertItem = function (req, res) {
  var item = req.body;
  db.items.insert(item, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      // console.log('Success: ' + JSON.stringify(result));
      res.send(result);
    }
  });
}

//-----delete item
exports.deleteItem = function (req, res) {
  var id = req.params.id;
  db.items.remove({_id: id}, {}, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      // console.log('' + result + ' document(s) deleted');
      res.send(req.body);
    }
  });
}

//-----update item's state
exports.updateState = function (req, res) {
  var item = req.body,
      id = item._id,
      newState = req.query.direction == "down" ? item.state + 1 : item.state - 1;

  db.items.update({_id: id}, { $set: { state: newState } }, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      console.log(req.query.direction);
      // console.log('' + result + ' document(s) updated');
      res.send(req.body);
    }
  });
}

//-----update whole item with id
exports.updateItem = function (req, res) {
  var id = req.params.id,
      item = req.body;
  db.items.update({_id: id}, { $set: item }, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      // console.log('' + result + ' document(s) updated');
      res.send(req.item);
    }
  });
}