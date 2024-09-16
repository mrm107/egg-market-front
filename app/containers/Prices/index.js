/**
 *
 * Prices
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { makeSelectPrices } from './selectors';
import reducer from './reducer';
import messages from './messages';
import { bindActionCreators, compose } from 'redux';
import * as pricesActions from '../Prices/actions';
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
  Label, Card, Table,
} from 'semantic-ui-react';
import * as RootSelectors from '../Root/selectors';
import _ from 'lodash';
import ReactGA from 'react-ga';

export class Prices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      prices: undefined,
      loading: false,
      date: 0,
    };

    this.getPrices = this.getPrices.bind(this);
    this.doFilter = this.doFilter.bind(this);
    this.goNextDay = this.goNextDay.bind(this);
    this.goPrevDay = this.goPrevDay.bind(this);

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    this.getPrices();
    this.countdown = setInterval(this.getPrices, 30000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      prices: [...this.state.prices || []],
    });
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  getPrices() {
    this.setState({
      loading: true,
    }, () => this.props.getPrices({
      date: this.state.date,
    }));
  }

  doFilter() {
    this.setState({
      prices: undefined,
    }, this.getPrices);
  }

  goNextDay() {
    const { date } = this.state;
    let nextDay = date + 1;
    if(nextDay > 0) {
      nextDay = 0;
    }
    this.setState({ date: nextDay }, this.doFilter);
  }

  goPrevDay() {
    const { date } = this.state;
    const prevDay = date - 1;
    this.setState({ date: prevDay }, this.doFilter);
  }

  render() {
    const { prices } = this.props;

    const { date, loading } = this.state;

    const {
      resources, cities, weights, price_list: priceList, list_title
    } = prices || [];

    return (
      <Fragment>
        <style>
          {`
            .ui.divided.grid:not([class*="vertically divided"])>.column:not(.row), .ui.divided.grid:not([class*="vertically divided"])>.row>.column {
              box-shadow: 1px 0 0 0 rgba(34,36,38,.15);
            }
            .ui.celled.table tr td, .ui.celled.table tr th {
              border-left: 0px !important;
              border-right: 1px solid rgba(34,36,38,.1) !important;
              text-align:center !important;
              direction: ltr !important;
            }
            .ui.celled.table tr td:first-child, .ui.celled.table tr th:first-child {
              border-right: 0px !important;
            }
            .middle-header-cell-for-price {
              border-top: 1px solid rgba(34,36,38,.1);
              border-radius: 0 !important;
            }
          `}
        </style>
        <Helmet>
          <title>اگمارکت | قیمت روز</title>
          <meta
            name="description"
            content="قیمت روزانه ی تخم مرغ | جستجو از میان ۱۰ هزارآگهی روزانه در سامانه جستجو و اعلام آگهی اگمارکت از همه ی نقاط ایران"
          />
        </Helmet>
        <Grid stackable style={{ paddingTop: '0px' }}>
          <Grid.Row>
            <Grid.Column width={5}>
              <Segment>
                <Grid verticalAlign="middle" textAlign="center" columns="equal">
                  <Grid.Column>
                    <Button icon="right arrow" onClick={this.goNextDay} />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    {!loading && prices ? list_title : '...'}
                  </Grid.Column>
                  <Grid.Column>
                    <Button icon="left arrow" onClick={this.goPrevDay} />
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              {!loading && prices
                ? priceList.length === 0
                  ? (
                    <Segment placeholder textAlign="center">
                      <Header icon>
                        <Icon name="search" /><br />
                        قیمتی برای این روز وجود ندارد.
                      </Header>
                    </Segment>
                  )
                  : (
                    resources.map((resource) => (
                      <Card fluid key={Math.random()}>
                        <Card.Content>
                          <Card.Header>{resource.title}</Card.Header>
                          {resource.description && <Card.Description>{resource.description}</Card.Description>}
                        </Card.Content>
                        <Card.Content extra>
                          <Table compact attached celled unstackable size="small">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  وزن
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                  قیمت<br />اول
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                  قیمت<br />دوم
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                  قیمت<br />نهایی
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {weights.map((weight) =>
                                priceList.filter((item) => item.type === 'weight' && item.type_id === weight.id && item.resource === resource.id).map((price, index) => (
                                  <Table.Row key={Math.random()}>
                                    <Table.Cell><Header as="h5">{weight.title}</Header></Table.Cell>
                                    <Table.Cell>{price.price_1}</Table.Cell>
                                    <Table.Cell>{price.price_2}</Table.Cell>
                                    <Table.Cell>{price.price_final}</Table.Cell>
                                  </Table.Row>
                                )))}
                            </Table.Body>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell className="middle-header-cell-for-price">
                                  شهر
                                </Table.HeaderCell>
                                <Table.HeaderCell className="middle-header-cell-for-price">
                                  قیمت<br />اول
                                </Table.HeaderCell>
                                <Table.HeaderCell className="middle-header-cell-for-price">
                                  قیمت<br />دوم
                                </Table.HeaderCell>
                                <Table.HeaderCell className="middle-header-cell-for-price">
                                  قیمت<br />نهایی
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {cities.map((city) =>
                                priceList.filter((item) => item.type === 'city' && item.type_id === city.id && item.resource === resource.id).map((price, index) => (
                                  <Table.Row key={Math.random()}>
                                    <Table.Cell><Header as="h5">{city.title}</Header></Table.Cell>
                                    <Table.Cell>{price.price_1}</Table.Cell>
                                    <Table.Cell>{price.price_2}</Table.Cell>
                                    <Table.Cell>{price.price_final}</Table.Cell>
                                  </Table.Row>
                                )))}
                            </Table.Body>
                          </Table>
                        </Card.Content>
                      </Card>
                    ))
                  )
                : <Loader active />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

Prices.propTypes = {
  getPrices: PropTypes.func.isRequired,
  prices: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  prices: makeSelectPrices(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPrices: bindActionCreators(pricesActions.getPricesAction, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'prices',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(Prices);
