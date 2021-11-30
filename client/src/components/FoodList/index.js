import React from 'react';
import { Link } from 'react-router-dom';

const FoodList = ({ foods, title }) => {
  if (!foods.length) {
    return <h3>No Foods Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {foods &&
        foods.map(food => (
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
                <p>{food.caloricValue}</p>
                <p>{food.details}</p>
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

export default FoodList;