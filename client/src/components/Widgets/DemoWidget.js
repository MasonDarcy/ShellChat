import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { writeWord, writeCode, sleep } from "../../demoHelpers/demoUtility";
import { types } from "../../actions/types";
import actions from "../../actions/index";
import keys from "../../constants/constants";
export default function DemoWidget({ inputElement, store }) {
  const demoMode = useSelector((state) => state.agentReducer.demoMode);
  let agentCancelled = false;
  const dispatch = useDispatch();
  const SLEEP_TIME = 500;
  const WRITE_TIME = 75;
  const DEMO_USER_NAME = "Mason";
  const DEMO_USER_FRIEND = "Kathryn";
  const CHANNEL_NAME = "Hangout";
  const VIEWER_DELAY_TIME = 3000;

  const cancel = (e) => {
    if (e.key === "x" && demoMode) {
      agentCancelled = true;
    }
  };
  const cleanUp = () => {
    inputElement.input.current.readOnly = "";
    inputElement.input.current.value = "";
    agentCancelled = false;
    dispatch({
      type: "DEMO_MODE_OFF",
    });

    dispatch({
      type: types.DEMO_CHANGE_NAME,
      payload: {
        agentName: null,
      },
    });

    dispatch({
      type: types.DEMO_CHANNEL_SET,
      payload: {
        channelID: null,
      },
    });
    dispatch({
      type: types.LOAD_CHANNEL_MODULE,
      payload: {
        currentModule: null,
      },
    });
    serverDispatch(`Demo ended.`);

    dispatch({
      type: "NEW_MESSAGE",
      payload: {
        message: (
          <div>
            <span className="commandSuccess">
              Hint: type
              <span className="command"> demo</span> and hit enter to run the
              demo again, or type
              <span className="command"> help</span> to get some instructions.
            </span>
          </div>
        ),
        eventName: "PURE_JSX_EVENT",
      },
    });
  };

  const serverDispatch = (message) => {
    dispatch(
      actions.serverMessageAction(message, keys.COMMAND_SUCCESS_EVENT_KEY)
    );
  };

  const errorDispatch = (message) => {
    dispatch(actions.errorMessageAction(message, keys.ERROR_EVENT_KEY));
  };

  const friendDispatch = (message, agent) => {
    dispatch({
      type: types.NEW_FRIEND_MESSAGE,
      payload: {
        message: message,
        agent: agent,
        eventName: keys.NEW_FRIEND_MESSAGE_EVENT_KEY,
      },
    });
  };

  const chatDispatch = (message, name) => {
    dispatch({
      type: types.NEW_MESSAGE,
      payload: {
        message: message,
        agent: name,
        eventName: keys.CHAT_EVENT_KEY,
        channelID: CHANNEL_NAME,
      },
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", cancel);
    return () => {
      document.removeEventListener("keydown", cancel);
    };
  });

  useEffect(() => {
    if (demoMode) {
      /*Disable user input.*/
      inputElement.input.current.readOnly = "readOnly";

      const runDemo = async () => {
        /*1. Clear the log..*/
        dispatch(actions.clearMessagesAction());

        /*2. Dispatch message about the demo.*/
        serverDispatch(`Demo started, press "x" to initiate cancel.`);
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*3. Dispatch message about the demo.*/
        await writeWord(
          inputElement.input,
          `signup ${DEMO_USER_NAME} secretPass`,
          WRITE_TIME
        );
        inputElement.scroll.current.scrollIntoView();
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*4.Login messages.--------------------------*/
        serverDispatch(`Account successfully created.`);
        inputElement.scroll.current.scrollIntoView();
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(100);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Logged on as `,
            eventName: keys.AUTH_SUCCESS_EVENT_KEY,
            embedded: DEMO_USER_NAME,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        dispatch({
          type: types.DEMO_CHANGE_NAME,
          payload: {
            agentName: DEMO_USER_NAME,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        //Need to mutate the name here
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*5. Write friends.--------------------------*/
        await writeWord(inputElement.input, "friends", WRITE_TIME);
        inputElement.scroll.current.scrollIntoView();
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*6. Dispatch friend error.-----------------*/
        errorDispatch("You have no friends. Try the add friendName command.");
        inputElement.scroll.current.scrollIntoView();
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await sleep(VIEWER_DELAY_TIME);
        /*--------------------------------------*/
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*7. Write add friend command.----------*/
        await writeWord(
          inputElement.input,
          `add ${DEMO_USER_FRIEND}`,
          WRITE_TIME
        );

        inputElement.scroll.current.scrollIntoView();
        /*8. Dispatch notification of request---*/
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Sent friend request to `,
            embedded: DEMO_USER_FRIEND,
            eventName: keys.SENT_FRIEND_REQUEST_KEY,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        await sleep(VIEWER_DELAY_TIME * 2);
        /*9. Dispatch notification of acceptance---*/
        dispatch(
          actions.specialServerMessageAction(
            `has accepted your friend request.`,
            DEMO_USER_FRIEND,
            keys.FRIEND_HAS_ACCEPTED_KEY
          )
        );

        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        /*--------------------------------------*/

        /*9.5 Write friends command.----------*/
        await writeWord(inputElement.input, `friends`, WRITE_TIME);
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `is `,
            embedded: DEMO_USER_FRIEND,
            embedded2: `online.`,
            eventName: keys.FRIEND_LIST_ITEM_EVENT_KEY,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*10 Write friends command.----------*/
        await sleep(VIEWER_DELAY_TIME);
        friendDispatch(
          ` Hey! Come join me in the channel ${CHANNEL_NAME}`,
          DEMO_USER_FRIEND
        );

        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*11 Write back----------*/
        await writeWord(
          inputElement.input,
          `m ${DEMO_USER_FRIEND} Alright, one sec`,
          WRITE_TIME
        );

        friendDispatch(" Alright, one sec", DEMO_USER_NAME);

        inputElement.scroll.current.scrollIntoView();

        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*12 Join channel----------*/
        await writeWord(inputElement.input, `join ${CHANNEL_NAME}`, WRITE_TIME);
        inputElement.scroll.current.scrollIntoView();
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Joined channel:`,
            embedded: CHANNEL_NAME,
            eventName: keys.EMBEDDED_COMMAND_SUCCESS_EVENT_KEY,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        dispatch({
          type: types.DEMO_CHANNEL_SET,
          payload: {
            channelID: CHANNEL_NAME,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        inputElement.input.current.readOnly = "readOnly";

        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        /*12. Friend joins the channel.----------*/
        //
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        dispatch({
          type: types.NEW_CHANNEL_MESSAGE,
          payload: {
            agent: DEMO_USER_FRIEND,
            eventName: keys.JOINED_CHANNEL_KEY,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        // serverDispatch(`<${DEMO_USER_FRIEND}> has joined the channel.`);
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        chatDispatch(
          "Hey. You can switch to chat mode with shift + down-arrow-key.",
          DEMO_USER_FRIEND
        );
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await writeWord(
          inputElement.input,
          `Hmm.. What do you mean?`,
          WRITE_TIME
        );
        inputElement.scroll.current.scrollIntoView();

        dispatch({
          type: types.NEW_ERROR_MESSAGE,
          payload: {
            message: `error: unknown command'Hmm..'`,
            eventName: keys.ERROR_EVENT_KEY,
          },
        });
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        dispatch({
          type: "SWAP_COMMAND_STATE",
        });
        inputElement.scroll.current.scrollIntoView();
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME / 2);
        if (agentCancelled) {
          cleanUp();
          return;
        }

        dispatch({
          type: "SWAP_COMMAND_STATE",
        });
        inputElement.scroll.current.scrollIntoView();
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME / 2);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        dispatch({
          type: "SWAP_COMMAND_STATE",
        });
        if (agentCancelled) {
          cleanUp();
          return;
        }
        inputElement.scroll.current.scrollIntoView();
        await sleep(VIEWER_DELAY_TIME / 2);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await writeWord(
          inputElement.input,
          `Ah, command mode is for commands only, not channel chat.`,
          WRITE_TIME
        );
        if (agentCancelled) {
          cleanUp();
          return;
        }
        inputElement.scroll.current.scrollIntoView();
        chatDispatch(
          `Ah, command mode is for commands only, not channel chat.`,
          DEMO_USER_NAME
        );
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        chatDispatch(
          "Correct. Except if you want to send a direct friend message, that's a command.",
          DEMO_USER_FRIEND
        );
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME * 2);
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        chatDispatch(
          "Try switching back to command mode and load the code module for us.",
          DEMO_USER_FRIEND
        );

        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await writeWord(inputElement.input, `Alright, hold on.`, WRITE_TIME);
        inputElement.scroll.current.scrollIntoView();
        chatDispatch(`Alright, hold on.`, DEMO_USER_NAME);
        inputElement.scroll.current.scrollIntoView();

        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        dispatch({
          type: "SWAP_COMMAND_STATE",
        });
        inputElement.scroll.current.scrollIntoView();

        /*--------------------------------------*/
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        await writeWord(inputElement.input, `load CODE`, WRITE_TIME);
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        dispatch({
          type: types.LOAD_CHANNEL_MODULE,
          payload: {
            currentModule: "CODE",
          },
        });

        dispatch({
          type: types.AGENT_ACTION_MESSAGE,
          payload: {
            message: "CODE" ? ` is loading CODE.` : ` has closed the module.`,
            eventName: keys.AGENT_ACTION_KEY,
            agent: DEMO_USER_NAME,
          },
        });

        inputElement.scroll.current.scrollIntoView();
        inputElement.input.current.readOnly = "readOnly";

        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME * 2);

        /*--------------------------------------*/

        chatDispatch(
          "I'll write some code and we can run it.",
          DEMO_USER_FRIEND
        );
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        await writeCode(
          inputElement,
          `const firstWord = "Hello";\nconst secondWord = " world!";\nconsole.log(firstWord + secondWord);`,
          100
        );
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);

        /*--------------------------------------*/
        chatDispatch(
          "Try using the run command to interpret the code.",
          DEMO_USER_FRIEND
        );
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await writeWord(inputElement.input, `run`, WRITE_TIME);
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(200);
        /*--------------------------------------*/
        let data = { output: "Hello world!" };
        dispatch({
          type: types.NEW_CODE_EDITOR_OUTPUT,

          payload: { data: output, time: new Date().toLocaleTimeString() },
        });
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME * 3);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        chatDispatch(
          "Looking good. You might need to write some unit tests for that one though.",
          DEMO_USER_FRIEND
        );
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        dispatch({
          type: "SWAP_COMMAND_STATE",
        });
        await sleep(VIEWER_DELAY_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        inputElement.scroll.current.scrollIntoView();
        await writeWord(
          inputElement.input,
          `Right.. I'll get on that.`,
          WRITE_TIME
        );
        chatDispatch("Right.. I'll get on that.", DEMO_USER_NAME);
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        /*--------------------------------------*/

        chatDispatch("I'm off for now, talk to you later!", DEMO_USER_FRIEND);
        inputElement.scroll.current.scrollIntoView();
        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(VIEWER_DELAY_TIME);
        /*--------------------------------------*/
        dispatch({
          type: types.NEW_CHANNEL_MESSAGE,
          payload: {
            agent: DEMO_USER_FRIEND,
            eventName: keys.LEFT_CHANNEL_KEY,
          },
        });
        inputElement.scroll.current.scrollIntoView();

        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(200);
        dispatch(
          actions.specialServerMessageAction(
            ` has logged off.`,
            DEMO_USER_FRIEND,
            keys.FRIEND_HAS_LOGGED_OFF_EVENT_KEY
          )
        );
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);

        /*--------------------------------------*/

        inputElement.scroll.current.scrollIntoView();

        dispatch({
          type: "SWAP_COMMAND_STATE",
        });

        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        await sleep(SLEEP_TIME);
        /*--------------------------------------*/

        await writeWord(inputElement.input, `close`, WRITE_TIME);

        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        dispatch({
          type: types.LOAD_CHANNEL_MODULE,
          payload: {
            currentModule: null,
          },
        });

        inputElement.input.current.readOnly = "readOnly";
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await writeWord(inputElement.input, `logout`, WRITE_TIME);
        /*--------------------------------------*/
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Logged out from `,
            eventName: keys.AUTH_SUCCESS_EVENT_KEY,
            embedded: DEMO_USER_NAME,
          },
        });

        /*--------------------------------------*/

        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*The end-------------------------------*/
        cleanUp();
      };

      runDemo();
    }
  }, [demoMode]);

  return null;
}
