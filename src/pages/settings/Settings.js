// import Nav from "../../components/nav/Nav";
// import classes from "./settings.module.css";
 


// function Settings(){
    
//     return(
//         <>
//             <Nav />
        
//             <div className={classes.settings}>
//                  Settings
//             </div>

//             <div className={classes.main_container}>
//                 <div className={classes.name}>

//                 </div>
//             </div>






//         </>
//     )
// }

// export default Settings;





import React, { useState } from 'react';
import classes from "./settings.module.css";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <div className={classes.settings_page}>
      <h2>Settings</h2>
      <div className={classes.setting}>
        <h3>Notifications</h3>
        <label htmlFor="notifications-toggle">
          <input
            type="checkbox"
            id="notifications-toggle"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          Enable notifications
        </label>
      </div>
      <div className={classes.setting}>
        <h3>Dark Mode</h3>
        <label htmlFor="dark-mode-toggle">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            checked={darkModeEnabled}
            onChange={() => setDarkModeEnabled(!darkModeEnabled)}
          />
          Enable dark mode
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
