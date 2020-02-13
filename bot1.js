require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

var prefix = '=';

//var auth = JSON.parse(fs.readFileSync("auth.json"));

const client = new Discord.Client();
var audioStream = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	  if (msg.content.substring(0, 1) == prefix) {
	    var spaceInd = msg.content.indexOf(" ");
	    var cmd;
	    if(spaceInd != -1){
	    	cmd = msg.content.substring(1, msg.content.indexOf(' '));
	    }
	    else{
	    	cmd = msg.content.substring(1);
	    	spaceInd = msg.content.length - 1;
	    }

	    var argStr = msg.content.substring(spaceInd);
	    var args = [];

	    switch(cmd) {
	        case 'ping':
	            msg.reply("pong");
	            break;
	        case 'shift':
	        	if(msg.member.roles.find(val => val.name == "Thanos") != null){
		        	if(msg.member.voiceChannel == null){
		        		msg.reply("You are not in a valid voice channel!")
			        		.then(msg =>{
			        				msg.delete(5000);
			        			});
		        		break;
		        	}
		        	var channels = client.channels.array();

		        	var splitQuotes = argStr.substring(1).split('\"');
		        	
		        	//console.log(splitQuotes);

		        	if(splitQuotes[splitQuotes.length - 1] == " "){
		        		splitQuotes = splitQuotes.slice(1, -1);
		        	}
		        	else{
		        		splitQuotes = splitQuotes.slice(1, splitQuotes.length);
		        	}

		        	args.push(splitQuotes[0]);
		        	splitQuotes.splice(0, 1);

		        	if(splitQuotes[0] != null)
		        		args.push(splitQuotes[0].split(' '));

		        	var newChan = null;
		        	var newChanName = args[0];

		        	channels.forEach(function(item, index, array){
		        		if(item.type == 'voice' && item.name == newChanName){
		        			newChan = item;
		        		}
		        	});

		        	if(newChan == null){
		        		msg.reply("Please enter a valid voice channel you would like to move to.")
			        		.then(msg =>{
			        				msg.delete(5000);
			        			});
		        		break;
		        	}

		        	if(newChan.userLimit != 0 && msg.member.voiceChannel.members.array().length > newChan.userLimit){
		        		msg.reply("Shift channel capacity too low!")
		        			.then(msg =>{
		        				msg.delete(5000);
		        			});
		        		break;
		        	}

		        	msg.member.voiceChannel.members.array().forEach(function(item, index, array){
		        		if(item.permissionsIn(newChan).has("CONNECT"))
		        			item.setVoiceChannel(newChan);
		        	});
		        	
		        	break;
		        }
		        else{
				  	msg.reply("You do not have permission to use this command.")
						.then(msg =>{
							msg.delete(5000);
						})
				}
				
				break;
			case 'play':
				/*if(msg.member.voiceChannel.speakable){
					msg.member.voiceChannel.join().then(connection => {
						const audioStream = connection.playStream(ytdl(args[0]))
							.on('end', () => {
								msg.member.voiceChannel.leave();
							})
							.on('error', () => {
								console.error(error);
							});
						audioStream.setVolumeLogarithmic(0.5);
					});

				}
				break;
			case 'pause':
				if(audioStream != null){
					while(!audioStream.paused)
						audioStream.pause();
				}*/
				break;

	    }
  }
});

client.login(process.env.BOT_TOKEN);