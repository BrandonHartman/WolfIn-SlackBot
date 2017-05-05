var Bot = require('slackbots');

//settings
var settings = {

     token: '<Put API token HERE>',
     name: 'funbot'
};

var channel='leads' ;

var bot = new Bot(settings);

bot.on('start', function(){
               
               bot.postMessageToChannel(channel, 'Hello Channel. I am successfuly connected');

              }
     );


bot.on('message',  function(message){
                 
            if(message.type === 'message' && Boolean(message.text))
            {
            	console.log(message.channel);
            	if(typeof message.channel === 'string'  && message.channel[0] === 'C')
            	{
            		console.log(message.text.toLowerCase());
            		if(message.text.toLowerCase().indexOf('@u3zpp1aav') > -1 )
            		{
            			bot.postMessageToChannel(channel, "Hey there ! welcome to bot world");
            		}
            	}
            }
               

     });     
