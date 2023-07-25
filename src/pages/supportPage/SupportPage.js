import React from 'react';
import classes from './SupportPage.module.css'; 
import Nav from "../../components/nav/Nav";

{/*Support Page Code*/}
function SupportPage() {
  return (
    <>
      <Nav />
      <div className={classes.main_container}>
        <h1 className={classes.header__title}>Contact Support</h1>
        <h2 className={classes.subheading}>We are 'hear' for you!</h2>
        <div className={classes.wrapper}>
        <img
                src={require("../../assets/images/pexels-jonas-mohamadi-1490844.jpg")}
                alt="Founder"
                className={classes.card__img}
              />

        <div
        className= {classes.support_text_input}
        >
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" />           
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Your email" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your message"></textarea>

            {/*TODO: Make Button send meesage to PO's lab email*/}
            <button type="submit">Submit</button>
          </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default SupportPage;
