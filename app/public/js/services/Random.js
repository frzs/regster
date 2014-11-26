angular.module('regApp.services')
.factory('Random', function(){
    return {
        randomDate: function(){
            var start = new Date(1970, 0, 1);
                end = new Date(1995, 0, 1);
                randDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
                day = randDate.getDate(),
                dayPre = day < 10 ? '0':'',
                month = randDate.getMonth()+1,
                monthPre = month < 10 ? '0':'',
                year = randDate.getFullYear(),
                fullDate = dayPre + day + "." + monthPre + month + "." + year;

            return fullDate;
        },
        randomPhone: function(){

            var low = 111111,
                high = 999999,
                possiblePrefix = new Array('514','551','555','557','558','568','570','571','574',
                                              '577','591','592','593','595','596','597','598','599'),
                randomPrefix = possiblePrefix[Math.floor(Math.random() * possiblePrefix.length)],
                randomPhone = Math.floor(Math.random() * (high - low) + low);
            
            return randomPrefix + randomPhone;
        }
    }               
});
