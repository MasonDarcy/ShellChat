import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { writeWord, sleep } from "../../demoHelpers/demoUtility";
import { types } from "../../actions/types";
import actions from "../../actions/index";
import keys from "../../constants/constants";
export default function DemoWidget({ inputElement }) {
  const demoMode = useSelector((state) => state.agentReducer.demoMode);
  let agentCancelled = false;
  const dispatch = useDispatch();
  const SLEEP_TIME = 500;
  const WRITE_TIME = 100;
  const DEMO_USER_NAME = "Mason";
  const DEMO_USER_FRIEND = "Kathryn";
  const CHANNEL_NAME = "Hangout";

  const cancel = (e) => {
    if (e.key === "x" && demoMode) {
      agentCancelled = true;
    }
  };
  const cleanUp = () => {
    inputElement.current.readOnly = "";
    inputElement.current.value = "";
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
    actions.serverMessageAction(
      "Demo cancelled.",
      keys.COMMAND_SUCCESS_EVENT_KEY
    );
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

  const jsxDispatch = (message) => {
    dispatch({
      type: types.JSX_MESSAGE,
      payload: {
        message: message,
        eventName: keys.PURE_JSX_EVENT_KEY,
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
      inputElement.current.readOnly = "readOnly";

      const runDemo = async () => {
        /*1. Clear the log..*/
        dispatch(actions.clearMessagesAction());

        /*2. Dispatch message about the demo.*/
        serverDispatch(`Demo started, press "x" to initiate cancel.`);

        /*--------------------------------------*/
        sleep(SLEEP_TIME);
        /*--------------------------------------*/

        /*3. Dispatch message about the demo.*/
        await writeWord(
          inputElement,
          `signup ${DEMO_USER_NAME} secretPass`,
          WRITE_TIME
        );

        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*4.Login messages.--------------------------*/
        serverDispatch(`Account successfully created.`);
        await sleep(100);
        // serverDispatch(`Logged on as ${DEMO_USER_NAME}.`);
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Logged on as `,
            eventName: keys.AUTH_SUCCESS_EVENT_KEY,
            embedded: DEMO_USER_NAME,
          },
        });
        dispatch({
          type: types.DEMO_CHANGE_NAME,
          payload: {
            agentName: DEMO_USER_NAME,
          },
        });
        //Need to mutate the name here
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        /*--------------------------------------*/

        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*5. Write friends.--------------------------*/
        await writeWord(inputElement, "friends", WRITE_TIME);
        /*6. Dispatch friend error.-----------------*/
        errorDispatch("You have no friends. Try the add friendName command.");

        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        /*--------------------------------------*/
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*7. Write add friend command.----------*/
        await writeWord(inputElement, `add ${DEMO_USER_FRIEND}`, WRITE_TIME);

        /*8. Dispatch notification of request---*/
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Sent friend request to `,
            embedded: DEMO_USER_FRIEND,
            eventName: keys.SENT_FRIEND_REQUEST_KEY,
          },
        });
        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        /*--------------------------------------*/

        //cancel check
        if (agentCancelled) {
          cleanUp();
          return;
        }

        /*9. Dispatch notification of acceptance---*/
        dispatch(
          actions.specialServerMessageAction(
            `has accepted your friend request.`,
            DEMO_USER_FRIEND,
            keys.FRIEND_HAS_ACCEPTED_KEY
          )
        );

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*9.5 Write friends command.----------*/
        await writeWord(inputElement, `friends`, WRITE_TIME);
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `is `,
            embedded: DEMO_USER_FRIEND,
            embedded2: `online`,
            eventName: keys.FRIEND_LIST_ITEM_EVENT_KEY,
          },
        });

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*10 Write friends command.----------*/

        friendDispatch(
          ` Hey! Come join me in the channel ${CHANNEL_NAME}`,
          DEMO_USER_FRIEND
        );

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*11 Write back----------*/
        await writeWord(
          inputElement,
          `m ${DEMO_USER_FRIEND} Alright, one sec`,
          WRITE_TIME
        );

        friendDispatch(" Alright, one sec", DEMO_USER_NAME);

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*12 Join channel----------*/
        await writeWord(inputElement, `join ${CHANNEL_NAME}`, WRITE_TIME);
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Joined channel:`,
            embedded: CHANNEL_NAME,
            eventName: keys.EMBEDDED_COMMAND_SUCCESS_EVENT_KEY,
          },
        });

        dispatch({
          type: types.DEMO_CHANNEL_SET,
          payload: {
            channelID: CHANNEL_NAME,
          },
        });

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        /*12. Friend joins the channel.----------*/
        //
        dispatch({
          type: types.NEW_CHANNEL_MESSAGE,
          payload: {
            agent: DEMO_USER_FRIEND,
            eventName: keys.JOINED_CHANNEL_KEY,
          },
        });
        // serverDispatch(`<${DEMO_USER_FRIEND}> has joined the channel.`);
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        chatDispatch(
          "Hey. You can switch to chat mode with ctrl + down-arrow-key.",
          DEMO_USER_FRIEND
        );
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await writeWord(inputElement, `Hmm.. What do you mean?`, WRITE_TIME);

        dispatch({
          type: types.NEW_ERROR_MESSAGE,
          payload: {
            message: `error: unknown command'Hmm..'`,
            eventName: keys.ERROR_EVENT_KEY,
          },
        });

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        dispatch({
          type: "SWAP_COMMAND_STATE",
        });

        await sleep(300);

        dispatch({
          type: "SWAP_COMMAND_STATE",
        });

        await sleep(300);

        dispatch({
          type: "SWAP_COMMAND_STATE",
        });

        await sleep(300);

        await writeWord(
          inputElement,
          `Oh I get it now, command mode is for commands only.`,
          WRITE_TIME
        );

        chatDispatch(
          `Oh I get it now, command mode is for commands only.`,
          DEMO_USER_NAME
        );
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        chatDispatch(
          "Yeah. Switch back to command mode and load the code module for us.",
          DEMO_USER_FRIEND
        );
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        await writeWord(inputElement, `Alright, hold on.`, WRITE_TIME);
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        dispatch({
          type: "SWAP_COMMAND_STATE",
        });

        await sleep(300);
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        await writeWord(inputElement, `load CODE`, WRITE_TIME);

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
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
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        chatDispatch(
          "I'll write some code and we can run it.",
          DEMO_USER_FRIEND
        );

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
