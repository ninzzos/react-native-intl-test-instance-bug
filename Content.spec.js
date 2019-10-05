import React from 'react';
import Component from './Content';
import {IntlProvider} from 'react-intl';
import {isArray, isString, chain} from 'lodash';
import {render} from 'react-native-testing-library';

import 'intl';
import 'intl-pluralrules';
import 'intl/locale-data/jsonp/en';
import '@testing-library/jest-native/extend-expect';

const renderWithIntl = component =>
  render(component, {
    wrapper: ({children}) => (
      <IntlProvider locale="en">{children}</IntlProvider>
    ),
  });

const getIntlText = child => {
  if (!child) {
    return '';
  }

  if (isString(child)) {
    return child;
  }

  const grandkid = renderWithIntl(child);
  const nextValue = grandkid.toJSON();

  return getIntlText(nextValue);
}

expect.extend({
  /*
   * using a custom matcher that recursively renders Intl components
   * yields the expected result, using the regular "toHaveTextContent"
   * which only looks for the children of a test instance will skip
   * the Intl components as they are not rendered
   */
  toHaveIntlTextContent: (element, expectedResult) => {
    const actualResult = chain(element)
      .get(['props', 'children'])
      .thru(child => (isArray(child) ? child : [child]))
      .map(getIntlText)
      .join('')
      .value();

    const pass = actualResult === expectedResult;

    return {
      pass,
      message: () =>
        pass
          ? `text content should not equal "${actualResult}"`
          : `text content should be "${expectedResult}", not "${actualResult}"`,
    };
  },
});

const props = {
  guests: 1,
  nights: 1,
  price: 5000,
};

describe('Content', () => {
  it('Should render regular text element', () => {
    const {getByTestId} = renderWithIntl(<Component {...props} />);

    const regularText = getByTestId('Regular.Text');

    expect(regularText).toHaveTextContent('Regular Text');
  });

  it('should render a formatted singular', () => {
    const {getByTestId} = renderWithIntl(<Component {...props} />);

    const intlText = getByTestId('Intl.Text');

    expect(intlText).toHaveIntlTextContent('1 Night - 1 Adult');
  });

  it('should render a formatted singular and a formatted plural', () => {
    const {getByTestId} = renderWithIntl(<Component {...props} guests={2} />);

    const intlText = getByTestId('Intl.Text');

    expect(intlText).toHaveIntlTextContent('1 Night - 2 Adults');
  });

  it('should render two formatted plurals', () => {
    const {getByTestId} = renderWithIntl(<Component nights={2} guests={2} />);

    const intlText = getByTestId('Intl.Text');

    expect(intlText).toHaveIntlTextContent('2 Nights - 2 Adults');
  });

  it('should render a formatted number', () => {
    const {getByTestId} = renderWithIntl(<Component {...props} />);

    const intlText = getByTestId('Other.Intl.Text');

    expect(intlText).toHaveIntlTextContent('5,000');
  })
});
