var nedb = require("nedb"),
    databaseUrl = "db/archive.db",
    path = process.execPath.replace("regtest.exe", databaseUrl);


var db = {
  archive: new nedb({ filename: path, autoload: true })
};

//-----get all archive
exports.getAll = function (req, res) {
  db.archive.find({}, function(err, result) {
    res.send(result);
  });
}

//-----get item
exports.getItem = function (req, res) {
  var id = req.params.id;
  db.archive.findOne({_id: id}, function(err, result) {
    res.send(result);
  });
}

//-----insert new item
exports.insertItem = function (req, res) {
  var item = req.body;
  db.archive.insert(item, function (err, result) {
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
  db.archive.remove({_id: id}, {}, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      // console.log('' + result + ' document(s) deleted');
      res.send(req.body);
    }
  });
}

//-----update whole item with id
exports.updateItem = function (req, res) {
  var id = req.params.id,
      item = req.body;
  db.archive.update({_id: id}, { $set: item }, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      // console.log('' + result + ' document(s) updated');
      res.send(req.item);
    }
  });
}