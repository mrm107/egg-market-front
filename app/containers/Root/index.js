/**
 *
 * Root
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectRoot,
  makeSelectBookmarkList,
  makeSelectProvinces,
  makeSelectServerTime,
  makeSelectTokenResponse,
} from './selectors';
import reducer from './reducer';
import messages from './messages';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Loader } from 'semantic-ui-react';
import * as RouterConst from '../../utils/RouterConsts';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import List from 'containers/List/Loadable';
import Menu from 'components/Menu/Loadable';
import Footer from 'components/Footer/Loadable';
import BookmarkList from 'containers/BookmarkList/Loadable';
import LoadPage from 'containers/LoadPage/Loadable';
import Profile from 'containers/Profile/Loadable';
import SubmitLoad from 'containers/SubmitLoad/Loadable';
import MyLoads from 'containers/MyLoads/Loadable';
import EditLoad from 'containers/EditLoad/Loadable';
import DownloadPage from 'containers/DownloadPage/Loadable';
import SupportPage from 'containers/SupportPage/Loadable';
import TermsPage from 'containers/TermsPage/Loadable';
import Prices from 'containers/Prices/Loadable';

import * as RootActions from './actions';

export class Root extends React.PureComponent {
  componentWillMount() {
    this.props.getBookmarks();
    this.props.getProvinces();
    this.props.getServerTime();
    this.props.checkToken();

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logout();
  }

  render() {
    const { tokenStatus, serverTime } = this.props;

    return (
      <Router>
        <Container className="main-container">
          <Menu tokenStatus={tokenStatus || 400} onLogout={this.onLogout} />
          {serverTime ? (
            <Switch>
              { /* <Route exact path={RouterConst.INDEX} component={HomePage} /> */}
              <Route exact path={RouterConst.INDEX} component={List} />
              <Route exact path={`${RouterConst.LOGIN}/*`} component={Login} />
              <Route exact path={RouterConst.LOGIN} component={Login} />
              <Route exact path={RouterConst.LIST} component={List} />
              <Route exact path={RouterConst.LIST_ALTERNATIVE} component={List} />
              <Route exact path={RouterConst.BOOKMARKS} component={BookmarkList} />
              <Route exact path={RouterConst.PROFILE} component={Profile} />
              <Route exact path={RouterConst.MY_LOADS} component={MyLoads} />
              <Route exact path={RouterConst.SUBMIT_LOAD} component={SubmitLoad} />
              <Route exact path={RouterConst.EDIT_LOAD} component={EditLoad} />
              <Route exact path={RouterConst.LOADPAGE} component={LoadPage} />
              <Route exact path={RouterConst.LOADPAGE_ALTERNATIVE} component={LoadPage} />
              <Route exact path={RouterConst.NOT_FOUND} component={NotFoundPage} />
              <Route exact path={RouterConst.DOWNLOAD} component={DownloadPage} />
              <Route exact path={RouterConst.SUPPORT} component={SupportPage} />
              <Route exact path={RouterConst.TERMS} component={TermsPage} />
              <Route exact path={RouterConst.PRICES} component={Prices} />
              <Route component={NotFoundPage} />
            </Switch>
          ) : <Loader active />}
          <Footer />
        </Container>
      </Router>
    );
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getProvinces: PropTypes.func.isRequired,
  provinces: PropTypes.array,
  getBookmarks: PropTypes.func.isRequired,
  bookmarkList: PropTypes.array,
  getServerTime: PropTypes.func.isRequired,
  serverTime: PropTypes.number,
  checkToken: PropTypes.func.isRequired,
  tokenStatus: PropTypes.number,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
  provinces: makeSelectProvinces(),
  bookmarkList: makeSelectBookmarkList(),
  serverTime: makeSelectServerTime(),
  tokenStatus: makeSelectTokenResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProvinces: bindActionCreators(RootActions.getProvincesAction, dispatch),
    getBookmarks: bindActionCreators(RootActions.getBookmarks, dispatch),
    getServerTime: bindActionCreators(RootActions.getServerTime, dispatch),
    checkToken: bindActionCreators(RootActions.checkToken, dispatch),
    logout: bindActionCreators(RootActions.logout, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'root',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(Root);
