import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs, orderBy } from "firebase/firestore";
import NavProfile from "../../components/nav/Nav";
import Popup from "../../components/forumComp/Popup";
import classes from "./forumPages.module.css";

/*Forum Page for DiscriminationForum */
function DiscriminationForum (){

  //State variables for post list, button popup, and posting text
  const [postLists, setPostList] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [postText, setPostText] = useState("");

  //Var for db of posts and date
  const postCollectionRef = collection(db, "discriminationPosts");
  const date = new Date();

  //Creating a post
  const createPost = async () => {
    
    //Adding to fb db specified by postCollectionRef with text and date field
    await addDoc(postCollectionRef, {
      postText,
      createdAt: date.toUTCString(),
    });

    //Close the create post modal and set the text back to empty
    setButtonPopup(false);
    setPostText("");
    window.location.reload(); //reload to see updated forum posts
  };

  useEffect(async () => {
    //Gravving posts from db
    const getPosts = async function () {
      //Set var data to db doc "discriminationPosts"
      const data = await getDocs(postCollectionRef);
      //tempList now contains docs mapped to data
      const tempList = data.docs.map((doc) => ({...doc.data()}))
      //Sort tempList based on dates
      tempList.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt)
      });

      //Reverse the sorting, then store it in PostList
      tempList.reverse();
      setPostList(tempList);
    };

    //Call function defined above, log for testing
    await getPosts();
    console.log(postLists);
  }, []);

  //Actually viewed content
  return (
    <>
      {/* Top part of the page w/ header and nav bar */}
      <div className={classes.navbar}>
            Discrimination Forum
      </div>
      <div className={classes.padding}></div>
      <NavProfile/>

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

      {/* Displaying posts */}
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
export default DiscriminationForum;