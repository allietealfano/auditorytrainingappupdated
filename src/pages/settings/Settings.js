import Nav from "../../components/nav/Nav";
import classes from "./settings.module.css";


function Settings(){
    
  var a;
  function pass(){
    if(a==1){
      document.getElementById('P1').type='password';
      document.getElementById('E1').src="eye-hide.png";
      a = 0;
    }else{
      document.getElementById('P1').type='text';
      document.getElementById('E1').src="eye-view.png";
      a=1
    }
  }

  var b;
  function pass2(){
    if(b==1){
      document.getElementById('P2').type='password';
      document.getElementById('E2').src="eye-hide.png";
      b = 0;
    }else{
      document.getElementById('P2').type='text';
      document.getElementById('E2').src="eye-view.png";
      b=1
    }
  }

  var c;
  function pass3(){
    if(c==1){
      document.getElementById('P3').type='password';
      document.getElementById('E3').src="eye-hide.png";
      c = 0;
    }else{
      document.getElementById('P3').type='text';
      document.getElementById('E3').src="eye-view.png";
      c=1
    }
  }

  var d;
  function pass4(){
    if(d==1){
      document.getElementById('P4').type='password';
      document.getElementById('E4').src="eye-hide.png";
      d = 0;
    }else{
      document.getElementById('P4').type='text';
      document.getElementById('E4').src="eye-view.png";
      d=1
    }
  }



    return(
        <>
            <Nav />
        
            <div className={classes.settings}>
                  Settings
            </div>

              <div className={classes.main_container}>

                {/* EMAIL starts here */}

                <div className={classes.email_container}>

                  {/* <div className={classes.name}> */}
                    
                    <div className={classes.section_specifier}>
                      <h4>Update Email</h4>
                    </div>

                    <h5>Email</h5>
                    <input 
                      className={classes.text_box}
                      type="email"
                    ></input>

                    <h5>Password</h5>
                    <div>
                      <input 
                        className={classes.text_box}
                        type="password"
                        placeholder="Current Password"
                        id="P1"
                      ></input>
                      <img className={classes.image} src="eye-hide.png" onClick={pass} id="E1"></img>
                      

                    </div>

                    

                    <div>
                      <button className={classes.email_button}>
                          Submit
                      </button>
                    </div>

                    
                      <div className={classes.divider}>
                        {/* <hr></hr> */}
                      </div>
                  
                    
                    </div>
                    {/* EMAIL ends here */}

                    {/* PASSWORD container begins here */}

                    <div className={classes.password_container}>

                    <div className={classes.section_specifier}>
                      <h4>Change Password</h4>
                    </div>

                    <h5>Current Password</h5>

                    <div>
                      <input 
                        className={classes.text_box}
                        type="password"
                        placeholder="Current Password"
                        id="P2"
                      ></input>
                      <img className={classes.image} src="eye-hide.png" onClick={pass2} id="E2"></img>
                    </div>

                    <h5>New Password</h5>
                    <div>
                    <input 
                        className={classes.text_box}
                        type="password"
                        placeholder="New Password"
                        id="P3"
                      ></input>
                      <img className={classes.image} src="eye-hide.png" onClick={pass3} id="E3"></img>
                    </div>

                    <h5>Confirm Password</h5>

                    <div>
                      <input 
                        className={classes.text_box}
                        type="password"
                        placeholder="Confirm Password"
                        id="P4"
                      ></input>
                      <img className={classes.image} src="eye-hide.png" onClick={pass4} id="E4"></img>
                    </div>

                    <div>
                      <button className={classes.password_button}>
                          Submit
                      </button>
                    </div>

                    <div className={classes.divider}>

                      </div>
                      
                    </div>
                  {/* </div> */}
              </div>
            {/* </div> */}


        </>
    )
}

export default Settings;





// import React, { useState } from 'react';
// import classes from "./settings.module.css";

// const SettingsPage = () => {
//   const [notificationsEnabled, setNotificationsEnabled] = useState(false);
//   const [darkModeEnabled, setDarkModeEnabled] = useState(false);

//   return (
//     <div className={classes.settings_page}>
//       <h2>Settings</h2>
//       <div className={classes.setting}>
//         <h3>Notifications</h3>
//         <label htmlFor="notifications-toggle">
//           <input
//             type="checkbox"
//             id="notifications-toggle"
//             checked={notificationsEnabled}
//             onChange={() => setNotificationsEnabled(!notificationsEnabled)}
//           />
//           Enable notifications
//         </label>
//       </div>
//       <div className={classes.setting}>
//         <h3>Dark Mode</h3>
//         <label htmlFor="dark-mode-toggle">
//           <input
//             type="checkbox"
//             id="dark-mode-toggle"
//             checked={darkModeEnabled}
//             onChange={() => setDarkModeEnabled(!darkModeEnabled)}
//           />
//           Enable dark mode
//         </label>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
