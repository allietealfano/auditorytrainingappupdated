import { React, useRef, useContext, useState, useCallback } from "react";
import IdleTimer from "react-idle-timer";

import Pop from "../../components/pop/Pop";
import AuthContext from "./auth-context";

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const logout = authContext.logout;

  const [pop, setPop] = useState(false);

  const onIdle = () => {
    if (isLoggedIn) {
      setPop(true);
      sessionTimeoutRef.current = setTimeout(() => {
        logout();
        setPop(false);
      }, 30 * 1000);
    }
  };

  const active = () => {
    if (isLoggedIn) {
      setPop(false);
      clearTimeout(sessionTimeoutRef.current);
    }
  };

  return (
    <div>
      {pop && (
        <Pop
          headerBig={"You have been away for a while"}
          headerSmall={"Would you like to log out?"}
          option1={"Stay Active"}
          option1Func={active}
          option2={"Log Out"}
          option2Func={() => {
            logout();
            setPop(false);
            clearTimeout(sessionTimeoutRef.current);
          }}
        />
      )}
      <IdleTimer
        crossTab={true}
        ref={idleTimerRef}
        timeout={600 * 1000}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
}

export default IdleTimerContainer;
