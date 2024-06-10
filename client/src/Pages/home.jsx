import React from 'react';

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '90vh' }}>
      <div style={{ flex: '1', textAlign: 'center' }}>
        <h1>Welcome to the Course Site!</h1>
        <p>Learn, Explore, and Grow with Us</p>
      </div>
      <div style={{ flex: '1', textAlign: 'center' }}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/779/389/original/student-woman-with-laptop-studying-on-online-course-online-education-concept-illustration-flat-vector.jpg"
          alt="Course Site Image"
          style={{ height: '100%', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

export default Home;
