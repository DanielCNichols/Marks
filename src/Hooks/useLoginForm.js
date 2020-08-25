import React, { useState, useEffect } from 'react';

const validationRules = values => {
  let errors = {};
  if (!values.username) {
    errors.url = 'Username is required';
  }
  if (!values.password) {
    errors.title = 'Password is required';
  }
  return errors;
};

const useLoginForm = (callback, validation) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
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

export { useLoginForm, validationRules };
