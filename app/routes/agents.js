var nedb = require("nedb"),
    databaseUrl = "db/agents.db",
    // gui = global.window.nwDispatcher.requireNwGui(),
    // path = require('path');
    // gui = require('nw.gui'),
    path = process.execPath.replace("regtest.exe", databaseUrl);

var db = {
  // agents: new nedb({ filename: path.join(gui.App.dataPath, 'agents.db'), autoload: true })
  agents: new nedb({ filename: path, autoload: false })
};

//-----get all agents
exports.getAll = function (req, res) {
  db.agents.find({}, function(err, result) {
    res.send(result);
  });
}

//-----get item
exports.getItem = function (req, res) {
  var id = req.params.id;
  db.agents.findOne({_id: id}, function(err, result) {
    res.send(result);
  });
}

//-----insert new item
exports.insertItem = function (req, res) {
  var item = req.body;
  db.agents.insert(item, function (err, result) {
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
  db.agents.remove({_id: id}, {}, function (err, result) {
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
  db.agents.update({_id: id}, { $set: item }, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      // console.log('' + result + ' document(s) updated');
      res.send(req.item);
    }
  });
}