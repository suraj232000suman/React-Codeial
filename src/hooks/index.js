import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {
  login as userLogin,
  register,
  editProfile,
  fetchUserFriends,
  getPosts,
} from "../api";
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";
import jwt from "jwt-decode";
import { PostContext } from "../providers";

export const useProvideAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const user = jwt(userToken);
        console.log("fetch friends called");
        const response = await fetchUserFriends();
        console.log("friends response", response);
        let friends = [];
        if (response.success) {
          console.log("Fr", response.data.friends);
          friends = response.data.friends;
        }
        console.log("arrfr", friends);
        console.log("UserInUseProv", user);
        setUser({
          ...user,
          friends,
        });
        console.log("after UserInUseProv", user);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      console.log("auth:", response);
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  // const updateUserFriends = (addFriend, friend) => {
  //   console.log('inside updatUserFriends');
  //   if (addFriend) {
  //     console.log('inside if');
  //     console.log('u1',user);
  //     setUser({
  //       ...user,
  //       friends: [...user.friends, friend],
  //     });
  //     console.log('u2',user);
  //     return;
  //   }
  //   console.log('inside else');
  //   const newFriends = user.friends.filter(
  //     (f) => f.to_user._id !== friend.to_user._id
  //   );

  //   setUser({
  //     ...user,
  //     friends: newFriends,
  //   });
  // };
  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );

    setUser({
      ...user,
      friends: newFriends,
    });
  };
  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  // const updateUser = async (userId, name, password, confermPassword) => {
  //   console.log(
  //     `Edit Data : ${userId} , ${name} ,${password} , ${confermPassword}`
  //   );
  //   const response = await editProfile(userId, name, password, confermPassword);

  //   console.log("respnse", response);
  //   if (response.success) {
  //     setUser(response.data.user);
  //     return {
  //       success: true,
  //     };
  //   } else {
  //     return {
  //       success: false,
  //       message: response.message,
  //     };
  //   }
  // };

  const updateUser = async (userId, name, password, confirmPassword) => {
    // console.log(`Edit Data : ${userId} , ${name} ,${password} , ${confirmPassword}`);
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log("response", response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  return {
    user,
    login,
    logout,
    signup,
    loading,
    updateUser,
    updateUserFriends,
  };
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export const usePosts = () => {
  return useContext(PostContext);
};
export const useProvidePost = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
      console.log("response", response);
    };
    fetchPosts();
  }, []);
  const addPostToState = (post) => {
    console.log("addPostToState called!", post);
    const newPosts = [post, ...posts];
    setPosts(newPosts);
    console.log(posts);
  };
  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    console.log("np", newPosts);
    setPosts(newPosts);
  };
  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
