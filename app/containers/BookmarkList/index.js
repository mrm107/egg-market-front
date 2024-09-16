/**
 *
 * BookmarkList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import messages from './messages';
import { makeSelectBookmarks, makeSelectBookmarkList } from './selectors';
import * as bookmarkListAction from './actions';
import LoadCards from '../LoadCards/index';
import * as RouterConst from '../../utils/RouterConsts';
import * as RootSelectors from '../Root/selectors';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LIST } from '../../utils/RouterConsts';
import ReactGA from 'react-ga';

export class BookmarkList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    this.props.getBookmarks();
  }

  render() {
    if (this.props.tokenCheck && this.props.tokenCheck !== 200) {
      this.props.history.push(`${RouterConst.LOGIN}${RouterConst.BOOKMARKS}`);
    }
    const loads = this.props.bookmarks;
    return (
      <div>
        <Helmet>
          <title>اگمارکت | نشان شده ها</title>
          <meta name="description" content="Description of List" />
        </Helmet>
        {this.renderLoads(loads)}
      </div>
    );
  }

  renderLoads(loads) {
    if (!loads) return null;

    return (
      <Fragment>
        <style>
          {`
            .rc-cascader-menu-item-expand-icon {
              left: 16px;
              right: auto;
            }
            .rc-cascader-menu-item-expand {
              padding-left: 30px;
            }
            .rc-cascader-menu {
              width: 150px;
            }
        `}
        </style>
        <Helmet>
          <title>اگمارکت | آگهی های نشان شده</title>
          <meta
            name="description"
            content="جستجو از میان ۱۰ هزارآگهی روزانه در سامانه جستجو و اعلام آگهی اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Segment stacked>
                لیست آگهی های نشان شده.
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              {loads.length !== 0
                ? loads.map((load) => {
                  const loadWraper = load;
                  loadWraper.id = load.loadID;
                  return (<LoadCards
                    key={load.loadID}
                    load={load}
                  />);
                }) : <Segment placeholder textAlign="center">
                  <Header icon>
                    <Icon name='pin' /><br />
                    هیچ آگهی ای را نشان نکرده اید!
                  </Header>
                  <br />
                  از دکمه نشان کردن در زیر هر آگهی برای جدا کردن آن از بقیه استفاده کنید.
                </Segment>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

BookmarkList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  getBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.array,
  tokenCheck: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  bookmarklist: makeSelectBookmarkList(),
  bookmarks: makeSelectBookmarks(),
  tokenCheck: RootSelectors.makeSelectTokenResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBookmarks: bindActionCreators(bookmarkListAction.getBookmarks, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'bookmarkList',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(BookmarkList);
