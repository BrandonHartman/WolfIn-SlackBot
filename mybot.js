var Bot = require('slackbots');
var request = require('request');

//settings
var settings = {

     token: 'xoxb-179102533538-14z5DTAaWiHyDnqY9mivOajP',
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
            								   console.log('attempting to get chart answer...');
                                               var answer = getChartAnswer(command);
                                               bot.postMessageToChannel(channel, answer);
            				                   break;
            				case 'showgitstats':
            									console.log('attempting to show Github stats...');
                                              getGitStatsAnswer(command);
                                               // var answer = getGitsStatsAnswer(command);
                                               // bot.postMessageToChannel(channel, answer);
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
    if(command.indexOf('show github top contributor stats') > - 1)  
    	return "showgitstats";


 }


 function getChartAnswer(command)
 {
      // command : '@wolfin draw chart type:pi data:{60,40,20} legends:{USA,UK,Russia}';
      // command : '@wolfin draw chart type:line data:{60,40,20} legends:{USA,UK,Russia}';
      // command : '@wolfin draw chart type:bar data:{60,40,20} legends:{USA,UK,Russia}';

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
 var options = {

        url: https: 'api.github.com/users/BrandonHartman/repos',
        headers: {
              'User-Agent':'request'
        }
 };

 function getGitStatsAnswer(command)
 {
      //command : '@wolfin show github top contributor stats repo:facebook/stats';

      var answer = "";
      var data = command.split(/ /i);
      console.log("data is " + data);
      var repo = data[6].split(/:/i)[1];
      console.log("repo is " + repo);
      console.log("inside git answer");
      console.log("url before " + options.url );
      var localUrl = options.url.replace('{0}', repo);
      console.log("url after " + localUrl );

      options = {
        url: localUrl,
        headers: {
          'User-Agent':'request'
                 }
      
        };  
      request(options, function(error, response, body)
                    {
                       console.log(response) // Show the HTML for the Google homepage. 
                var profile = JSON.parse(response.body);
                // var profile = response;
                console.log("profile2 " + profile);
                var cntr=0;
                for (var myKey in profile)
                { 
                  console.log(profile[myKey].avatar_url, profile[myKey].contributions,profile[myKey].login); 
                    var st = 'Name-{0} Contributions-{1}  image- {2}';
                    st = st.replace('{0}', profile[myKey].login).replace('{1}',profile[myKey].contributions).replace('{2}',profile[myKey].avatar_url) ;    
                  console.log(st);
                  bot.postMessageToChannel(channel, st);
                  cntr++;
                  if(cntr >= 5)
                  {
                    break;
                  }
                }

                    }

            );



     
      

 }
