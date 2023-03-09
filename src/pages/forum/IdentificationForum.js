import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs, orderBy } from "firebase/firestore";
import NavProfile from "../../components/nav/Nav";
import Popup from "../../components/forumComp/Popup";
import classes from "./forumPages.module.css";

//Forum page for identificationforum
function IdentificationForum (){

  //State variables for post list, button popup, and posting text
  const [postLists, setPostList] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [postText, setPostText] = useState("");

  //Var for db of posts and date
  const postCollectionRef = collection(db, "identificationPosts");
  const date = new Date();

  //Creating a post
  const createPost = async () => {
    //Adding to fb db specified by postCollectionRef above with text + date
    await addDoc(postCollectionRef, {
      postText,
      createdAt: date.toUTCString(),
    });

    //Close the create post modal and set text back to empty
    setButtonPopup(false);
    setPostText("");
    window.location.reload(); //reload 
  };

  useEffect(async () => {
    //Grabbing posts from db
    const getPosts = async function () {
      //set var data to db doc "identificationpost"
      const data = await getDocs(postCollectionRef);
      //tempList now contains docs mapped to data
      const tempList = data.docs.map((doc) => ({...doc.data()}))
      //sort tempList by dates
      tempList.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt)
      });
      //reverse, then store in postList
      tempList.reverse();
      setPostList(tempList);
    };
    //Call method, console logging for testing
    await getPosts();
    console.log(postLists);
  }, []);


  //What is being viewed.
  return (
    <>
      {/* Top part of the page w/ header and nav bar */}
      <div className={classes.navbar}>
            Identification Forum
      </div>
      <div className={classes.padding}></div>
      <NavProfile/>

      {/* Creating new post section */}
      <div className={classes.btn_container}>
        <main>
          <button onClick={() => setButtonPopup(true)} className={classes.add_post_btn}>
            Add new post
          </button>
        </main>

        {/* Popup trigger when creating new post */}
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

      {/* Displays the forum posts within db */}
      <div className={classes.homePage}>
          {postLists.map((post) => {
            return (
              <div className={classes.post}>
                <div className={classes.postTextContainer}>
                  {post.postText}
                </div>
              </div>
            );
          })}
      </div>

    </>
  );
};
export default IdentificationForum;