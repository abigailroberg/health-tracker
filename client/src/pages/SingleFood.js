import React from 'react';
import { useParams } from 'react-router-dom';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

// import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_FOOD } from '../utils/queries';

const SingleFood = props => {
  const { id: foodId } = useParams();

  const { loading, data } = useQuery(QUERY_FOOD, {
    variables: { id: foodId }
  });

  const food = data?.food || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {food.username}
          </span>{' '}
          food on {food.createdAt}
        </p>
        <div className="card-body">
          <p>{food.type}</p>
        </div>
      </div>
      {/* change to comments */}
      {/* {food.commentCount > 0 && <CommentList comment={food.comment} />}

      {Auth.loggedIn() && <CommentForm foodId={food._id} />} */}
    </div>
  );
};

export default SingleFood;