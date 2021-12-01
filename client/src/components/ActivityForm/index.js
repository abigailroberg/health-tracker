import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_ACTIVITY } from '../../utils/mutations';
import { QUERY_ACTIVITIES, QUERY_ME } from '../../utils/queries';

const ActivityForm = () => {
  const [formState, setFormState] = useState({ type: '', caloricValue: '', details: ''});
  const { type, caloricValue, details } = formState

  const [addActivity, { error }] = useMutation(ADD_ACTIVITY, {
    update(cache, { data: { addActivity } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { activities } = cache.readQuery({ query: QUERY_ACTIVITIES });
        cache.writeQuery({
          query: QUERY_ACTIVITIES,
          data: { activities: [addActivity, ...activities] }
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, activities: [...me.activities, addActivity] } }
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
    console.log({ ...formState })

    try {
      await addActivity({ 
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
          placeholder="What kind of activity did you do?"
          value={type}
          className="form-input col-12 col-md-9"
          name="type"
          onChange={handleChange}
        ></textarea>
        <input
          placeholder="How many calories did you burn?"
          value={caloricValue}
          className="form-input col-12 col-md-9"
          type="number"
          name="caloricValue"
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="More about this activity..."
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

export default ActivityForm;