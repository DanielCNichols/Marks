import React, { useState, useEffect } from 'react';

//* Our various rules for validation live here
const validationRules = values => {
  let errors = {};
  if (!values.url) {
    errors.url = 'Url is required';
  }
  if (!values.title) {
    errors.title = 'Title is required';
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      setErrors(validation(inputs));
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(inputs);
    }
  }, [errors]);

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
    errors,
  };
};

export { useEditForm, validationRules };
