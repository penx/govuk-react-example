import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  asAnchor,
  asPaginationItem,
  BackLink,
  Breadcrumb,
  Button,
  Checkbox,
  DateInput,
  FileUpload,
  GridCol,
  GridRow,
  Header,
  InputField,
  Layout,
  ListItem,
  ListNavigation,
  MultiChoice,
  Pagination,
  PhaseBanner,
  Radio,
  SearchBox,
  Select,
  TextArea,
  UnorderedList,
} from 'govuk-react';

import PropTypes from 'prop-types';

const AnchorTag = asAnchor('a');
const PaginationTag = asPaginationItem('a');
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
    const { onChange } = input;
    const inputValue = input.value;

    const checkboxes = options.map(({ title, value }) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
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
    <Layout>
      <GridRow>
        <GridCol>
          <Header>GovUK React example</Header>
          <Header level="5">Navigation:</Header>
          <ListNavigation>
            <AnchorTag href="#backLink">Back link</AnchorTag>
            <AnchorTag href="#breadcrumbs">Breadcrumbs</AnchorTag>
            <AnchorTag href="#buttons">Buttons</AnchorTag>
            <AnchorTag href="#pagination">Pagination</AnchorTag>
            <AnchorTag href="#phaseBanner">Phase Banners</AnchorTag>
            <AnchorTag href="#searchBox">Search box</AnchorTag>
            <AnchorTag href="#unorderedList">Unordered list</AnchorTag>
            <AnchorTag href="#formfields">Form fields</AnchorTag>
            <ListNavigation>
              <AnchorTag href="#input_type_text">Input type=text</AnchorTag>
              <AnchorTag href="#input_type_radio">Input type=radio</AnchorTag>
              <AnchorTag href="#input_type_checkbox">Input type=checkbox</AnchorTag>
              <AnchorTag href="#input_type_file">Input type=file</AnchorTag>
              <AnchorTag href="#dateInput">Date input</AnchorTag>
              <AnchorTag href="#select_dropdown">Select dropdown</AnchorTag>
              <AnchorTag href="#textarea">Textarea</AnchorTag>
            </ListNavigation>
          </ListNavigation>
          <hr />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="backLink" level="2">Back link</Header>
          <BackLink>Back to example.com</BackLink>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="breadcrumbs" level="2">Breadcrumbs</Header>
          <Breadcrumb>
            <AnchorTag href="/">Home</AnchorTag>
            <AnchorTag href="/examples">GOV.UK React examples</AnchorTag>
          </Breadcrumb>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="buttons" level="2">Buttons</Header>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Button>Standard button</Button>
        </GridCol>
        <GridCol>
          <Button iconUrl="https://penx.github.io/govuk-react/static/media/icon-pointer.30e6c548.png">Proceed w/icon</Button>
        </GridCol>
        <GridCol>
          <Button start iconUrl="https://penx.github.io/govuk-react/static/media/icon-pointer.30e6c548.png">Start w/icon</Button>
        </GridCol>
        <GridCol>
          <Button start>Start button</Button>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Button disabled>[disabled] Standard button</Button>
        </GridCol>
        <GridCol>
          <Button disabled iconUrl="https://penx.github.io/govuk-react/static/media/icon-pointer.30e6c548.png">[disabled] Proceed w/icon</Button>
        </GridCol>
        <GridCol>
          <Button disabled start iconUrl="https://penx.github.io/govuk-react/static/media/icon-pointer.30e6c548.png">[disabled] Start w/icon</Button>
        </GridCol>
        <GridCol>
          <Button disabled start>[disabled] Start button</Button>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="pagination" level="2">Pagination</Header>
          <Header level="4">Default pagination</Header>
          <Pagination>
            <PaginationTag href="https://example.com" previousPage>
              Previous Page
            </PaginationTag>
            <PaginationTag href="https://example.com" nextPage>
              Next page
            </PaginationTag>
          </Pagination>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header level="4">Pagination with page numbers</Header>
          <Pagination>
            <PaginationTag href="https://example.com" pageTitle="1 of 3" previousPage>
              Previous Page
            </PaginationTag>
            <PaginationTag href="https://example.com" pageTitle="3 of 3" nextPage>
              Next page
            </PaginationTag>
          </Pagination>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header level="4">Pagination with page titles</Header>
          <Pagination>
            <PaginationTag href="https://example.com" pageTitle="Personal details" previousPage>
              Previous
            </PaginationTag>
            <PaginationTag href="https://example.com" pageTitle="Work details" nextPage>
              Next
            </PaginationTag>
          </Pagination>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="phaseBanner" level="2">Phase banners (Alpha/Beta)</Header>
          <PhaseBanner level="alpha">This is part of GOV.UK - This is for internal release.</PhaseBanner>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <PhaseBanner level="beta">This is part of GOV.UK - This may change until a final release is made.</PhaseBanner>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="searchBox" level="2">Search box</Header>
          <SearchBox placeholder="Search GOV.UK">SearchBox example</SearchBox>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="unorderedList" level="2">Unordered list</Header>
          <UnorderedList>
            <ListItem>default disc 1</ListItem>
            <ListItem>default disc 2</ListItem>
          </UnorderedList>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <UnorderedList listStyleType="square">
            <ListItem>default square 3</ListItem>
            <ListItem>default square 4</ListItem>
          </UnorderedList>
        </GridCol>
      </GridRow>
    </Layout>
    <Form
      onSubmit={onSubmit}
      render={({
 handleSubmit, reset, submitting, pristine, values,
}) => (
  <form onSubmit={handleSubmit}>
    <Layout>
      <GridRow>
        <GridCol>
          <Header id="formfields" level="2">Form fields</Header>
          <Header id="input_type_text" level="3">Input type=text</Header>
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
          <Header id="input_type_radio" level="3">Input type=radio</Header>
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
          <Header id="input_type_checkbox" level="3">Input type=checkbox</Header>
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
          <Header id="input_type_file" level="3">Textarea</Header>
          <Field
            name="group1"
            acceptedFormats=".jpg, .png"
            hintText="This can be in either JPG or PNG format"
            label="Upload a photo"
            component={FileUpload}
          />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="dateInput" level="3">Date input</Header>
          <DateInput hintText="For example, dd mm yyyy">
            What is your date of birth?
          </DateInput>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="select_dropdown" level="3">Select dropdown</Header>
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
          <Header id="textarea" level="3">Textarea</Header>
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
