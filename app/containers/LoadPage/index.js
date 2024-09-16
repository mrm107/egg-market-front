/**
 *
 * LoadPage
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
import { makeSelectLoadPage, makeSelectLoadData } from './selectors';
import reducer from './reducer';
import * as LoadPageActions from './actions';
import LoadCards from '../LoadCards/index';
import messages from './messages';
import { Grid, Header, Icon, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LIST } from '../../utils/RouterConsts';
import ReactGA from 'react-ga';


export class LoadPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  currentLoadId;

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loadData: undefined,
    };
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentWillMount() {
    const loadID = location.pathname.split('/')[2];
    this.currentLoadId = loadID;
    const param = {
      loadID,
    };
    this.props.getLoadData(param);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loads) {
      const loads = this.props.loads;
      const currentLoad = this.currentLoadId;
      const loadData = loads.get(currentLoad);
      this.setState({
        loadData,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>اگمارکت | مشاهده آگهی</title>
          <meta
            name="description"
            content="جستجو از میان ۱۰ هزارآگهی روزانه در سامانه جستجو و اعلام آگهی اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable style={{ direction: 'rtl' }}>
          <Grid.Row>
            <Grid.Column width={5}>
              <Segment stacked>
                مشاهده آگهی
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              {this.renderData()}
              <Button
                fluid
                size='large'
                as={Link}
                to={LIST}
                color="yellow"
                style={{
                  height: '100px',
                  lineHeight: '70px',
                  marginTop: '50px',
                }}
              >جستجو و مشاهده ی آگهی های دیگر</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }

  renderData() {
    const loadData = this.state.loadData;
    if (!loadData) return null;
    if (loadData.loadID) return this.renderLoadData(loadData);
    return this.renderNotFoundMessage();
  }

  renderNotFoundMessage() {
    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name='search' /><br />
          آگهی ای با این ویژگی ها از میان 10,000 آگهی امروز پیدا نشد.
        </Header>
        <br />
        احتمالا دارد این آگهی فروخته شده باشد.
      </Segment>
    );
  }

  renderLoadData(load) {
    return (<LoadCards
      key={load.loadID}
      load={load}
    />);
  }
}

LoadPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getLoadData: PropTypes.func.isRequired,
  loads: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loadpage: makeSelectLoadPage(),
  loads: makeSelectLoadData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLoadData: bindActionCreators(LoadPageActions.getLoad, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'loadPage',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(LoadPage);
