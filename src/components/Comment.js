import styles from '../styles/home.module.css'
import PropTypes from 'prop-types';
export const Comment = ({ comment }) => {
  console.log('c',comment);
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propType = {
    comment :  PropTypes.object.isRequired
}