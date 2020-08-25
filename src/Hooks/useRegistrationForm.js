import React, { useState, useEffect } from 'react';

const validationRules = values => {
  let errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.confirmPass) {
    errors.confirmPass = 'Please confirm your password';
  }

  if (values.password !== values.confirmPass) {
    errors.passMatch = 'Passwords must match';
  }

  return errors;
};

const useRegistrationForm = (callback, validation) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirmPass: '',
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
      console.log('running callback');
      callback(inputs);
    } else {
      console.log('errors present');
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

export { useRegistrationForm, validationRules };
