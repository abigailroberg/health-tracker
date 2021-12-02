import React from 'react';
import ActivityList from '../components/ActivityList';
import FoodList from '../components/FoodList'
import ActivityForm from '../components/ActivityForm';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ACTIVITIES, QUERY_FOODS, QUERY_ME_BASIC } from '../utils/queries';
import FoodForm from '../components/FoodForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ACTIVITIES);
  const { loading:loadingFood, data:dataFood } = useQuery(QUERY_FOODS)

  const { data:userData } = useQuery(QUERY_ME_BASIC)

  const activities = data?.activities || [];
  const foods = dataFood?.foods || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <h1>Add your Activity!</h1>
            <ActivityForm />
            <h1>Add your Food!</h1>
            <FoodForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ActivityList activities={activities} title="How we're moving!" />
          )}
        </div>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loadingFood ? (
            <div>Loading...</div>
          ) : (
            <FoodList foods={foods} title="How we're fueling!" />
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
