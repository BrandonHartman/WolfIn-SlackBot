var Bot = require('slackbots');

// Settings
var settings = {

     token: 'oxb-179102533538-14z5DTAaWiHyDnqY9mivOajP',
     name: 'WolfIn'
};

var channel='leads' ;

var bot = new Bot(settings);

bot.on('start', function(){
               
               bot.postMessageToChannel(channel, 'Hello Channel. I am connected to the channel!');

              }
     );


bot.on('message',  function(message){
                 
            if(message.type === 'message' && Boolean(message.text))
            {
            	console.log(message.channel);
            	if(typeof message.channel === 'string'  && message.channel[0] === 'C')
            	{
            		console.log(message.text.toLowerCase());
            		if(message.text.toLowerCase().indexOf('@u5930fpfu') > -1 )
            		{
            			bot.postMessageToChannel(channel, "Hey there! Welcome to the slack channel!");
            		}
            	}
            }
               

     });     
