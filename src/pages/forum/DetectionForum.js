import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, getDocs, orderBy } from "firebase/firestore";
import NavProfile from "../../components/nav/Nav";
import Popup from "../../components/forumComp/Popup";
import classes from "./forumPages.module.css";


function DetectionForum (){
  const [postLists, setPostList] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [postText, setPostText] = useState("");

const postCollectionRef = collection(db, "detectionPosts");
const date = new Date();

const createPost = async () => {
  await addDoc(postCollectionRef, {
    postText,
    createdAt: date.toUTCString(),
  });
  setButtonPopup(false);
  setPostText("");
  window.location.reload();
};

useEffect(async () => {
  const getPosts = async function () {
    const data = await getDocs(postCollectionRef);
    const tempList = data.docs.map((doc) => ({...doc.data()}))
    tempList.sort(function(a,b){
      return new Date(a.createdAt) - new Date(b.createdAt)
    });
    tempList.reverse();
    setPostList(tempList);
  };
  await getPosts();
  console.log(postLists);
}, []);


  return (
    <>
<div className={classes.navbar}>
      Detection Forum
</div>
<div className={classes.padding}></div>
<NavProfile/>
<div className={classes.btn_container}>
  <main>
    <button onClick={() => setButtonPopup(true)} className={classes.add_post_btn}>
      Add new post
    </button>
  </main>
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
export default DetectionForum;