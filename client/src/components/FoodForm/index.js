import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_FOOD } from '../../utils/mutations';
import { QUERY_FOODS, QUERY_ME } from '../../utils/queries';

const FoodForm = () => {
  const [formState, setFormState] = useState({ type: '', caloricValue: '', details: ''});
  const { type, caloricValue, details } = formState

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
    if (event.target.name === 'caloricValue') {
      const calorieInt = parseInt(event.target.value)
      setFormState({ ...formState, [event.target.name]: calorieInt})
    } else {setFormState({ ...formState, [event.target.name]: event.target.value })}
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addFood({
        variables: { ...formState }
      });

      // clear form value
      setFormState({
        type: '',
        caloricValue: '',
        details: ''
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p>
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="What kind of food did you eat?"
          value={type}
          className="form-input col-12 col-md-9"
          name="type"
          onChange={handleChange}
        ></textarea>
        <input
          placeholder="How many calories did you eat?"
          value={caloricValue}
          className="form-input col-12 col-md-9"
          type="number"
          name="caloricValue"
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="More about this meal..."
          value={details}
          className="form-input col-12 col-md-9"
          name="details"
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