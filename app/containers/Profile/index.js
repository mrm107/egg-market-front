/**
 *
 * Profile
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
import { makeSelectProfile, makeSelectProfileData } from './selectors';
import reducer from './reducer';
import messages from './messages';
import * as ProfileActions from './actions';
import * as AppConstants from '../../utils/AppConstants';
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox, Icon, Divider } from 'semantic-ui-react';
import ReactGA from 'react-ga';

export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: false,
      customerName: '',
      customerType: new Set(),
    };

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    this.props.getProfileData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileData) {
      let ct = nextProps.profileData.type;
      if (nextProps.profileData.type == null) {
        ct = JSON.stringify([]);
      }
      this.setState({
        loading: false,
        customerName: nextProps.profileData.name,
        customerType: new Set(JSON.parse(ct)),
      });
    }
  }

  render() {
    const profile = this.props.profileData;

    if (!profile) return null;
    return (
      <div className="profile-form">
        <Helmet>
          <title>اگمارکت | پروفایل</title>
          <meta name="description" content="پروفایل اگمارکت" />
        </Helmet>
        <style>
          {`
            body > div,
            body > div > div,
            body > div > div > div.profile-form {
              height: 100%;
            }
          `}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                {this.renderEditProfile()}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  renderEditProfile() {
    const pd = this.props.profileData;

    return (
      <Fragment>
        <style>
          {`
              .ui.checkbox {
                margin-right: 5px;
                padding: 15px 0;
              }
              .ui.checkbox label:before, .ui.checkbox label:after {
                left: auto !important;
                right: 0 !important;
              }
              .ui.checkbox input+label {
                padding-right: 23px;
                padding-left: 0 !important;
                white-space: nowrap;
              }
              .ui.fluid.input input {
                text-align: center;
                direction: rtl;
              }
          `}
        </style>
        <Form.Field>
          <label className="label">تلفن همراه (غیر قابل ویرایش)</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            defaultValue={pd.mobile}
          />
        </Form.Field>
        <Form.Field>
          <label className="label">نام و نام خانوادگی</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            onChange={(event) => {
              this.setState({
                customerName: event.target.value,
              });
            }}
            defaultValue={pd.name}
          />
        </Form.Field>
        <Form.Field>
          <label className="label">حوزه فعالیت</label>
          <Form.Group>
            {[
              'مرغدار',
              'بنکدار',
              'پخش',
              'بسته بندی',
              'صادر کننده',
            ].map(item => (
              <Form.Field style={{ paddingRight: '0px' }}>
                <Checkbox
                  label={item}
                  defaultChecked={(this.state.customerType).has(item)}
                  onChange={event => this.onCheckboxChange(item)}
                  key={Math.random()}
                />
              </Form.Field>
            ))}
          </Form.Group>
        </Form.Field>
        <Divider />
        <Form.Field>
          <label className="label">موجودی اعتباری</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue="۰ ریال"
          />
        </Form.Field>
        <Form.Field>
          <label className="label">موجودی نقدی</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue="۰ ریال"
          />
        </Form.Field>
        <Form.Field>
          <label className="label">تعداد معاملات</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue="۰"
          />
        </Form.Field>
        <Form.Field>
          <label className="label">امتیاز من</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue="بدون امتیاز"
          />
        </Form.Field>
        <Divider />
        {pd.owner_name && <Form.Field>
          <label className="label">نام مجموعه</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue={pd.owner_name}
          />
        </Form.Field>}
        {pd.phone1 && <Form.Field>
          <label className="label">شماره تماس ۱</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue={pd.phone1}
          />
        </Form.Field>}
        {pd.phone2 && <Form.Field>
          <label className="label">شماره تماس ۲</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue={pd.phone2}
          />
        </Form.Field>}
        {pd.phone3 && <Form.Field>
          <label className="label">شماره تماس ۳</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue={pd.phone3}
          />
        </Form.Field>}
        {pd.phone4 && <Form.Field>
          <label className="label">شماره تماس ۴</label>
          <Form.Select
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            readOnly
            disabled
            defaultValue={pd.phone4}
          />
        </Form.Field>}
        <Message
          visible={this.state.inValidCustomerData}
          error
          content="وارد کردن نام و انتخاب نوع حساب الزامی است."
        />
        <Button
          loading={this.state.loading}
          disabled={this.state.loading}
          fluid
          color="yellow"
          size="large"
          style={{ marginTop: 10 }}
          onClick={() => this.onSubmitClicked()}
        >
          ذخیره تغییرات
        </Button>
      </Fragment>
    );
  }

  onCheckboxChange(customerTypeItem) {
    let ct = this.state.customerType;
    if (ct.has(customerTypeItem)) {
      ct.delete(customerTypeItem);
    } else {
      ct.add(customerTypeItem);
    }
    this.setState({ customerType: ct });
  }

  onSubmitClicked() {
    const param = {
      name: this.state.customerName,
      type: JSON.stringify(this.state.customerType),
    };
    this.setState({ loading: true }, () => {
      this.props.fillProfileInfo(param);
    });
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getProfileData: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  fillProfileInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  profileData: makeSelectProfileData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProfileData: bindActionCreators(ProfileActions.getProfileData, dispatch),
    fillProfileInfo: bindActionCreators(ProfileActions.fillProfile, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'profile',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(Profile);
