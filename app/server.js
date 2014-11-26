var express = require("express"),
    path = require("path"),
    itemsApi = require("./routes/items"),
    archiveApi = require("./routes/archive"),
    agentsApi = require("./routes/agents");

var app = module.exports = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});


//test route
app.get('/api', itemsApi.test);

//item routes
app.get('/items', itemsApi.getItems);
app.get('/items/:id', itemsApi.getItem);
app.post('/items', itemsApi.insertItem);
app.delete('/items/:id', itemsApi.deleteItem);
app.put('/items', itemsApi.updateState);
app.put('/items/:id', itemsApi.updateItem);

//archive routes
app.get('/archive', archiveApi.getAll);
app.get('/archive/:id', archiveApi.getItem);
app.post('/archive', archiveApi.insertItem);
app.delete('/archive/:id', archiveApi.deleteItem);
app.put('/archive/:id', archiveApi.updateItem);

//agents routes
app.get('/agents', agentsApi.getAll);
app.get('/agents/:id', agentsApi.getItem);
app.post('/agents', agentsApi.insertItem);
app.delete('/agents/:id', agentsApi.deleteItem);
app.put('/agents/:id', agentsApi.updateItem);


//server start
app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));