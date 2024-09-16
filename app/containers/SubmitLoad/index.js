/**
 *
 * SubmitLoad
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
import { makeSelectSubmitLoad, makeSelectSubmitResponse } from './selectors';
import reducer from './reducer';
import messages from './messages';
import * as SubmitLoadActions from './actions';
import * as RootSelector from '../Root/selectors';
import * as RouterConst from '../../utils/RouterConsts';
import {
  Checkbox,
  Dropdown,
  Card,
  Form,
  Segment,
  Grid,
  Message,
  Button,
  Header,
  TextArea,
  Divider,
  Icon,
} from 'semantic-ui-react';
import _ from 'lodash';
import ReactGA from 'react-ga';

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

export class SubmitLoad extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.origin_field1 = undefined;
    this.origin_field2 = '';

    this.weight = undefined;
    this.count = undefined;
    this.print_type = undefined;
    this.yolk_type = undefined;
    this.box_type = '';
    this.stage_type = '';
    this.type = undefined;
    this.pack_type = undefined;
    this.quality = undefined;
    this.price = undefined;

    this.description = '';
    this.owner_name = '';
    this.person_owner_name = '';
    this.phones = ['', '', '', ''];

    this.state = {
      submitLoading: false,
      unCompletedData: false,
      unCompletedDataList: [],
      showPackType: undefined,
    };

    this.dataIsNotComplete = this.dataIsNotComplete.bind(this);
    this.onSubmitLoad = this.onSubmitLoad.bind(this);

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response) {
      if (nextProps.response.status === 200) {
        alert('آگهی شما ثبت شد. امیدواریم تجربه خوبی از اگمارکت به همراه داشته باشید.');
        this.props.history.push(RouterConst.MY_LOADS);
      } else {
        this.setState({
          submitLoading: false,
        }, () => alert('مشکلی پیش آمده است. با عرض پوزش لطفا دوباره تلاش کنید.'));
      }
    }
  }

  isMobileNumberValid(mobileNumber) {
    // return /^(?:09)(?:\d(?:-)?){9}$/m.test(mobileNumber);
    return true;
  }

  dataIsNotComplete() {
    const errors = [];
    if (this.type === undefined) {
      errors.push('لطفا نوع آگهی را انتخاب کنید.');
    }
    if (this.pack_type === undefined) {
      errors.push('لطفا نوع بسته بندی را انتخاب نمایید.');
    }
    if (this.print_type === undefined) {
      errors.push('لطفا نوع پرینت را انتخاب نمایید.');
    }
    if (this.yolk_type === undefined) {
      errors.push('لطفا نوع زرده را انتخاب نمایید.');
    }
    if (this.weight === undefined) {
      const title = this.state.showPackType === 'bulk' ? 'وزن کارتن' : 'تعداد در کارتن';
      errors.push(`لطفا ${title} را وارد نمایید.`);
    }
    if (this.count === undefined) {
      errors.push('لطفا تعداد کارتن را وارد نمایید.');
    }
    if (this.origin_field1 === undefined) {
      errors.push('لطفا استان مبدا را انتخاب نمایید.');
    }
    if (this.phones[0] === '') {
      errors.push('وارد کردن شماره تلفن ۱ الزامیست.');
    } else {
      this.phones.map((item, index) => {
        if (item !== '' && !this.isMobileNumberValid(item)) {
          const number = index + 1;
          errors.push(`فرمت شماره تلفن ${number} اشتباه است.`);
        }
      });
    }
    this.setState({
      unCompletedDataList: errors,
    });
    return !!errors.length;
  }

  onSubmitLoad() {
    if (this.dataIsNotComplete()) {
      this.setState({
        unCompletedData: true,
      });
    } else {
      const param = {
        client: 'web',
        origin_field1: this.origin_field1,
        origin_field2: this.origin_field2,
        weight: this.weight,
        count: this.count,
        print_type: this.print_type,
        yolk_type: this.yolk_type,
        box_type: this.box_type,
        stage_type: this.stage_type,
        type: this.type,
        pack_type: this.pack_type,
        quality: this.quality,
        price: this.price,
        description: this.description,
        person_owner_name: this.person_owner_name,
        owner_name: this.owner_name,
        phones: [...new Set(this.phones)],
      };
      this.setState({
        unCompletedData: false,
        unCompletedDataList: [],
        submitLoading: true,
      }, () => this.props.submitLoad(param));
    }
  }

  render() {
    if (this.props.tokenStatus && this.props.tokenStatus !== 200) {
      this.props.history.push(RouterConst.LOGIN + RouterConst.SUBMIT_LOAD);
    }
    if (!this.props.provinces) return null;
    const provinces = dropDownAdaptor('id', 'title', this.props.provinces);

    const profile = this.props.profile;
    this.owner_name = profile.owner_name;
    this.person_owner_name = profile.person_owner_name || profile.name;
    this.phones[0] = profile[`phone${0 + 1}`];
    this.phones[1] = profile[`phone${1 + 1}`];
    this.phones[2] = profile[`phone${2 + 1}`];
    this.phones[3] = profile[`phone${3 + 1}`];

    return (
      <Fragment>
        <Helmet>
          <title>اگمارکت | ثبت آگهی جدید</title>
        </Helmet>
        <style>
          {`
            input {
              direction: rtl !important;
              text-align: right !important;
            }
            .ui.form .field>label {
              color: rgb(112,112,112) !important;
              font-weight: normal !important;
              margin: 10px 7px !important;
              font-size:14px !important;
            }
            .ui.clearing.divider {
              margin: 30px 0 20px !important;
              border-color: white !important;
            }
            .ui.stacked.segment {
              padding-bottom: 2.4em;
            }
          `}
        </style>
        <Grid textAlign="center">
          <Grid.Column style={{
            maxWidth: 450,
            textAlign: 'right',
          }}>
            <Form>
              <Header as='h4' textAlign="center">ثبت آگهی جدید</Header>
              <Segment stacked>
                <Form.Field required>
                  <label>نوع آگهی:</label>
                  <Dropdown
                    placeholder="درخواست یا اعلام ..."
                    fluid
                    selection
                    scrolling
                    closeOnChange
                    options={[
                      {
                        value: 'announcement',
                        text: 'اعلام بار',
                      },
                      {
                        value: 'request',
                        text: 'درخواست بار',
                      },
                    ]}
                    onChange={(event, data) => {
                      this.type = data.value;
                    }}
                  />
                </Form.Field>
                <Divider clearing />
                <Form.Field key="pack_types" required>
                  <label>نوع بسته بندی</label>
                  <Dropdown
                    placeholder="فله (شانه ای) یا بسته بندی ..."
                    fluid
                    selection
                    scrolling
                    closeOnChange
                    options={[
                      {
                        value: 'bulk',
                        text: 'فله (شانه ای)',
                      },
                      {
                        value: 'box',
                        text: 'بسته بندی',
                      },
                    ]}
                    onChange={(event, data) => {
                      this.pack_type = data.value;
                      this.setState({ showPackType: data.value });
                    }}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>
                    {this.state.showPackType === 'bulk' ? 'وزن کارتن' : 'تعداد در کارتن'}
                  </label>
                  <Form.Input
                    fluid
                    type="text"
                    onChange={(event) => {
                      this.weight = event.target.value;
                    }}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>
                    تعداد کارتن
                  </label>
                  <Form.Input
                    fluid
                    type="number"
                    onChange={(event) => {
                      this.count = event.target.value;
                    }}
                  />
                </Form.Field>
                <Divider clearing />
                <Form.Field key="yolk_types" required>
                  <label>نوع زرده</label>
                  <Dropdown
                    placeholder="طلایی، ساده یا ذرتی ..."
                    fluid
                    selection
                    scrolling
                    closeOnChange
                    options={[
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
                    onChange={(event, data) => {
                      this.yolk_type = data.value;
                    }}
                  />
                </Form.Field>
                <Form.Field key="print_types" required>
                  <label>نوع پرینت</label>
                  <Dropdown
                    placeholder="با یا بدون پرینت ..."
                    fluid
                    selection
                    scrolling
                    closeOnChange
                    options={[
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
                    onChange={(event, data) => {
                      this.print_type = data.value;
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>
                    نوع کارتن
                  </label>
                  <Form.Input
                    fluid
                    type="text"
                    onChange={(event) => {
                      this.box_type = event.target.value;
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>
                    نوع شانه
                  </label>
                  <Form.Input
                    fluid
                    type="text"
                    onChange={(event) => {
                      this.stage_type = event.target.value;
                    }}
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
                    onChange={(event, data) => {
                      this.quality = data.value;
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>
                    قیمت
                  </label>
                  <Form.Input
                    fluid
                    type="text"
                    onChange={(event) => {
                      this.price = event.target.value;
                    }}
                  />
                </Form.Field>
                <Divider clearing />
                <Form.Field required>
                  <label>محل - استان:</label>
                  <Dropdown
                    fluid
                    selection
                    scrolling
                    closeOnChange
                    options={provinces}
                    placeholder="استان محل بارگیری ..."
                    onChange={(event, data) => {
                      this.origin_field1 = data.value;
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>محل - منطقه:</label>
                  <Form.Input
                    fluid
                    type="text"
                    placeholder="شهر، شهرک صنعتی، جاده یا ...."
                    onChange={(event) => {
                      this.origin_field2 = event.target.value;
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>توضیحات:</label>
                  <TextArea
                    autoHeight
                    placeholder="توضیحات بیشتر مانند شرایط پرداخت، شکسته یا ..."
                    onChange={(event) => {
                      this.description = event.target.value;
                    }}
                  />
                </Form.Field>
              </Segment>
              <Segment stacked>
                <Form.Field>
                  <label>نام مجموعه تولیدی:</label>
                  <Form.Input
                    fluid
                    type="text"
                    placeholder="اگمارکت، مرغداری فلانی یا ...."
                    onChange={(event) => {
                      this.owner_name = event.target.value;
                    }}
                    defaultValue={profile.owner_name}
                  />
                </Form.Field>
                <Form.Field>
                  <label>نام شخص:</label>
                  <Form.Input
                    fluid
                    type="text"
                    placeholder="علی حسینی، آقای محمدی، خانم پرویزیان یا ..."
                    onChange={(event) => {
                      this.person_owner_name = event.target.value;
                    }}
                    defaultValue={profile.person_owner_name || profile.name}
                  />
                </Form.Field>
                <Form.Field>
                  <label>شماره های تماس:</label>
                  {this.phones.map((item, index) => (
                    <Form.Input
                      key={index}
                      fluid
                      type="number"
                      onChange={(event) => {
                        this.phones[index] = event.target.value;
                      }}
                      placeholder={`شماره تلفن ${(index + 1)} مثلا 09191218899 یا ...`}
                      style={{
                        direction: 'ltr',
                        textAlign: 'center',
                      }}
                      defaultValue={profile['phone' + (index + 1)]}
                    />
                  ))}
                </Form.Field>
              </Segment>
              {this.state.unCompletedData ? (
                <Message size='mini' attached='bottom' color='yellow'>
                  <Message.Header>اطلاعات زیر کامل نیست.</Message.Header>
                  {this.state.unCompletedDataList.map((item, index) => <p key={index}>- {item}</p>)}
                </Message>
              ) : null}
              <Button
                loading={this.state.submitLoading}
                disabled={this.state.submitLoading}
                fluid
                color="yellow"
                size="large"
                onClick={this.onSubmitLoad}
                style={{
                  marginRight: 0,
                }}
              >
                ثبت آگهی
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

SubmitLoad.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  tokenStatus: PropTypes.number,
  provinces: PropTypes.array,
  submitLoad: PropTypes.func.isRequired,
  response: PropTypes.number,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  submitload: makeSelectSubmitLoad(),
  tokenStatus: RootSelector.makeSelectTokenResponse(),
  provinces: RootSelector.makeSelectProvinces(),
  response: makeSelectSubmitResponse(),
  profile: RootSelector.makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitLoad: bindActionCreators(SubmitLoadActions.submitLoad, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'submitLoad',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(SubmitLoad);
