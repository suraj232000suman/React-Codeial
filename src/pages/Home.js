import styles from "../styles/home.module.css";
import PropTypes from "prop-types";
import { CreatePost, Loader, Post } from "../components";
// import { Link } from "react-router-dom";
import FriendsList from "../components/FriendList";
import { useAuth, usePosts } from "../hooks";
export const Home = () => {
  const posts = usePosts();
  // const [loading, setLoading] = useState([]);
  const auth = useAuth();
  console.log("ps", posts);
  if (posts.loading) {
    return <Loader />;
    // return <h3>Sujal...</h3>;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};
Home.propTypes = {
  posts: PropTypes.array.isRequired,
};
