require('dotenv').config(); 
const Discord = require('discord.js');
const fs = require('fs');

var auth = JSON.parse(fs.readFileSync("auth.json"));

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  
	  if (msg.content.substring(0, 1) == '=') {
	    var args = msg.content.substring(1).split(' ');
	    var cmd = args[0];
	   
	    args = args.splice(1);
	    switch(cmd) {
	        case 'ping':
	            msg.reply("pong");
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
		        	
		        	channels.forEach(function(item, index, array){
		        		if(item.type == 'voice' && item.name == args[0]){
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
	    }
  }
});

client.login(process.env.BOT_TOKEN);