require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

//var auth = JSON.parse(fs.readFileSync("auth.json"));

const client = new Discord.Client();
var audioStream = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	  if (msg.content.substring(0, 1) == '=') {
	    var args = msg.content.substring(1).split(' ');
	    var cmd = args[0];
	   	
	   	//console.log(args);
	    
	    args = args.splice(1);

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
		        	var newChan = null;
		        	var newChanName = "";
		        	
		        	if(args[0][0] == "\""){
		        		var argCt = 0;
		        		while(argCt < args.length && args[argCt][args[argCt].length-1] != "\""){
		        			newChanName += args[argCt] + " ";
		        			argCt++;
		        		}
		        		newChanName += args[argCt];
		        		newChanName = newChanName.substring(1, newChanName.length - 1);
		        	}
		        	else{
		        		newChanName = args[0];
		        	}

		        	//console.log(newChanName);

		        	channels.forEach(function(item, index, array){
		        		if(item.type == 'voice' && item.name == newChanName){
		        			newChan = item;
		        		}
		        	});

		        	if(args[0] == null || newChan == null){
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