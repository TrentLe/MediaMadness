import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import Left from '../components/left/left';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [followed, setFollowed] = useState([]);
  const [bio, setBio] = useState('');

  const handleFollow = (user) => {
    setFollowed([...followed, user]);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="">
      
      <div className="">
   

        <h2 className="">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <button onClick={() => handleFollow(user)}>Follow {user.username}</button>
        
        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
            <h3>Biography:</h3>
            <textarea
              placeholder="Type your bio here..."
              value={bio}
              onChange={handleBioChange}
              rows={5}
            />
          </div>
        
        )}
      </div>
    </div>
  );
};

export default Profile;
