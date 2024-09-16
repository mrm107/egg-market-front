/**
 *
 * MyLoads
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
import { makeSelectMyLoads, makeSelectMyLoadsData, makeSelectLoadsStats } from './selectors';
import reducer from './reducer';
import messages from './messages';
import * as MyLoadsActions from './actions';
import * as RootActions from '../Root/actions';
import * as RootSelector from '../Root/selectors';
import * as RouterConst from '../../utils/RouterConsts';
import jalaali from 'jalaali-js';
import {
  Dropdown,
  Grid,
  Segment,
  Input,
  Form,
  Button,
  Divider,
  Loader,
  Icon,
  Header,
  Label, Menu as SemanticMenu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadCards from '../LoadCards';
import ReactGA from 'react-ga';


export class MyLoads extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loads: undefined,
      lastID: undefined,
      hasMore: true,
      moreLoadsLoading: false,
    };

    this.getLoads = this.getLoads.bind(this);
    this.callBackDeleteLoad = this.callBackDeleteLoad.bind(this);

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    this.getLoads();
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.loads === 'object' && nextProps.loads.length === 0) {
      this.setState({
        hasMore: false,
        moreLoadsLoading: false,
        loads: [...this.state.loads || []],
      });
    } else if (this.props.loads !== nextProps.loads) {
      const loads = nextProps.loads;
      this.setState({
        loads: [...this.state.loads || [], ...loads],
        lastID: loads[loads.length - 1].loadID,
        moreLoadsLoading: false,
      });
    }
  }

  getLoads() {
    this.setState({
      moreLoadsLoading: true,
    }, () => this.props.getLoads(this.state.lastID));
  }

  callBackDeleteLoad() {
    this.setState({
      loads: undefined,
      lastID: undefined,
      hasMore: true,
    }, this.getLoads);
  }

  render() {
    if (this.props.tokenStatus && this.props.tokenStatus !== 200) {
      this.props.history.push(RouterConst.LOGIN + RouterConst.MY_LOADS);
    }

    return (
      <Fragment>
        <style>
          {`

          `}
        </style>
        <Helmet>
          <title>اگمارکت | آگهی های من</title>
          <meta
            name="description"
            content="جستجو از میان ۱۰ هزارآگهی روزانه در سامانه جستجو و اعلام آگهی اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Segment stacked>
                آگهی های من
              </Segment>
              {/*<Link to={RouterConst.SUBMIT_LOAD}>*/}
              {/*<Button fluid color='yellow' size='large' color="yellow">ثبت آگهی رایگان</Button>*/}
              {/*</Link>*/}
            </Grid.Column>
            <Grid.Column width={11}>
              {this.state.loads
                ? !!!this.state.loads.length
                  ? (
                    <Segment placeholder textAlign="center">
                      <Header icon>
                        <Icon name='plus' /><br />
                        شما تا به حال آگهی ای ثبت نکرده اید؟! ثبت آگهی در اگمارکت کاملا رایگان و پر بازده است. میتوانید امتحان کنید.
                      </Header>
                      <br />
                      <Link to={RouterConst.SUBMIT_LOAD}>
                        <Button fluid color='yellow' size='large' color="yellow">ثبت آگهی رایگان</Button>
                      </Link>
                    </Segment>
                  )
                  : (
                    <Grid stackable columns={1}>{
                      this.state.loads.map((load) => (
                        <LoadCards
                          key={load.loadID}
                          load={load}
                          type="my-load"
                          callBackDeleteLoad={this.callBackDeleteLoad}
                        />
                      ))
                    }</Grid>
                  )
                : <Loader active />
              }
              {this.state.hasMore && !!this.state.loads
                && <Button
                  fluid
                  color="yellow"
                  onClick={this.getLoads}
                  content="مشاهده آگهی های بیشتر"
                  style={{
                    margin: '30px 0px',
                    height: '50px',
                  }}
                  loading={this.state.moreLoadsLoading}
                  disabled={this.state.moreLoadsLoading}
                />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

MyLoads.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  getLoads: PropTypes.func.isRequired,
  tokenStatus: PropTypes.number,
  loads: PropTypes.array,
  provinces: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  myloads: makeSelectMyLoads(),
  tokenStatus: RootSelector.makeSelectTokenResponse(),
  loads: makeSelectMyLoadsData(),
  provinces: RootSelector.makeSelectProvinces(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLoads: bindActionCreators(MyLoadsActions.getMyLoadsData, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'myLoads',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(MyLoads);
