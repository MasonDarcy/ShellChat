# ShellChat

## Live prototype

http://shellchat.mdarcy.ca/

## What is ShellChat?

Shellchat is a prototype collaboration tool. It is meant to act similarly to a computer terminal shell, with users using 
text-based commands to interact with the service, as opposed to graphical artifacts like buttons. 
It includes some basic web service features.

* Signup
* Session-based login and logout
* Chat and channel joining 
* Adding friends, direct messaging
* Friend status updates (log-on and log-off events)
* Launching channel activities
* Cycling through command history with up-arrow

## Channel activities

Currently, one channel activity is implemented. It allows multiple users in a channel to collaborate and edit Javascript code together
in real time, and to run the code and view the result together. 

![alt text](https://github.com/MasonDarcy/ShellChat/blob/main/animated_module.gif "Code editor screenshot")

## Command list

Shellchat has the following list of commands.

 __help__ : displays different help information.
* args
	* commandName [optional]: outputs information about a specific command.
* options
	* -a, --all: lists all commands.
	
---

__demo__: runs a demo of the program. Can be run in guest-mode (not logged in).
	
---

__signup__: signs the agent up with the system, logs them in.
* args
	* agentName: name of the account to be. Required.
	* agentPassword: password of the account to be. Required.

---

__login__: logs the agent into the system.
* args
	* agentName: Name of your account. Required.
	* agentPassword: Password of your account. Required.

---

__logout__: logs you out of the service.

---

__join__: join a channel. Unsubscribes from the previous channel.
* args
	*channelID: the name of the channel to join. Required. Case sensitive.

---

__load__: loads a channel module. Must be subscribed to a channel to use. Current module types that can be loaded are: CODE (case sensitive).
* args	
	* moduleType: type of the module to load.

---

__run__: runs the code in the code editor. 

---

__close__: publically closes the currently loaded channel module.

---

__leave__: unsubscribes from the current channel.

---

__add__: sends a request to another agent to be friends.
* args
	* agentName: name of the friend to add.

---

__accept__: accepts a freind request from an agent.
* args	
	* agentName: name of the agent to accept as a friend.

---

__reject__: rejects a friend request from an agent.
* args
	* agentName: name of the agent to reject.

---

__requests__: lists your pending friend requests.

---

__m__: direct message a friend.
* args
	* agentName: target friend.
	* message: the message to send.

---

__friends__: lists your friends and their current status (online, offline).

