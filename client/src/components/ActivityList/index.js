import React from 'react';
import { Link } from 'react-router-dom';

const ActivityList = ({ activities, title }) => {
  if (!activities.length) {
    return <h3>No activities Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {activities &&
        activities.map(activity => (
          <div key={activity._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${activity.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {activity.username}
              </Link>{' '}
              activity on {activity.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/activity/${activity._id}`}>
                <p>{activity.type}</p>
                <p>{activity.caloricValue}</p>
                <p>{activity.details}</p>
                <p className="mb-0">
                {/* reactions deleted                */}
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ActivityList;