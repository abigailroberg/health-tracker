import React from 'react';
import { Link } from 'react-router-dom';

const FoodList = ({ food, title }) => {
  if (!food.length) {
    return <h3>No foods yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {food &&
        food.map(food => (
          <div key={food._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${food.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {food.username}
              </Link>{' '}
              food on {food.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/food/${food._id}`}>
                <p>{food.type}</p>
                <p className="mb-0">
                  {/*comments*/}
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FoodList;