// src/App.js
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import AppBar from './components/AppBar.jsx';
import SignIn from './Pages/signin.jsx';
import SignUp from './Pages/signup.jsx';
import Home from './Pages/home.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setUser, clearUser } from './redux/slices/userSlice';
import axios from 'axios';
import { BASE_URL } from './config.js';
import Courses from './Pages/courses.jsx';
import CourseDetails from './Pages/Course.jsx';
import DashBoard from './Pages/DashBoard.jsx';

function App() {
  const dispatch = useDispatch();

  
  //Fetching User Information and Storing It
  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });

        console.log(response.data.userId);
        if (response.data.username) {
          dispatch(setUser({
            userEmail: response.data.username,
            userName: response.data.name,
            userId: response.data.userId
          }));
        } else {
          dispatch(clearUser());
        }
      } catch (e) {
        dispatch(clearUser());
      }
    };

    init();
  }, [dispatch]);

  //Page Router

  return (
    <Provider store={store}>
      <div className="App">
        <AppBar />
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/:courseId' element={<CourseDetails />} />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
