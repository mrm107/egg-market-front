import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import DownloadPage from '../index';
import messages from '../messages';

describe('<DownloadPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<DownloadPage />);
    expect(renderedComponent.contains(<FormattedMessage {...messages.header} />)).toEqual(true);
  });
});
