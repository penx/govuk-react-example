import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button, InputField } from 'govuk-react';

// based on https://codesandbox.io/s/40mr0v2r87
// const DateInputAdapter = ({ input, meta, ...rest }) => (
//   <DateInput
//     {...input}
//     {...rest}
//     onChange={(event, value) => input.onChange(value)}
//     errorText={meta.touched ? meta.error : ''}
//   />
// );

const InputFieldAdapter = ({
  children, input, meta, ...rest
}) => (
  <InputField
    {...input}
    {...rest}
    onChange={(event, value) => {
      console.log('input hi', input);
      console.log('value', value);
      input.onChange(value);
    }}
    errorText={meta.touched ? meta.error : ''}
  >
    {children}
  </InputField>
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : 'Required');

// InputFieldAdapter.defaultProps = {
//   meta: null,
// };
//
// InputFieldAdapter.propTypes = {
//   input: PropTypes.object.isRequired,
//   meta: PropTypes.object,
// };


const App = () => (
  <div>
    <Form
      onSubmit={onSubmit}
      render={({
 handleSubmit, reset, submitting, pristine, values,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <div>
        <div>
          <Field
            name="drg"
            component={InputFieldAdapter}
            validate={required}
          >
            Name
          </Field>
          {/*  <Field
            name="firstName"
            component="input"
            validate={required} /> */}
        </div>
      </div>
      {/* <div>
        <div>
          <Field
            name="dob"
            component={DateInputAdapter}
            validate={required}
            hintText="31 3 1980"
            labelPosition="right"
          >
          Date of birth
          </Field>
        </div>
      </div> */}
      <div>
        <div>
          <button type="submit" disabled={submitting}>
            Log In
          </button>
        </div>
        <div>
          <Button onClick={reset} disabled={submitting || pristine}>reset x</Button>
          {/* <button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}>
            Reset
          </button> */}
        </div>
        <div />
        <div />
      </div>
      <div>
        <div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </div>
      </div>
    </div>
  </form>
      )}
    />
  </div>
);

export default App;
