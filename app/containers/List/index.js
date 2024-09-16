/**
 *
 * List
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { makeSelectList, makeSelectLoads } from './selectors';
import reducer from './reducer';
import messages from './messages';
import { bindActionCreators, compose } from 'redux';
import * as listActions from '../List/actions';
import LoadCards from '../LoadCards/index';
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
  Label,
} from 'semantic-ui-react';
import {
  isMobile
} from "react-device-detect";
import * as RootSelectors from '../Root/selectors';
import _ from 'lodash';
import ReactGA from 'react-ga';
import jalaali from 'jalaali-js';


function dropDownAdaptor(value, text, arrayOfObjects = []) {
  const adaptedData = [];
  arrayOfObjects.map((item) => {
    adaptedData.push({
      key: item[value],
      value: item[value],
      text: item[text],
    });
  });
  return adaptedData;
}

function transformToTree(array, parent) {
  return _.reverse(_.sortBy(_.filter(array, { parent: parent }), ['sort'])).map(item => {
    let children = undefined;
    if (item.parent === '0') {
      children = _.reverse(_.sortBy(_.filter(array, { parent: item.id }), ['sort'])).map(item => {
        return {
          label: item.title,
          value: item.id,
        };
      });
    }
    return {
      label: item.title,
      value: item.id,
      children,
    };
  });
}

export class List extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loads: undefined,
      lastID: undefined,
      hasMore: true,
      moreLoadsLoading: false,
      origins: [],
      types: [],
      pack_types: [],
      yolk_types: [],
      print_types: [],
      qualities: [],
    };

    this.getLoads = this.getLoads.bind(this);
    this.doFilter = this.doFilter.bind(this);

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
    }, () => this.props.getLoads({
      origins: this.state.origins,
      types: this.state.types,
      pack_types: this.state.pack_types,
      yolk_types: this.state.yolk_types,
      print_types: this.state.print_types,
      qualities: this.state.qualities,
      lastID: this.state.lastID,
    }));
  }

  doFilter() {
    this.setState({
      loads: undefined,
      lastID: undefined,
      hasMore: true,
    }, this.getLoads);
  }

  render() {
    const provinces = dropDownAdaptor('id', 'title', this.props.provinces);

    return (
      <Fragment>
        <Helmet>
          <title>اگمارکت | جستجوی آگهی ها</title>
          <meta
            name="description"
            content="جستجو از میان ۱۰ هزارآگهی روزانه در سامانه جستجو و اعلام آگهی اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable style={{ paddingTop: '0px' }}>
          <Grid.Row>
            {!isMobile ? <Grid.Column width={5}>
              <Segment stacked>
                <Form>
                  <Form.Field key="origin">
                    <label className="label">محل</label>
                    <Dropdown
                      placeholder="محل بارگیری ..."
                      fluid
                      multiple
                      selection
                      scrolling
                      closeOnChange
                      options={provinces}
                      onChange={(event, data) => this.setState({ origins: data.value })}
                    />
                  </Form.Field>
                  <Form.Field key="types">
                    <label className="label">نوع آگهی</label>
                    <Dropdown
                      placeholder="درخواست یا اعلام ..."
                      fluid
                      selection
                      scrolling
                      closeOnChange
                      options={[
                        {
                          value: '',
                          text: 'همه',
                        },
                        {
                          value: 'announcement',
                          text: 'اعلام بار',
                        },
                        {
                          value: 'request',
                          text: 'درخواست بار',
                        },
                      ]}
                      onChange={(event, data) => this.setState({ types: [data.value] })}
                    />
                  </Form.Field>
                  <Form.Field key="pack_types">
                    <label className="label">نوع بسته بندی</label>
                    <Dropdown
                      placeholder="فله (شانه ای) یا بسته بندی ..."
                      fluid
                      selection
                      scrolling
                      closeOnChange
                      options={[
                        {
                          value: '',
                          text: 'همه',
                        },
                        {
                          value: 'bulk',
                          text: 'فله (شانه ای)',
                        },
                        {
                          value: 'box',
                          text: 'بسته بندی',
                        },
                      ]}
                      onChange={(event, data) => this.setState({ pack_types: [data.value] })}
                    />
                  </Form.Field>
                  <Form.Field key="yolk_types">
                    <label className="label">نوع زرده</label>
                    <Dropdown
                      placeholder="طلایی، ساده یا ذرتی ..."
                      fluid
                      selection
                      scrolling
                      closeOnChange
                      options={[
                        {
                          value: '',
                          text: 'همه',
                        },
                        {
                          value: 'golden',
                          text: 'طلایی',
                        },
                        {
                          value: 'simple',
                          text: 'ساده',
                        },
                        {
                          value: 'corn',
                          text: 'ذرتی',
                        },
                      ]}
                      onChange={(event, data) => this.setState({ yolk_types: [data.value] })}
                    />
                  </Form.Field>
                  <Form.Field key="print_types">
                    <label className="label">نوع پرینت</label>
                    <Dropdown
                      placeholder="با یا بدون پرینت ..."
                      fluid
                      selection
                      scrolling
                      closeOnChange
                      options={[
                        {
                          value: '',
                          text: 'همه',
                        },
                        {
                          value: 'with',
                          text: 'با پرینت',
                        },
                        {
                          value: 'without',
                          text: 'بدون پرینت',
                        },
                        {
                          value: 'ability',
                          text: 'با قابلیت پرینت',
                        },
                      ]}
                      onChange={(event, data) => this.setState({ print_types: [data.value] })}
                    />
                  </Form.Field>
                  <Form.Field key="quality">
                    <label className="label">کیفیت</label>
                    <Dropdown
                      placeholder="لوکس، درجه ۱، کارخانه‌ای یا ..."
                      fluid
                      selection
                      scrolling
                      closeOnChange
                      options={[
                        {
                          value: '',
                          text: 'همه',
                        },
                        {
                          value: 'lux',
                          text: 'لوکس',
                        },
                        {
                          value: 'grade-1',
                          text: 'درجه ۱',
                        },
                        {
                          value: 'grade-2',
                          text: 'درجه ۲',
                        },
                        {
                          value: 'for-factories',
                          text: 'درجه ۳ (کارخانه‌ای)',
                        },
                      ]}
                      onChange={(event, data) => this.setState({ qualities: [data.value] })}
                    />
                  </Form.Field>
                  <Button
                    loading={!this.state.loads}
                    disabled={!this.state.loads}
                    fluid
                    color='yellow'
                    size='large'
                    onClick={this.doFilter}
                    style={{
                      margin: '20px 0 0',
                    }}
                  >
                    جستجوی آگهی
                  </Button>
                </Form>
              </Segment>
            </Grid.Column> : ''}
            <Grid.Column width={11}>
              {this.state.loads
                ? !!!this.state.loads.length
                  ? (
                    <Segment placeholder textAlign="center">
                      <Header icon>
                        <Icon name='search' /><br />
                        آگهی ای با این ویژگی ها از میان آگهی ها پیدا نشد.
                      </Header>
                      <br />
                      لطفا با تغییر فیلتر ها،‌ مجدد تلاش کنید.
                    </Segment>
                  )
                  : (
                    <Grid stackable columns={2}>{
                      this.state.loads.map((load, index) => {
                        const show_day_devider = !(this.state.loads[index - 1] && load.reg_just_date == this.state.loads[index - 1].reg_just_date);
                        return (
                          <LoadCards
                            key={load.loadID}
                            load={load}
                            show_day_devider={show_day_devider}
                          />
                        );
                      })
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

List.propTypes = {
  getLoads: PropTypes.func.isRequired,
  loads: PropTypes.array,
  provinces: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
  loads: makeSelectLoads(),
  provinces: RootSelectors.makeSelectProvinces(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLoads: bindActionCreators(listActions.getLoadsAction, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'list',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(List);
