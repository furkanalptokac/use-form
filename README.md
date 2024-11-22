# @furkanalptokac/use-form

A form hook that manages your form's states, changes, errors. (All you need.)

## Installation

You can use Yarn

```
yarn add @furkanalptokac/use-form
```

or npm

```
npm install @furkanalptokac/use-form
```

## Usage

Here's a sample implementation.

```ts
import React from 'react';
import { useForm } from '@furkanalptokac/use-form';

type FormType = {
  title: string;
  description: string;
}

const validationRules = {
  title: (value: string) => {
    if (value === undefined) {
      return 'Enter a title';
    }
    if (value.length < 2) {
      return 'Value length must greater than 1';
    }
    return '';
  },
  description: (value: string) => {
    if (value === undefined) {
      return 'Enter a description';
    }
    if (value.length < 2) {
      return 'Description length must greater than 1';
    }
    return '';
  }
}

const App: React.FC = () => {
  const initialState = {
    title: '',
    description: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm<FormType>(
    initialState,
    validationRules,
  );

  const createPost = () => {
    console.log('Post created with', values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(createPost)}>
        <div>
          <div>
            <label htmlFor='title'>
              Title
            </label>
            <input
              id='title'
              name='title'
              type='text'
              placeholder='Title'
              onChange={handleChange}
            ></input>
            {errors.title && <span>{errors.title}</span>}
          </div>
          <label htmlFor='description'>
            Description
          </label>
          <input
            id='description'
            name='description'
            type='text'
            placeholder='Description'
            onChange={handleChange}
          ></input>
          {errors.description && <span>{errors.description}</span>}
        </div>
        <button type='submit'>
          Post
        </button>
      </form>
    </>
  );
}

export default App;
```

## License

[MIT](LICENSE).
