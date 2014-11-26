angular.module('regApp.services')
.factory('HardcodedService', function($resource) {
  return {
    types: [
      { "name": "Priglashenie", "rate": 3 },
      { "name": "Zaevlenie", "rate": 5 },
      { "name": "Passport", "rate": 5 }
    ],
    agents: [
      { "name": "The Jew", "rate": 0.5 },
      { "name": "Others", "rate": 0 }
    ],
    getAgentRate: function(name){
      var agents = this.agents,
          ratesArray = [];

      agents.forEach(function(entry) {
        if(entry.name == name){
          ratesArray = entry.rate;
        }
      });

      return ratesArray;
    },
    getTypeRate: function(name){
      var types = this.types,
          ratesArray = [];

      types.forEach(function(entry) {
        if(entry.name == name){
          ratesArray = entry.rate;
        }
      });

      return ratesArray;
    }
  }
});