import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import { usePosts } from "../hooks";
import { useToasts } from "react-toast-notifications";
import { createComment, toggleLike } from "../api";
import { useState } from "react";
const Post = ({ post }) => {
    const [comment,setComment] = useState('');
    // const [creatingComment,setCreatingComment] = useState(false);
    const posts = usePosts();
    const [like,setLike] = useState(post.likes.length);
    const {addToast} = useToasts();
    console.log('P',post);
    const handleToggleLikeClick = async() =>{
        const response = await toggleLike(post._id,'Post');
        if(response.success){
            if(response.data.deleted){
                addToast('Like removed successfully!',{
                    appearance: 'success'
                })
                setLike(like-1);
            }else{
                addToast('Like added successfully!',{
                    appearance: 'success'
                })
                setLike(like+1);
            }
        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }
    }
    const handleAddComment = async (e)=>{
        if(e.key==='Enter'){
            // setCreatingComment(true);
            const response = await createComment(comment,post._id);
            if(response.success){
                setComment('');
                posts.addComment(response.data.comment,post._id);
                addToast('Comment created Successfully!',{
                    appearance: 'success'
                })
            }else{
                addToast(response.message,{
                    appearance: 'error'
                })
            }
            // setCreatingComment(false);
        }
    }
  return (
    <div className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <img
              src="data:image/png;base64,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"
              alt="likes-icon"
              onClick={handleToggleLikeClick}
            />
            <span>{like}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="data:image/png;base64,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"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input placeholder="Start typing a comment"  value={comment} onChange={(e)=>setComment(e.target.value)} onKeyDown={handleAddComment} />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Post;
