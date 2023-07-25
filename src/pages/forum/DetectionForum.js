import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs, orderBy } from "firebase/firestore";
import NavProfile from "../../components/nav/Nav";
import Popup from "../../components/forumComp/Popup";
import classes from "./forumPages.module.css";
import useFetch from "../../components/custHooks/useFetch";
import personIcon from "../../assets/icons/Person Icon.png";

/**Forum Page for DetectionForum*/
function DetectionForum (){

  //State variables for post list, button popup, and posting text
  const [postLists, setPostList] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [postText, setPostText] = useState("");

  //Var for db of posts and date
  const postCollectionRef = collection(db, "detectionPosts");
  const date = new Date();
  const [[fName], isPending, err] = useFetch("fName", "lName");

  //Creating a post
  const createPost = async () => {
    //Adding to fb db specified by postCollectionRef with text and date field
    await addDoc(postCollectionRef, {
      postText,
      createdAt: date.toUTCString(),
      createdBy: fName,
    });
    
    //Close the create post modal and set the text back to empty
    setButtonPopup(false);
    setPostText("");
    window.location.reload(); //Reload to see updated forum post
  };

  useEffect(async () => {
    //Grabbing the posts from db
    const getPosts = async function () {
      //set var data to db doc "detectionPosts"
      const data = await getDocs(postCollectionRef);
      //tempList now contains docs mapped to data.
      const tempList = data.docs.map((doc) => ({...doc.data()}))
      //Sort tempList based on dates
      tempList.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt)
      });

      //Reverse the sorting, then store it in PostList.
      tempList.reverse();
      setPostList(tempList);
    };

    //Call function in useEffects, log to confirm posts are properly stored.
    await getPosts();
    console.log(postLists);
  }, [postCollectionRef, postLists]);


  //What is actually viewed.
  return (
    <>
      {/* Top part of the page w/ header and nav bar */}
      <div className={classes.navbar}>
            {/*Detection Forum*/}
      </div>
      {/*<div className={classes.padding}></div>*/}
      <NavProfile/>

    

      {/* The next line of code creates 3 columns */ }
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>

      {/* Merges the image, name of user, inbox and icon, and notifications and incon into a single object */}
      <div style={{ paddingTop: "30rem", paddingRight: "1rem", paddingBottom: "1rem", paddingLeft: "8rem", borderRight: "3px solid black" }}>
      <div>
      {/* Inserting image */}
      <div>
        <img
          src={personIcon}
          alt="Founder"
          className={classes.story__img}
          style={{ width: "200px", height: "200px" }}
        />
      </div>

      {/* Inserting name of user */}
      <div>
        <h4 style={{marginBottom: "1rem", marginLeft: "11rem"}}>{fName}</h4>
      </div>

      {/* Inserting Inbox and icon */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h5 style={{ marginBottom: "0.5rem", marginLeft: "6rem" }}>Inbox</h5>
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
        <img
          src={require("../../assets/icons/Message Icon.jpg")}
          alt="Founder"
          className={classes.story__img}
          style={{ width: "15%", height: "auto" }}
        />
        </div>
      </div>

      {/* Inserting Notification and icon */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h5 style={{ marginBottom: "0.5rem", marginLeft: "3rem" }}>Notifications</h5>
        </div>
        <div style={{ marginLeft: "0rem" }}>
          <img
            src={require("../../assets/icons/notification.png")}
            alt="Founder"
            className={classes.story__img}
            style={{ width: "15%", height: "auto" }}
          />
        </div>
      </div>
    </div>
    </div>
    {/* Finished merging and first column */}



      
      {/* Second column */}
      {/* Displaying the forum posts */}
      <div style={{ paddingTop: "10rem", paddingRight: "1rem", paddingBottom: "3rem", paddingLeft: "3rem", borderRight: "3px solid black" }}>
      <h1 style={{ paddingTop: "0rem", marginBottom: "0.5rem", marginLeft: "21rem", fontFamily: "Sans-Serif", fontWeight: "bold" }}>Forum</h1>
        <div className={classes.homePage}>
            {postLists.map((post) => {
              return (
                <div className={classes.post}>
                  <div className={classes.postTextContainer}>
                  <p>{post.createdBy}</p>
                  <p>{post.createdAt}</p>
                  <p>{post.postText}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>



      {/* Third column*/ }
      <div style={{ paddingTop: "30rem", paddingRight: "1rem", paddingBottom: "3rem", paddingLeft: "15rem" }}>
        <h5 style={{ marginBottom: "1.5rem", marginLeft: "8rem", padding: "0.5rem", borderRadius: "20px", background: "lightgray", display: "inline-block" }}>Forum Topics        ^</h5>
        <h5 style={{ marginBottom: "1rem", marginLeft: "-5rem", padding: "0.5rem", borderRadius: "20px", background: "lightgray", display: "inline-block" }}> Community for the Deaf and Hard of Hearing</h5>
        <h5 style={{ marginBottom: "1rem", marginLeft: "5rem", padding: "0.5rem", borderRadius: "20px", background: "lightgray", display: "inline-block" }}> My Hearing Loss Story</h5>
        <h5 style={{ marginBottom: "1rem", marginLeft: "9.5rem", padding: "0.5rem", borderRadius: "20px", background: "lightgray", display: "inline-block" }}> Lip Reading</h5>
        <h5 style={{ marginBottom: "1rem", marginLeft: "6rem", padding: "0.5rem", borderRadius: "20px", background: "lightgray", display: "inline-block" }}> My Hearing Journey</h5>
        <h5 style={{ marginBottom: "1rem", marginLeft: "3rem", padding: "0.5rem", borderRadius: "20px", background: "lightgray", display: "inline-block" }}> Living With Hearing Loss</h5>
      </div>


      </div>



      {/* Forum posting part */}
      <div className={classes.btn_container}>
        <main>
          <button onClick={() => setButtonPopup(true)} className={classes.add_post_btn}>
            Add new post
          </button>
        </main>

        {/* Creating a post popup */}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3 style={{fontSize: 20}}>
            Add new post
          </h3>
          <textarea placeholder="Type a post..." className={classes.text_area}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button onClick={createPost} className={classes.create_post_btn}>
            Save Post
          </button>
        </Popup>
      </div>


          

    </>
  );
};
export default DetectionForum;