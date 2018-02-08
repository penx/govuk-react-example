import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button, Checkbox, GridCol, GridRow, InputField, LabelText, Layout, MultiChoice, TextArea, Radio, Select } from 'govuk-react';
import PropTypes from 'prop-types';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : 'Required');

const RadioGroup = ({
  label, hint, options, inline, input, meta,
}) => (
  <div>
    <MultiChoice label={label} hint={hint} meta={meta}>
      {options.map(o => (
        <div key={o.value}>
          <Radio
            {...input}
            value={o.value}
            inline={inline}
            checked={o.value === input.value}
          >
            {o.title}
          </Radio>
        </div>
      ))}
    </MultiChoice>
  </div>
);

RadioGroup.defaultProps = {
  input: {},
  meta: {},
  hint: undefined,
  inline: false,
  options: {},
};

RadioGroup.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  inline: PropTypes.bool,
  options: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
};

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
      <GridRow>
        <GridCol>
          <Field
            name="lastName"
            component={InputField}
            validate={required}
          >
            Last name
          </Field>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Field
            name="likesAnimals"
            label="Do you like animals?"
            hint="You must tell us"
            component={RadioGroup}
            options={[
              { title: 'Yep', value: 'yes' },
              { title: 'Nope', value: 'no' },
            ]}
            validate={required}
            inline
          />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <LabelText>What types of sauces do you like?</LabelText>
          <Field
            name="sauces"
            component={Checkbox}
            value="Tomato"
            type="checkbox"
          >
            Tomato
          </Field>
          <Field
            name="sauces"
            component={Checkbox}
            value="Soy"
            type="checkbox"
          >
            Soy
          </Field>
          <Field
            name="sauces"
            component={Checkbox}
            value="Mint"
            type="checkbox"
          >
            Mint
          </Field>
          <Field
            name="sauces"
            component={Checkbox}
            value="Mustard"
            type="checkbox"
          >
            Mustard
          </Field>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Field
            name="colour"
            label="Favourite colour"
            component={Select}
            validate={required}
          >
            <option />
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
          </Field>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Field
            name="description"
            component={TextArea}
            validate={required}
            hint="Any other information you want to provide"
          >
            Description
          </Field>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Button type="submit" disabled={submitting}>
            Log In
          </Button>
        </GridCol>
        <GridCol>
          <Button onClick={reset} disabled={submitting || pristine}>
            Reset
          </Button>
        </GridCol>
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
