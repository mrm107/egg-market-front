import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import SupportPage from '../index';
import messages from '../messages';

describe('<SupportPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<SupportPage />);
    expect(renderedComponent.contains(<FormattedMessage {...messages.header} />)).toEqual(true);
  });
});
