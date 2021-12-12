# ShellChat

## What is ShellChat?

Shellchat is a prototype collaboration tool. It is meant to act similarly to a computer terminal shell, with users using 
text-based commands to interact with the service, as opposed to graphical artifacts like buttons. 
It includes some basic web service features.

* Signup
* Session-based login and logout
* Chat and channel joining 
* Adding friends, direct messaging
* Launching channel activities
* Cycling through command history with up-arrow

## Channel activities

Currently, one channel activity is implemented. It allows multiple users in a channel to collaborate and edit Javascript code together
in real time, and to run the code and view the result together. 

![alt text](https://github.com/MasonDarcy/ShellChat/blob/main/animated_module.gif "Code editor screenshot")

## Command list

Shellchat has the following list of commands.

Example: commandName argumentOne argumentTwo -option

* help: displays different help information.
	* commandName [optional]: outputs information about a specific command.
	* -a, --all: lists all commands.

* demo: runs a demo of the program. Can be run in guest-mode (not logged in).
	
* signup: signs the agent up with the system, logs them in.
	* agentName: name of the account to be. Required.
	* agentPassword: password of the account to be. Required.

* login: logs the agent into the system.
	* agentName: Name of your account. Required.
	* agentPassword: Password of your account. Required.

* logout: Logs you out of the service.

* join: Join a channel. Unsubscribes from the previous channel.
	*channelID: the name of the channel to join. Required. Case sensitive.

* load: Loads a channel module. Must be subscribed to a channel to use. Current module types that can be loaded are: CODE (case sensitive).
	* moduleType: type of the module to load.
	
* run: runs the code in the code editor. 

* close: Publically closes the currently loaded channel module.

* leave : Unsubscribes from the current channel.

* add: Sends a request to another agent to the be friends.
	* agentName: name of the friend to add.

* accept: Accepts a freind request from an agent.
	* agentName: name of the agent to accept as a friend.

* reject: Rejects a friend request from an agent.
	* agentName: name of the agent to reject.

* request: Lists your pending friend requests.

* m: Direct message a friend.
	* agentName: target friend.
	* message: the message to send.

* friends: Lists your friends and their current status (online, offline).
