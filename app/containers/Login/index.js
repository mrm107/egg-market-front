/**
 *
 * Login
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectLogin,
  makeSelectConfirmResponse,
  makeSelectCheckMobileResponse,
  makeSelectRenewConfirmResponse,
  makeSelectCheckTokenResponse,
} from './selectors';
import reducer from './reducer';
import messages from './messages';
import * as loginActions from './actions';
import { Button, Form, Grid, Header, Image, Message, Segment, Radio, Icon } from 'semantic-ui-react';

import * as RouterConst from '../../utils/RouterConsts';
import * as AppConstants from '../../utils/AppConstants';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';


const LoginState = {
  MobileForm: 'MOBILE_FORM',
  NameForm: 'NAME_FORM',
  VerifyCode: 'VERIFY_CODE',
};
const CODE_SEND_INTERVAL_TIME = 120;

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // mobileNumber;
  verifyCode;
  customerName;
  intervalCode;

  constructor(props) {
    super(props);
    this.props = props;
    // this.mobileNumber = '';
    this.verifyCode = '';
    this.customerName = '';
    this.intervalCode = 0;
    this.state = {
      mobileAltNumber: '',
      loginState: LoginState.MobileForm,
      inValidNumber: false,
      inValidCode: false,
      customerType: '',
      inValidCustomerData: false,
      time: 0,
      loading: false,
    };

    this._resetTimeout = this._resetTimeout.bind(this);
    this.runRestCounter = this.runRestCounter.bind(this);
    this.redirectToRef = this.redirectToRef.bind(this);
    this.renderRegisterForm = this.renderRegisterForm.bind(this);
    this.renderMobileForm = this.renderMobileForm.bind(this);
    this.onSendMobileNumber = this.onSendMobileNumber.bind(this);
    this.renderVerifyCodeForm = this.renderVerifyCodeForm.bind(this);
    this.renderRenewButtons = this.renderRenewButtons.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.sendVerifyCode = this.sendVerifyCode.bind(this);
    this.onSendVerificationCode = this.onSendVerificationCode.bind(this);
    this.renderSelectNameForm = this.renderSelectNameForm.bind(this);
    this.onRadioButtonChange = this.onRadioButtonChange.bind(this);
    this.onSubmitNameClick = this.onSubmitNameClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentWillMount() {
    this.props.checkToken();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkNumberStatusData) {
      this._resetTimeout();
      this.setState({
        loading: false,
        loginState: LoginState.VerifyCode,
        time: CODE_SEND_INTERVAL_TIME,
      });
    }
    if (nextProps.confirmStatusData) {
      const { status } = nextProps.confirmStatusData;
      if (status === 203) {
        this.setState({
          loading: false,
          loginState: LoginState.NameForm,
        });
      } else if (status === 200) {
        this.redirectToRef();
      } else {
        this.setState({
          loading: false,
          inValidCode: true,
        });
      }
    }
    if (nextProps.renewConfirmData) {
      const status = nextProps.renewConfirmData;
      if (status === 200) {
        this.props.clearRenewConfirmData();
        this._resetTimeout();
      } else {
        // TODO: ???
      }
    }
    if (nextProps.checkTokenResponse) {
      const response = nextProps.checkTokenResponse;
      switch (response) {
        case 200:
          this.redirectToRef();
          break;
        default:
          break;
      }
    }
  }

  redirectToRef() {
    let refUrl = window.location.pathname.split('/')[2];
    if (refUrl === undefined) {
      refUrl = '';
    }
    this.props.history.push(`/${refUrl}`);
  }

  _resetTimeout() {
    clearInterval(this.intervalCode);
    this.setState({
      time: CODE_SEND_INTERVAL_TIME,
    });
    this.runRestCounter();
  }

  runRestCounter() {
    this.intervalCode = setInterval(() => {
      let time = this.state.time - 1;
      if (time < 0) {
        time = 0;
      }
      this.setState({
        time,
      });
    }, 1000);
  }

  render() {
    return (
      <div className="login-form">
        <Helmet>
          <title>اگمارکت | ورود یا ثبت نام</title>
          <meta name="description"
            content="اگمارکت" />
        </Helmet>
        <style>
          {`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                {this.renderRegisterForm()}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  renderRegisterForm() {
    switch (this.state.loginState) {
      case LoginState.MobileForm:
        return this.renderMobileForm();
      case LoginState.VerifyCode:
        return this.renderVerifyCodeForm();
      case LoginState.NameForm:
        return this.renderSelectNameForm();
      default:
        return null;
    }
  }

  renderMobileForm() {
    return (
      <Fragment key={LoginState.MobileForm}>
        <Form.Field>
          <label className="label">برای ورود یا ثبت نام، شماره موبایل خود را وارد کنید.</label>
          <label className="label" style={{ fontSize: '12px', color: 'gray', fontWeight: 'normal' }}>کد فعالسازی به شکل پیامک برای شما ارسال خواهد شد.</label>
          <Form.Input
            fluid
            icon="mobile"
            iconPosition="left"
            placeholder="0919 871 1159"
            type="number"
            style={{
              marginTop: 18,
              direction: 'ltr',
            }}
            onChange={(event) => {
              // this.mobileNumber = event.target.value;
              this.setState({
                mobileAltNumber: event.target.value,
              });
            }}
          />
        </Form.Field>
        <Message
          visible={this.state.inValidNumber}
          error
          content='شماره موبایل صحیح نمی‌باشد. لطفا با 09 شروع کرده و با اعداد لاتین وارد نمایید.'
        />
        <Button
          loading={this.state.loading}
          disabled={this.state.loading}
          fluid
          color="yellow"
          size="large"
          onClick={() => {
            this.onSendMobileNumber();
          }}
        >
          ادامه
        </Button>
      </Fragment>
    );
  }

  isMobileNumberValid(mobileNumber) {
    return /^(?:09)(?:\d(?:-)?){9}$/m.test(mobileNumber);
  }

  onSendMobileNumber() {
    // const { mobileNumber } = this;
    const { mobileAltNumber: mobileNumber } = this.state;
    if (this.isMobileNumberValid(mobileNumber)) {
      this.setState({
        loading: true,
      }, () => this.props.onSubmitMobileNumber(mobileNumber));
    } else {
      this.setState({
        inValidNumber: true,
      });
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // e.preventDefault();
      // e.stopPropagation();
      this.onSendVerificationCode();
    }
  };

  renderVerifyCodeForm() {
    return (
      <Fragment key={LoginState.VerifyCode}>
        <style>
          {`
              .ui.fluid.input input {
                text-align: center;
                direction: ltr;
                letter-spacing: 5px;
                text-align: center;
              }
          `}
        </style>
        <Form.Field>
          <label className="label">
            کد ارسال شده به شماره {this.state.mobileAltNumber} را وارد نمایید.
            {this.state.time ? `دریافت پیامک ممکن است تا` + ` ` + this.state.time.toString() + ` ` + `ثانیه دیگر طول بکشد.` : null}
          </label>
          {!this.state.time ? <label className="label" style={{
            marginTop: 15,
            direction: 'ltr',
          }}>
            ارسال مجدد کد فعال سازی
            {this.renderRenewButtons()}
          </label> : null}
          <Form.Input
            fluid
            placeholder="____"
            type="number"
            style={{
              marginTop: 18,
              direction: 'ltr',
              textAlign: 'center',
            }}
            onChange={(event) => {
              this.verifyCode = event.target.value;
            }}
            onKeyPress={this.handleKeyPress}
          />
        </Form.Field>
        <Message visible={this.state.inValidCode} error>
          کد فعال سازی وارد شده اشتباه است.
        </Message>
        <Button
          loading={this.state.loading}
          disabled={this.state.loading}
          fluid
          color="yellow"
          size="large"
          onClick={() => {
            this.onSendVerificationCode();
          }}
          onKeyPress={this.handleKeyPress}
        >
          ادامه
        </Button>
        <Button
          size="mini"
          compact
          onKeyPress={this.handleKeyPress}
          onClick={() => {
            this.changeNumber();
          }}
          style={{
            marginTop: '15px'
          }}
        >تغییر شماره</Button>
      </Fragment>

    );
  }

  renderRenewButtons() {
    return (
      <div style={{ marginTop: 5 }}>
        <Button.Group>
          <Button color="yellow" onClick={() => {
            this.sendVerifyCode(AppConstants.renewConfirmCodeType.SMS);
          }}>پیامک</Button>
          <Button.Or />
          <Button color="yellow" onClick={() => {
            this.sendVerifyCode(AppConstants.renewConfirmCodeType.CALL);
          }}>تماس</Button>
        </Button.Group>
      </div>
    );
  }

  changeNumber() {
    this.verifyCode = '';
    this.customerName = '';
    this.intervalCode = 0;
    this.setState({
      mobileAltNumber: '',
      loginState: LoginState.MobileForm,
      inValidNumber: false,
      inValidCode: false,
      customerType: '',
      inValidCustomerData: false,
      time: 0,
      loading: false,
    });
  }

  sendVerifyCode(renewType) {
    // const { mobileNumber } = this;
    const { mobileAltNumber: mobileNumber } = this.state;
    this.props.renewConfirmCode(mobileNumber, renewType);
  }

  onSendVerificationCode() {
    const { verifyCode } = this;
    const { mobileAltNumber: mobileNumber } = this.state;
    this.setState({
      loading: true,
    }, () => this.props.onConfirmCode(mobileNumber, verifyCode));
  }

  renderSelectNameForm() {
    return (
      <Fragment key={LoginState.NameForm}>
        <style>
          {`
              .ui.radio.checkbox {
                margin-right: 5px;
                padding: 15px 0;
              }
              .ui.radio.checkbox label:before, .ui.radio.checkbox label:after {
                left: auto !important;
                right: 0 !important;
              }
              .ui.checkbox input+label {
                padding-right: 23px;
                padding-left: 0 !important;
              }
              .ui.fluid.input input {
                text-align: center;
                direction: rtl;
              }
          `}
        </style>
        <Form.Field>
          <label className="label">نام و نام خانوادگی خود را وارد نمایید.</label>
          <Form.Input
            fluid
            style={{
              marginTop: 18,
              direction: 'rtl',
            }}
            onChange={(event) => {
              this.customerName = event.target.value;
            }}
          />
        </Form.Field>
        {/*<Form.Group>*/}
        {/*<Form.Field>*/}
        {/*<Radio*/}
        {/*label="راننده یا صاحب ماشین هستم"*/}
        {/*name="radioGroup"*/}
        {/*value={AppConstants.CustomerType.Driver}*/}
        {/*checked={this.state.customerType === AppConstants.CustomerType.Driver}*/}
        {/*onClick={(event) => this.onRadioButtonChange(AppConstants.CustomerType.Driver)}*/}
        {/*/>*/}
        {/*</Form.Field>*/}
        {/*<Form.Field>*/}
        {/*<Radio*/}
        {/*label="آگهیبری یا صاحب آگهی هستم"*/}
        {/*name="radioGroup"*/}
        {/*value={AppConstants.CustomerType.Owner}*/}
        {/*checked={this.state.customerType === AppConstants.CustomerType.Owner}*/}
        {/*onClick={(event) => this.onRadioButtonChange(AppConstants.CustomerType.Owner)}*/}
        {/*/>*/}
        {/*</Form.Field>*/}
        {/*</Form.Group>*/}
        <Message
          visible={this.state.inValidCustomerData}
          error
          content='وارد کردن نام و انتخاب نوع حساب الزامی است.'
        />
        <Button
          loading={this.state.loading}
          disabled={this.state.loading}
          fluid
          color="yellow"
          size="large"
          style={{ marginTop: 10 }}
          onClick={() => {
            this.onSubmitNameClick();
          }}
        >
          ادامه
        </Button>
      </Fragment>
    );
  }

  onRadioButtonChange(customerType) {
    this.setState({
      customerType,
    });
  }

  onSubmitNameClick() {
    const customerName = this.customerName;
    const customerType = this.state.customerType;
    // if (customerName === '' || customerType === '') {
    if (customerName === '') {
      this.setState({
        inValidCustomerData: true,
      });
    } else {
      const data = {
        name: this.customerName,
        type: this.state.customerType,
      };
      this.setState({
        loading: true,
      }, () => {
        this.props.onFillInfo(data);
        this.redirectToRef();
      });
    }
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  onConfirmCode: PropTypes.func.isRequired,
  onSubmitMobileNumber: PropTypes.func.isRequired,
  checkNumberStatusData: PropTypes.number,
  confirmStatusData: PropTypes.any,
  onFillInfo: PropTypes.func,
  renewConfirmCode: PropTypes.func.isRequired,
  renewConfirmData: PropTypes.number,
  clearRenewConfirmData: PropTypes.func.isRequired,
  checkToken: PropTypes.func.isRequired,
  checkTokenResponse: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  checkNumberStatusData: makeSelectCheckMobileResponse(),
  confirmStatusData: makeSelectConfirmResponse(),
  renewConfirmData: makeSelectRenewConfirmResponse(),
  checkTokenResponse: makeSelectCheckTokenResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmitMobileNumber: bindActionCreators(loginActions.checkMobileNumber, dispatch),
    onConfirmCode: bindActionCreators(loginActions.confirm, dispatch),
    onFillInfo: bindActionCreators(loginActions.completingCustomerData, dispatch),
    renewConfirmCode: bindActionCreators(loginActions.renewConfirmCode, dispatch),
    clearRenewConfirmData: bindActionCreators(loginActions.clearRenewConfirmData, dispatch),
    checkToken: bindActionCreators(loginActions.checkToken, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'login',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(Login);
