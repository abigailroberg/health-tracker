import React from 'react';
import { useParams } from 'react-router-dom';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

// import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ACTIVITY } from '../utils/queries';

const SingleActivity = props => {
  const { id: activityId } = useParams();

  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: activityId }
  });

  const activity = data?.activity || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {activity.username}
          </span>{' '}
          activity on {activity.createdAt}
        </p>
        <div className="card-body">
          <p>{activity.type}</p>
        </div>
      </div>
      /* change to comments */
      /* {activity.commentCount > 0 && <CommentList comment={activity.comment} />}

      {Auth.loggedIn() && <CommentForm activityId={activity._id} />}
    </div> */
  );
};


export default SingleActivity;
