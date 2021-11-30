import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_FOOD } from '../../utils/mutations';
import { QUERY_FOODS, QUERY_ME } from '../../utils/queries';

const FoodForm = () => {
  const [type, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addFood, { error }] = useMutation(ADD_FOOD, {
    update(cache, { data: { addFood } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { foods } = cache.readQuery({ query: QUERY_FOODS });
        cache.writeQuery({
          query: QUERY_FOODS,
          data: { foods: [addFood, ...foods] }
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, foods: [...me.foods, addFood] } }
      });
    }
  });

  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addFood({
        variables: { type }
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Add some foods..."
          value={type}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FoodForm;