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

  const chatDispatch = (message, name) => {
    dispatch({
      type: types.NEW_MESSAGE,
      payload: {
        message: message,
        agent: name,
        eventName: keys.CHAT_EVENT_KEY,
        channelID: "LetsCode",
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
        serverDispatch(`Account ${DEMO_USER_NAME} successfully created.`);
        await sleep(100);
        serverDispatch(`Logged on as ${DEMO_USER_NAME}.`);
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
        serverDispatch(`Sent friend request to ${DEMO_USER_FRIEND}`);
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
        serverDispatch(`${DEMO_USER_FRIEND} has accepted your friend request.`);

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*9.5 Write friends command.----------*/
        await writeWord(inputElement, `friends`, WRITE_TIME);
        serverDispatch(`${DEMO_USER_FRIEND}: is online.`);

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*10 Write friends command.----------*/
        // dispatch({
        //   type: types.NEW_SERVER_MESSAGE,
        //   payload: {
        //     message: `<${DEMO_USER_FRIEND}> Hey! Come join me in the channel LetsCode`,
        //     eventName: keys.NEW_FRIEND_MESSAGE_EVENT_KEY,
        //   },
        // });
        friendDispatch(
          "Hey! Come join me in the channel LetsCode",
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

        friendDispatch("Alright, one sec", DEMO_USER_NAME);

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/

        /*12 Join channel----------*/
        await writeWord(inputElement, `join LetsCode`, WRITE_TIME);
        serverDispatch(`Joined Channel: LetsCode`);

        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        /*12. Friend joins the channel.----------*/
        serverDispatch(`<${DEMO_USER_FRIEND}> has joined the channel.`);
        /*--------------------------------------*/
        await sleep(SLEEP_TIME);
        if (agentCancelled) {
          cleanUp();
          return;
        }
        /*--------------------------------------*/
        chatDispatch(
          "Hey. You can switch to chat mode with ctrl+uparrow.",
          DEMO_USER_FRIEND
        );

        /*The end-------------------------------*/
        cleanUp();
      };

      runDemo();
    }
  }, [demoMode]);

  return null;
}
