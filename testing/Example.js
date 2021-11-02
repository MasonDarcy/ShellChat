// function ReactComponentName() {

//   const [userFormData, setFormData] = useState({ contents: "" });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     //customReactHook contains the useDispatch hook and dispatches actions based on the userFormData
//     customReactHook(userFormData);
//   };

//   return (
//     //Form JSX
//     //onSubmit
//   );
// }

// export default ChatInput;

//My old way to subscribe based on one component, but i've moved it into state now.
//Subscribe to incoming chat messages on a given channel identifier
// useEffect(() => {
//   if (channelID) {
//     sendChat("User has left the channel.", oldChannelID);

//     const source = new EventSource(
//       `http://localhost:5000/api/chat/${channelID}`
//     );

//     source.onmessage = function logEvents(event) {
//       setMessageList((oldState) => [...oldState, JSON.parse(event.data)]);
//     };

//     return () => source.close();
//   }
// }, [channelID]);

// const chatMessages = messageList.map((msg) => (
//   <ChatMessage key={v4()} message={msg} />
// ));

/*
            The following code is used to run a simple version with no command logic, for debugging, inside the chat input component.
            // if (cid) {
            //   sendChat(contents, 1);
            // } else {
            //   dispatch(subscribeAction(1));
            // }
            */
