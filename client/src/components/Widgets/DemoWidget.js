import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { writeWord } from "../../demoHelpers/demoUtility";
import { types } from "../../actions/types";
export default function DemoWidget({ inputElement }) {
  const demoMode = useSelector((state) => state.agentReducer.demoMode);
  let agentCancelled = false;
  const dispatch = useDispatch();

  const cancel = (e) => {
    if (e.key === "x" && demoMode) {
      agentCancelled = true;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", cancel);
    return () => {
      document.removeEventListener("keydown", cancel);
    };
  });

  useEffect(() => {
    if (demoMode) {
      //All demo logic.
      console.log("DemoWidget useEffect fired.");

      //Disable the chat input
      console.log("Chat input disabled.");
      inputElement.current.readOnly = "readOnly";

      const runDemo = async () => {
        //Placeholder demo
        dispatch();

        await writeWord(inputElement, "", 300);
        //check to see if the user canceled
        if (agentCancelled) {
          inputElement.current.readOnly = "";
          inputElement.current.value = "";
          agentCancelled = false;
          dispatch({
            type: "DEMO_MODE_OFF",
          });
          return;
        }
        await writeWord(inputElement, "Neo . . .", 600);

        //Cleanup
        agentCancelled = false;
        inputElement.current.readOnly = "";
        dispatch({
          type: "DEMO_MODE_OFF",
        });
      };
      runDemo();
    }
  }, [demoMode]);

  return null;
}
