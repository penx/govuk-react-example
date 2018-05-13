import React from 'react';
import PropTypes from 'prop-types';

import { Form, Field } from 'react-final-form';
import {
  asAnchor,
  DateInput,
  InputField,
  Breadcrumb,
  Header,
  TextArea,
  Select,
  PhaseBanner,
  Button,
} from 'govuk-react';

import CrownIcon from '@govuk-react/icon-crown';

import TopNav from '@govuk-react/top-nav';

import { BREAKPOINTS } from '@govuk-react/constants';

import styled from 'react-emotion';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : 'Required');

const Layout = styled('div')({
  minWidth: BREAKPOINTS.SMALLSCREEN,
  boxSizing: 'border-box',
  maxWidth: '960px',
  margin: '0 auto',
});

const ButtonGroup = styled('div')({
  display: 'flex',
});

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const AnchorTag = asAnchor('a');

const App = () => (
  <React.Fragment>
    <TopNav company={
      <TopNav.IconTitle
        icon={<CrownIcon width="36" height="32" />}
      >
        GOV.UK
      </TopNav.IconTitle>}
    />
    <Layout>
      <PhaseBanner level="alpha">This is an example usage of govuk-react</PhaseBanner>
      <Breadcrumb>
        <AnchorTag href="/">Home</AnchorTag>
        <AnchorTag href="/examples">Example</AnchorTag>
      </Breadcrumb>
      <Header>Example</Header>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit, reset, submitting, pristine, values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              component={InputField}
              validate={required}
            >
              First name
            </Field>
            <Field
              name="lastName"
              component={InputField}
              validate={required}
            >
              Last name
            </Field>
            <DateInput hintText="For example, dd mm yyyy">
              What is your date of birth?
            </DateInput>
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
            <Field
              name="description"
              component={TextArea}
              validate={required}
              hint="Any other information you want to provide"
            >
              Description
            </Field>
            <ButtonGroup>
              <Button type="submit" disabled={submitting}>
                Register
              </Button>
              <Button onClick={reset} disabled={submitting || pristine}>
                Reset
              </Button>
            </ButtonGroup>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>)}
      />
    </Layout>

  </React.Fragment>
);

export default App;
