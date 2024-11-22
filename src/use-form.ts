import { useState } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

const useForm = <T>(initialValues: T, validationRules: ValidationRules<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (name: keyof T, value: T[keyof T]) => {
    const rule = validationRules[name];
    let error = '';
    if (rule) {
      error = rule(value) || '';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    validate(name as keyof T, value as T[keyof T]);
  };

  const handleSubmit = (callback: () => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof T, string>> = {};
    let valid = true;

    Object.keys(validationRules).forEach((key) => {
      const value = values[key as keyof T];
      const rule = validationRules[key as keyof T];
      if (rule) {
        const error = rule(value);
        if (error) {
          newErrors[key as keyof T] = error;
          valid = false;
        }
      }
    });

    setErrors(newErrors);
    if (valid) {
      callback();
    }
  };

  return { values, errors, handleChange, handleSubmit };
};

export {useForm};

