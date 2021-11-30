import React from 'react';
import ActivityList from '../components/ActivityList';
import ActivityForm from '../components/ActivityForm';
import FriendList from '../components/FriendList';
import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ACTIVITIES, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ACTIVITIES);
  const { data:userData } = useQuery(QUERY_ME_BASIC)
  const activities = data?.activities || [];
  const food = data?.food || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ActivityForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
            <ActivityList activities={activities} title="Some Feed for Thought(s)..." />
            <FoodList food={food} />
            <ActivityForm />
            <FoodForm />
            </div>
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
