import React, { useState, useEffect } from 'react';
import isUrl from 'isurl';
//* Our various rules for validation live here
const validationRules = values => {
  let errors = {};
  if (!values.url) {
    errors.url = 'Url is required';
  }
  if (!values.title) {
    errors.title = 'Title is required';
  }

  try {
    new URL(values.url);
  } catch (error) {
    errors.urlFormat = 'URL must be in http://www.domain.com format';
  }

  return errors;
};

const useEditForm = (bookmark, callback, validation) => {
  const [inputs, setInputs] = useState({
    url: bookmark.url,
    desc: bookmark.desc,
    rating: bookmark.rating,
    title: bookmark.title,
  });

  const [inputErrors, setInputErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      setInputErrors(validation(inputs));
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmitting) {
      callback(bookmark._id, inputs);
    }
  }, [inputErrors]);

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
    inputErrors,
  };
};

export { useEditForm, validationRules };
