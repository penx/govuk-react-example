import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button, Checkbox, FileUpload, GridCol, GridRow, InputField, Layout, MultiChoice, TextArea, Radio, Select } from 'govuk-react';
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
        <Radio
          key={o.value}
          {...input}
          value={o.value}
          inline={inline}
          checked={o.value === input.value}
        >
          {o.title}
        </Radio>
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

class CheckboxGroup extends React.Component {
  static defaultProps = {
    hint: undefined,
  };

  static propTypes = {
    hint: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  };

  field = ({
    input, meta, label, hint, options,
  }) => {
    const { name, onChange } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({ title, value }) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
        console.log('event.target.checked',event.target.checked);
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <Checkbox
          key={value}
          value={value}
          checked={checked}
          onChange={handleChange}
        >
          {title}
        </Checkbox>
      );
    });

    return (
      <MultiChoice label={label} hint={hint} meta={meta} >
        {checkboxes}
      </MultiChoice>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}

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
          <CheckboxGroup
            name="sauces"
            label="What sauces do you like?"
            hint="come get some sauce"
            validate={required}
            options={[
            { title: 'Tomato', value: 'tomato' },
            { title: 'Soy', value: 'soy' },
            { title: 'Mint', value: 'mint' },
            { title: 'Mustard', value: 'mustard' },
          ]}
          />
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
          <Field
            name="group1"
            acceptedFormats=".jpg, .png"
            hintText="This can be in either JPG or PNG format"
            label="Upload a photo"
            component={FileUpload}
            validate={required}
          />
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
