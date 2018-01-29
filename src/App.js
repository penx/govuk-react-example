import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button, InputField, Layout, GridRow, GridCol } from 'govuk-react';

// based on https://codesandbox.io/s/40mr0v2r87
// const DateInputAdapter = ({ input, meta, ...rest }) => (
//   <DateInput
//     {...input}
//     {...rest}
//     onChange={(event, value) => input.onChange(value)}
//     errorText={meta.touched ? meta.error : ''}
//   />
// );

// const InputFieldAdapter = ({
//   children, input, meta, ...rest
// }) => (
//   <InputField
//     {...input}
//     {...rest}
//     onChange={(event) => {
//       console.log(event);
//       input.onChange(event.target.value);
//     }}
//     errorText={meta.touched ? meta.error : ''}
//   >
//     {children}
//   </InputField>
// );

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : 'Required');


const App = () => (
  <div>
    <Form
      onSubmit={onSubmit}
      render={({
 handleSubmit, reset, submitting, pristine, values,
}) => (
  <form onSubmit={handleSubmit}>
    <Layout>
      <GridRow>
        <GridCol>
          <Field
            name="firstName"
            component={InputField}
            validate={required}
          >
            First name
          </Field>
        </GridCol>
      </GridRow>
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
      <GridRow>
        <GridCol columnOneQuarter>
          <Button type="submit" disabled={submitting}>
            Log In
          </Button>
        </GridCol>
        <GridCol columnOneQuarter>
          <Button onClick={reset} disabled={submitting || pristine}>
            Reset
          </Button>
          {/* <button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}>
            Reset
          </button> */}
        </GridCol>
        <GridCol columnOneQuarter />
        <GridCol columnOneQuarter />
      </GridRow>
      <GridRow>
        <GridCol>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </GridCol>
      </GridRow>
    </Layout>
  </form>
      )}
    />
  </div>
);

export default App;
