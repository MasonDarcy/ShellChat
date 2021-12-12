# ShellChat

## Live prototype

* Works in Chrome, Safari, Mozilla

http://shellchat.mdarcy.ca/

## What is ShellChat?

Shellchat is a prototype collaboration tool. It is meant to act similarly to a computer terminal shell, with users using 
text-based commands to interact with the service, as opposed to graphical artifacts like buttons. It includes some basic features.

* Signup
* Session-based login and logout
* Chat and channel joining 
* Adding friends, direct messaging
* Friend status updates (log-on and log-off events)
* Launching channel activities
* Cycling through command history with up-arrow
* Switch between chat and command mode with shift + down-arrow

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

---

## Implementation

ShellChat is implemented in Javascript. React front-end and Express.js running in Node, MongoDB, deployed on Heroku.
Many of ShellChat's features are implemented through server-sent-events, and the code-editing module is supported by 
the code-mirror library and YJS for synchronizing and resolving the collaborative editing. Compilation for JS is done with the 
jdoodle API.

## Notes

Shellchat started out as just a prototype to implement basic chat. I learned a lot and went through several growing pains building it,
and I feel a lot more comfortable now working with a collection of different web development technologies. Before beginning implementation,
I didn't have an effective software development process or design -- but I had done a great deal of preparation studying javascript, React, HTTP, 
git, CSS, react-redux, Mongo, built-in Web APIs, the DOM,  and node.js. I feel that I gained a lot of experience, especially with the dangers of "technical debt." 
I spent a large amount of time refactoring code, adhering to the open-close principle where possible, 
and abstracting and decoupling code with dependency injection. I'm pleased with several areas of the project, notably some code that automatically takes care of setting up 
event-listeners and server-sent-events. Instead of manually programming in details about new events as I wanted to add them, I created a basic data file that I could inject, which eventually saved me a lot of time.


There are a few issues present now, for example if the project were to
scale with multiple back-end servers, there would be an issue propagating events between them. For example, when a user initiates an event in the server with an HTTP request,
it emits the event to every other open server-sent-event HTTP connection. However, if there were multiple servers, that event would only propagate locally. Another issue was adopting a more formal approach to testing. Largely, the software process I ended up using was code-and-fix -- but I think moving forward, now that I'm 
more comfortable with a lot of the technologies, I can focus more on the overall design an architecture of the product. This project was primarily my first try at a web-app, and
was intended to showcase that I could bring together a collection of technologies into a functioning prototype.
