var Bot = require('slackbots');

// Settings
var settings = {

     token: 'oxb-179102533538-14z5DTAaWiHyDnqY9mivOajP',
     name: 'WolfIn'
};

var channel='leads' ;

var bot = new Bot(settings);

bot.on('start', function(){
               
               bot.postMessageToChannel(channel, 'Greetings! I am successfuly connected to the channel.');

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
            			var command = message.text.toLowerCase();
            			var commandType = getCommandType(command);
            			switch(commandType)
            			{
            				case 'drawchart':
            								   console.log('attempting to get chart answer');
                                               var answer = getChartAnswer(command);
                                               bot.postMessageToChannel(channel, answer);
            				                   break;
            				default:
                                     bot.postMessageToChannel(channel, "Hey there! Welcome to the Slack Channel.");
                                     break;

            			}
            			
            		}
            		
            	}
            }
               

     });
function getCommandType(command)    
 {
    if(command.indexOf('draw chart') > - 1)  
    	return "drawchart";


 }


 function getChartAnswer(command)
 {
      //command : '@WolfIn draw chart type:pi data:{60,40,20} legends:{USA,UK,Russia}';
      var answer = "";
      var data = command.split(/ /i);
      var chartType = data[3].split(/:/i)[1];
      switch(chartType)
      {
          case 'pi':
                    chartType = 'p3';
                    break; 
          case 'line':
                    chartType = 'lc';
                    break; 
          case 'bar':
                    chartType = 'bvg';
                    break; 

      }
      console.log('chartType is ' + chartType);
      var chartData = data[4].split(/:/i)[1].replace('{','').replace('}','');
      console.log('chartData is ' + chartData);
      var legends = data[5].split(/:/i)[1].replace('{','').replace('}','').replace(/,/gi,'|');
	  console.log('legends is ' + legends);
      var urlFormat = 'https://chart.googleapis.com/chart?cht={0}&chs=250x100&chd=t:{1}&chl={2}';

      answer = urlFormat.replace('{0}',chartType).replace('{1}', chartData).replace('{2}', legends);
      console.log('answer is ' + answer);
      //Chart URL: https://chart.googleapis.com/chart?cht=p3&chs=250x100&chd=t:60,40,20&chl=USA|UK|Russia    

      return answer;

 }
