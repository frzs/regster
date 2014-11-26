//node-webkit gui
angular.module('regApp.services')
.factory('gui', function() {
  var gui = require('nw.gui');
  // return gui.Window.get();
  return {
  	window: gui.Window.get(),

  	clipboard: gui.Clipboard.get(),

  	getClipboard: function(){
  		return this.clipboard.get('text');
  	},

  	setClipboard: function(text){
  		this.clipboard.set(text, 'text');
  	},

  	clearClipboard: function(){
  		this.clipboard.clear();
  	}
  }
});