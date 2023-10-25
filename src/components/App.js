// import { useState } from "react";
import { Home, Login, Page404,Signup,Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "../components";
import { Navigate,Outlet,BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks";
const About = () => {
  return <h1>About</h1>;
};
// const UserInfo = () =>{
//   return <h1>User Info</h1>
//
function PrivateRoute(){
  const auth = useAuth();
  return auth.user? <Outlet /> : <Navigate to='/login'/>
}
function App() {
  // const [loading, setLoading] = useState(true);
  const auth = useAuth();
  if (auth.loading) {
    return <Loader />;
    // return <h1>Loading...</h1>
  }
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<PrivateRoute />} >
            <Route path='/setting' element={<Settings/>} />
          </Route>
          <Route path="/user/:userId" element={<PrivateRoute />} >
            <Route path='/user/:userId' element={<UserProfile/>} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
