import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import TermsPage from '../index';
import messages from '../messages';

describe('<TermsPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<TermsPage />);
    expect(renderedComponent.contains(<FormattedMessage {...messages.header} />)).toEqual(true);
  });
});
