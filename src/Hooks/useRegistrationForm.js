import { useState, useEffect } from 'react';

const validationRules = values => {
  let errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.confirmPass) {
    errors.confirmPass = 'Please confirm password';
  }

  if (values.password !== values.confirmPass) {
    errors.confirmPass = 'Passwords must match';
  }

  return errors;
};

const useRegistrationForm = (callback, validation) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirmPass: '',
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
      callback(inputs);
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

export { useRegistrationForm, validationRules };
