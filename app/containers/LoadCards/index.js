/**
 *
 * LoadCards
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
import {
  makeSelectLoadCards,
  makeSelectShareResponse,
  makeSelecContactInfo,
  makeSelectLoadsStats,
  makeSelectDeleteLoad,
} from './selectors';
import reducer from './reducer';
import messages from './messages';
import * as LoadCarsActions from './actions';
import * as RootSelectors from '../Root/selectors';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Icon,
  Button,
  Form,
  Card,
  Grid,
  Header,
  Label,
  Modal,
  Loader,
  Dimmer,
  Table,
  Popup,
  Input, Divider, Dropdown, Segment, Message,
  Statistic,
  Confirm,
  TextArea,
} from 'semantic-ui-react';
import jalaali from 'jalaali-js';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/RouterConsts';
import { getMonthName, getWeekDayName } from '../../utils/dateUtils';

export class LoadCards extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.mobileNumber = 0;

    // this.onBookmarkClicked = this.onBookmarkClicked.bind(this);
    this.findProvince = this.findProvince.bind(this);
    // this.isLoadMarked = this.isLoadMarked.bind(this);
    this.onShareLoad = this.onShareLoad.bind(this);
    this.getRegDate = this.getRegDate.bind(this);
    this.onGetContact = this.onGetContact.bind(this);
    this.onSubmitOfferShow = this.onSubmitOfferShow.bind(this);
    this.onSubmitOfferClose = this.onSubmitOfferClose.bind(this);
    this.submitOffer = this.submitOffer.bind(this);
    this.closeContactModal = this.closeContactModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);

    this.onGetStatsClicked = this.onGetStatsClicked.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.onGetContact = this.onGetContact.bind(this);

    this.state = {
      showShareBox: false,
      shareResponse: null,
      showContactModal: false,
      showShareModal: false,
      shareLoading: false,
      showLoginModal: false,
      statsLoading: false,
      deleteLoadConfirm: false,
      deleteLoading: false,
      showSubmitOfferModal: false,
      offerForLoad: null,
      offerPrice: null,
      offerDescription: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shareLoadResponse) {
      const loadID = this.props.load.loadID;
      const responses = nextProps.shareLoadResponse;
      const shareResponse = responses.get(loadID);
      if (shareResponse) {
        const shareStatus = shareResponse === 200;
        this.props.clearResponse(loadID);
        this.setState({
          shareResponse: shareStatus,
          shareLoading: false,
        });
      }
    }
    if (nextProps.deleteLoadStatus) {
      const loadID = this.props.load.loadID;
      const responses = nextProps.deleteLoadStatus;
      const deleteResponse = responses.get(loadID);
      if (deleteResponse && deleteResponse === 200) {
        this.props.clearDeleteResponse(loadID);
        this.setState({
          deleteLoading: false,
        }, this.props.callBackDeleteLoad);
      }
    }
  }

  closeContactModal() {
    this.setState({
      showContactModal: false,
    });
  }

  closeShareModal() {
    this.setState({
      showShareModal: false,
      shareResponse: null,
      shareLoading: false,
    });
  }

  openLoginModal() {
    this.setState({
      showLoginModal: true,
    });
  }

  closeLoginModal() {
    this.setState({
      showLoginModal: false,
    });
  }

  getStatus(status, type) {
    switch (status) {
      case 'accepted':
        return {
          color: 'green',
          value: 'تایید شده',
        };
      case 'rejected':
        return {
          color: 'red',
          value: 'رد شده',
        };
      case 'pending':
        return {
          color: 'orange',
          value: 'در انتظار تایید',
        };
      case 'deactive':
        return {
          color: 'red',
          value: 'حذف شده',
        };
      case 'expired':
        return {
          color: 'blue',
          value: type === 'request' ? 'خریداری شد' : 'فروخته شد',
        };
      default:
        return {
          color: 'grey',
          value: status,
        };
    }
  }

  render_type(type) {
    if (type === 'request') {
      return <Fragment><Icon color="yellow" name="circle outline" /> درخواست بار </Fragment>;
    }
    return <Fragment><Icon color="yellow" name="circle" /> اعلام بار </Fragment>;
  }

  render() {
    const load = this.props.load;
    const type = load.type;
    const description = load.description;
    const originField1 = load.origin_field1;
    const originField2 = load.origin_field2;
    const regDate = this.getRegDate(load.reg_date_timestamp);
    const regDateObject = this.getJalaliDate(load.reg_date_timestamp, this.props.serverTime, true);
    const headerWeekDayName = getWeekDayName((new Date(load.reg_date)).getDay())
    const headerMonthName = getMonthName(regDateObject.jal.jm)
    // const isLoadMarked = this.isLoadMarked();
    const showShareBox = this.state.showShareBox;
    const id = load.loadID;
    const tokenStatus = this.props.tokenStatus;
    const contactInfo = this.props.contactInfo.get(load.loadID);

    let loadDetails = load.details.slice();

    const shareLink = `https://eggmarket.ir/l/${load.loadID}`;

    const isExpired = load.status === 'expired' || load.status === 'sold';
    const isMyLoad = this.props.type === 'my-load';
    let isFade = false;
    let showButtons = true;
    let showManageButtons = false;

    const stats = this.props.loadStats.get(load.loadID);

    if (isMyLoad) {
      showButtons = false;
      isFade = true;

      if (load.status === 'accepted') {
        showButtons = true;
      }
      if (load.status === 'accepted' || load.status === 'pending') {
        isFade = false;
        showManageButtons = true;
      }

      loadDetails.push({
        title: 'وضعیت',
        ...this.getStatus(load.status, type),
      });
    } else if (isExpired) {
      showButtons = false;
      isFade = true;
      loadDetails.push({
        title: 'وضعیت',
        value: type === 'request' ? 'خریداری شد' : 'فروخته شده',
        color: 'green',
      });
    }

    loadDetails = loadDetails.map(item => {
      let temp = Object.assign({}, item);

      if (item.title == 'نوع زرده') {
        temp.metaBefore = 'زرده';
      }
      if (item.title == 'وزن کارتن') {
        temp.metaAfter = 'کیلوگرم';
      }
      if (item.title == 'تعداد کارتن') {
        temp.metaAfter = 'کارتن';
      }

      return temp;
    })

    return (
      <Fragment>
        {this.props.show_day_devider && <Grid.Column width={16}>
          <Divider horizontal style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Header as='h5' style={{ padding: '0px 20px' }}>
              {regDateObject.isToday && 'امروز '}{headerWeekDayName} {regDateObject.jal.jd} {headerMonthName}
            </Header>
          </Divider>
        </Grid.Column>
        }
        <Grid.Column>
          <Card fluid key={load.loadID} style={type === 'request' ? { background: '#fff1ec' } : undefined}>
            <style>
              {`
              .ui.divided.grid:not([class*="vertically divided"])>.column:not(.row), .ui.divided.grid:not([class*="vertically divided"])>.row>.column {
                box-shadow: 1px 0 0 0 rgba(34,36,38,.15);
              }
              .ui.celled.table tr td, .ui.celled.table tr th {
                border-left: 0px !important;
                border-right: 1px solid rgba(34,36,38,.1) !important;
                text-align:center !important;
              }
              .ui.celled.table tr td:first-child, .ui.celled.table tr th:first-child {
                border-right: 0px !important;
              }
              
              .load-card-detail-container {
                padding: 0px !important;
              }
              .load-card-detail-card {
                float:right;
                width: 50%;
                border-bottom: 1px solid rgba(34,36,38,.1);
                border-left: 1px solid rgba(34,36,38,.1);
                padding: 6px 0;
              }
              .load-card-detail-card:nth-child(2n) {
                border-left: 0px;
              }
              .load-card-detail-card:nth-child(2n - 1) {
                clear: right;
              }
              .load-card-detail-card:nth-last-child(1):nth-child(odd), .load-card-detail-card:nth-last-child(2):nth-child(odd), .load-card-detail-card:nth-last-child(1):nth-child(even) {
                border-bottom: 0px;
              }
              .load-card-detail-card-label {
                width: 100%;
                font-size: 12px;
                text-align: center;
                display: none;
              }
              .load-card-detail-card-value {
                width: 100%
                font-size: 14px;
                color: rgba(0,0,0,.87);
                text-align: center;
              }
              .load-card-detail-card-value > .meta, .load-card-detail-card-value > .small-meta {
                color: rgba(0,0,0,.4);
              }
              .load-card-detail-card-value > .small-meta {
                font-size: 12px;
              }
              .load-card-detail-card-value > .ui.label {
                padding: 3px 5px;
                margin: 0;
              }
            `}
            </style>
            <Card.Content>
              <Grid>
                <Grid.Row style={{ padding: '6px 0' }}>
                  <Grid.Column width={9}>
                    <Card.Description
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {this.render_type(type)}
                    </Card.Description>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Card.Description
                      style={{
                        textAlign: 'left',
                        color: 'rgb(112,112,112)',
                        fontSize: 12,
                      }}
                    >{regDate}
                    </Card.Description>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content extra className="load-card-detail-container">
              <div>
                <div className="load-card-detail-card">
                  <div className="load-card-detail-card-label">
                    محل
                  </div>
                  <div className="load-card-detail-card-value">
                    {this.findProvince(originField1)}
                    {originField2 ? <span class="meta"> {originField2}</span> : ''}
                  </div>
                </div>
                {loadDetails.map((item, index) => (
                  <div className="load-card-detail-card" key={index}>
                    <div className="load-card-detail-card-label">
                      {item.title}
                    </div>
                    <div className="load-card-detail-card-value">
                      {item.metaBefore ? <span class="small-meta"> {item.metaBefore} </span> : ''}
                      {item.color ? <Label color={item.color}>{item.value}</Label> : item.value}
                      {item.metaAfter ? <span class="small-meta"> {item.metaAfter}</span> : ''}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
            {description && <Card.Content><Card.Description>{description}</Card.Description></Card.Content>}
            {showButtons
              && <Card.Content>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      {/*<Button*/}
                      {/*  size="big"*/}
                      {/*  onClick={() => {*/}
                      {/*    tokenStatus === 200 ? this.onBookmarkClicked(id, isLoadMarked) : this.openLoginModal();*/}
                      {/*  }}*/}
                      {/*  icon="pin"*/}
                      {/*  color={isLoadMarked ? 'yellow' : undefined}*/}
                      {/*/>*/}
                      <Button
                        size="big"
                        onClick={() => this.setState({ showShareModal: true })}
                        icon="share alternate"
                        style={{
                          padding: '8px 10px',
                          fontSize: '16px',
                        }}
                      />
                      <Modal
                        size="mini"
                        open={this.state.showShareModal}
                        onClose={this.closeShareModal}
                        content={
                          <Fragment>
                            <Modal.Header style={{ textAlign: 'right' }}>ارسال آگهی برای دوستان</Modal.Header>
                            <Modal.Content>
                              <p>
                                <Form size="large">
                                  <label
                                    style={{
                                      width: '100%',
                                      display: 'inline-block',
                                      textAlign: 'right',
                                      lineHeight: '25px',
                                    }}
                                    className="label"
                                  >
                                    ارسال از طریق لینک و تلگرام
                                  </label>
                                  <CopyToClipboard
                                    text={shareLink}
                                    onCopy={() => alert('کپی شد!')}
                                  >
                                    <Form.Input
                                      style={{
                                        marginTop: 18,
                                        direction: 'ltr',
                                      }}
                                      icon="copy"
                                      iconPosition="left"
                                      value={shareLink}
                                      readOnly
                                    />
                                  </CopyToClipboard>
                                  <Button
                                    fluid
                                    size="large"
                                    content="ارسال در تلگرام"
                                    color="blue"
                                    onClick={() => {
                                      window.location = `tg://msg?text=این آگهی رو در اگمارکت ببین. شاید به دردت بخوره. ${shareLink} `;
                                    }}
                                  />
                                </Form>
                                {/* <Divider /> */}
                                {/* {this.state.shareResponse === null */}
                                {/* ? ( */}
                                {/* <Form size="large"> */}
                                {/* <label */}
                                {/* style={{ */}
                                {/* display: 'inline-block', */}
                                {/* textAlign: 'right', */}
                                {/* lineHeight: '25px', */}
                                {/* }} */}
                                {/* className="label"> */}
                                {/* شماره یکی از دوستان خود را وارد نمایید. ما این آگهی را به */}
                                {/* شکل <strong>رایگان</strong> و از طریق <strong>پیامک</strong> برای او ارسال */}
                                {/* میکنیم. */}
                                {/* </label> */}
                                {/* <Form.Field> */}
                                {/* <Form.Input */}
                                {/* fluid */}
                                {/* icon="mobile" */}
                                {/* iconPosition="left" */}
                                {/* placeholder="0919 871 1159" */}
                                {/* type="number" */}
                                {/* style={{ */}
                                {/* marginTop: 18, */}
                                {/* direction: 'ltr', */}
                                {/* }} */}
                                {/* onChange={(event) => { */}
                                {/* this.mobileNumber = Number(event.target.value); */}
                                {/* }} */}
                                {/* /> */}
                                {/* </Form.Field> */}
                                {/* <Button */}
                                {/* loading={this.state.shareLoading} */}
                                {/* disabled={this.state.shareLoading} */}
                                {/* fluid */}
                                {/* color="yellow" */}
                                {/* size="large" */}
                                {/* onClick={() => { */}
                                {/* this.onShareLoad(); */}
                                {/* }} */}
                                {/* > */}
                                {/* ارسال پیامک */}
                                {/* </Button> */}
                                {/* </Form> */}
                                {/* ) : ( */}
                                {/* this.state.shareResponse */}
                                {/* ? <Message */}
                                {/* success */}
                                {/* content={`این آگهی برای شماره ${this.mobileNumber} ارسال گردید. با تشکر از اینکه به فکر ما و دوستان خود هستید.`} */}
                                {/* style={{ textAlign: 'right' }} */}
                                {/* /> */}
                                {/* : <Message */}
                                {/* error */}
                                {/* content='خطا در ارسال و یا ورود شماره. لطفا مجددا تلاش کنید.' */}
                                {/* style={{ textAlign: 'right' }} */}
                                {/* /> */}
                                {/* ) */}
                                {/* } */}
                              </p>
                            </Modal.Content>
                            <Modal.Actions style={{ textAlign: 'left' }}>
                              <Button onClick={this.closeShareModal}>بستن</Button>
                            </Modal.Actions>
                          </Fragment>
                        }
                      />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <Button
                        fluid
                        secondary={!isMyLoad}
                        size="big"
                        content="تماس"
                        onClick={() => tokenStatus === 200 ? this.onGetContact(load.loadID) : this.openLoginModal()}
                        style={{
                          width: '100px',
                          padding: '8px 10px',
                          float: 'left',
                          marginRight: '10px',
                          fontSize: '16px',
                        }}
                      />
                      {!isMyLoad && <Button
                        fluid
                        size="big"
                        content="پیشنهاد قیمت"
                        onClick={() => tokenStatus === 200 ? this.onSubmitOfferShow(load.loadID) : this.openLoginModal()}
                        color="yellow"
                        style={{
                          width: 'calc(100% - 115px)',
                          padding: '8px 0px',
                          float: 'left',
                          maxWidth: '200px',
                          fontSize: '16px',
                        }}
                      />}
                      <Modal
                        size="mini"
                        open={this.state.showContactModal}
                        onClose={this.closeContactModal}
                        content={
                          <Fragment>
                            <Modal.Header style={{ textAlign: 'right' }}>تماس</Modal.Header>
                            <Modal.Content>
                              <p>
                                {contactInfo
                                  ? (
                                    <Fragment>
                                      <Table celled unstackable style={{ width: '100%' }}>
                                        <Table.Body>
                                          {contactInfo.contact.name || contactInfo.contact.personName
                                            ? <Table.Row>
                                              <Table.Cell colSpan="2" style={{ textAlign: 'right' }}>
                                                <Header as="h4" image>
                                                  <Icon name="user" />
                                                  <Header.Content
                                                    style={{
                                                      textAlign: 'right',
                                                      paddingRight: 15,
                                                    }}
                                                  >
                                                    {contactInfo.contact.name}
                                                    <Header.Subheader>
                                                      {contactInfo.contact.personName}
                                                    </Header.Subheader>
                                                  </Header.Content>
                                                </Header>
                                              </Table.Cell>
                                            </Table.Row>
                                            : null
                                          }
                                          {contactInfo.contact.phones.map((phone, index) => (
                                            <Table.Row key={index}>
                                              <CopyToClipboard
                                                text={phone}
                                                onCopy={() => alert('کپی شد!')}
                                              >
                                                <Table.Cell style={{ textAlign: 'center' }}>
                                                  {phone}
                                                </Table.Cell>
                                              </CopyToClipboard>
                                              <Table.Cell style={{ width: 85 }}>
                                                <a href={`tel:${phone}`}>
                                                  <Button size="huge" icon="phone" color="green" />
                                                </a>
                                              </Table.Cell>
                                            </Table.Row>
                                          ))}
                                        </Table.Body>
                                      </Table>
                                    </Fragment>
                                  ) : (
                                    <div
                                      style={{
                                        width: '100%',
                                        textAlign: 'center',
                                      }}
                                    >در حال دریافت ...
                                    </div>
                                  )
                                }
                              </p>
                            </Modal.Content>
                            <Modal.Actions style={{ textAlign: 'left' }}>
                              <Button onClick={this.closeContactModal}>بستن</Button>
                            </Modal.Actions>
                          </Fragment>
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Modal
                  size="tiny"
                  open={this.state.showLoginModal}
                  onClose={this.closeLoginModal}
                  content={
                    <Fragment>
                      <Modal.Header style={{ textAlign: 'right' }}>دسترسی بیشتر!</Modal.Header>
                      <Modal.Content>
                        <p
                          style={{
                            width: '100%',
                            textAlign: 'right',
                          }}
                        >
                          برای استفاده از همه ی امکانات اگمارکت، به ورود یا ثبت نام نیاز است.
                          <br />
                          ما برای ثبت نام فقط به <strong>نام</strong> و <strong>تلفن همراه</strong> شما نیاز داریم و به شما
                          اطمینان میدهیم که آن را در اختیار کسی قرار نخواهیم داد.
                        </p>
                      </Modal.Content>
                      <Modal.Actions style={{ textAlign: 'left' }}>
                        <Button onClick={this.closeLoginModal}>نه</Button>
                        <Button
                          style={{ width: '130px' }}
                          positive
                          as={Link}
                          to={LOGIN}
                          onClick={this.closeLoginModal}
                        >ادامه
                        </Button>
                      </Modal.Actions>
                    </Fragment>
                  }
                />
              </Card.Content>
            }
            {stats ? (
              <Card.Content>
                <Segment inverted>
                  <Grid columns="equal" textAlign="center">
                    <Grid.Row>
                      <Grid.Column>
                        <Statistic size="tiny" inverted>
                          <Statistic.Value>{stats.seen_load}</Statistic.Value>
                          <Statistic.Label>تعداد نمایش آگهی</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                      <Grid.Column>
                        <Statistic size="tiny" inverted>
                          <Statistic.Value>{stats.seen_contact}</Statistic.Value>
                          <Statistic.Label>تعداد افرادی که شماره آگهی را دیده اند</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Card.Content>
            ) : null}
            {showManageButtons
              && <Card.Content>
                {!stats && <Button
                  size="large"
                  onClick={() => {
                    this.onGetStatsClicked(load.loadID);
                  }}
                  content="آمار"
                  loading={this.state.statsLoading}
                />}
                <Button
                  size="large"
                  as={Link}
                  to={`/edit-load/${load.loadID}`}
                  content="ویرایش"
                />
                <Button
                  size="large"
                  style={{
                    float: 'left',
                  }}
                  onClick={() => {
                    this.setState({
                      deleteLoadConfirm: true,
                    });
                  }}
                  color="red"
                  content="حذف"
                  loading={this.state.deleteLoading}
                  disabled={this.state.deleteLoading}
                />
                <Modal
                  size="tiny"
                  open={this.state.deleteLoadConfirm}
                  onClose={() => {
                    this.setState({
                      deleteLoadConfirm: false,
                    });
                  }}
                  content={
                    <Fragment>
                      <Modal.Header style={{ textAlign: 'right' }}>حذف آگهی!</Modal.Header>
                      <Modal.Content>
                        <p
                          style={{
                            width: '100%',
                            textAlign: 'right',
                          }}
                        >
                          آیا از حذف این آگهی اطمینان دارید؟
                        </p>
                      </Modal.Content>
                      <Modal.Actions style={{ textAlign: 'left' }}>
                        <Button
                          onClick={() => {
                            this.setState({
                              deleteLoadConfirm: false,
                            });
                          }}
                        >نه
                        </Button>
                        <Button
                          style={{ width: '130px' }}
                          negative
                          onClick={() => {
                            this.onDeleteClicked(load.loadID);
                          }}
                        >حذف
                        </Button>
                      </Modal.Actions>
                    </Fragment>
                  }
                />
              </Card.Content>
            }
            <Modal
              size="tiny"
              open={this.state.showSubmitOfferModal}
              onClose={this.onSubmitOfferClose}
              content={
                <Fragment>
                  <Modal.Header style={{ textAlign: 'right' }}>پیشنهاد قیمت</Modal.Header>
                  <Modal.Content>
                    <Form>
                      <Form.Field key='price'>
                        <label style={{ textAlign: 'right' }}>
                          قیمت پیشنهاد (کیلو به تومان)
                        </label>
                        <Form.Input
                          fluid
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              offerPrice: event.target.value,
                            });
                          }}
                        />
                      </Form.Field>
                      <Form.Field key='description'>
                        <label style={{ textAlign: 'right' }}>
                          توضیحات
                        </label>
                        <TextArea
                          placeholder='اگر توضیح و یا ملاحظه ی دیگری دارید بنویسید ...'
                          style={{ minHeight: 100 }}
                          onChange={(event) => {
                            this.setState({
                              offerDescription: event.target.value,
                            });
                          }}
                        />
                      </Form.Field>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions style={{ textAlign: 'left' }}>
                    <Button onClick={this.onSubmitOfferClose}>بستن </Button>
                    <Button
                      style={{ width: '130px' }}
                      positive
                      onClick={this.submitOffer}
                    >ارسال پیشنهاد
                    </Button>
                  </Modal.Actions>
                </Fragment>
              }
            />
          </Card>
        </Grid.Column>
      </Fragment>
    );
  }

  onGetStatsClicked(loadID) {
    const param = {
      loadID,
    };

    this.setState({
      statsLoading: true,
    }, () => this.props.getLoadStats(param));
  }

  onDeleteClicked(loadID) {
    const param = {
      loadID,
    };
    this.setState({
      deleteLoadConfirm: false,
      deleteLoading: true,
    }, () => this.props.deleteLoad(param));
  }

  onGetContact(loadID) {
    const parameters = {
      loadID,
    };
    this.setState({
      showContactModal: true,
    }, () => this.props.getLoadContact(parameters));
  }

  onSubmitOfferShow(loadID) {
    this.setState({
      showSubmitOfferModal: true,
      offerForLoad: loadID,
    });
  }

  onSubmitOfferClose() {
    this.setState({
      showSubmitOfferModal: false,
      offerForLoad: null,
      offerPrice: null,
      offerDescription: null,
    });
  }

  submitOffer() {
    const { offerForLoad, offerPrice, offerDescription } = this.state;
    const offer = {
      offerForLoad,
      offerPrice,
      offerDescription,
    };
    this.props.sendOffer(offer);
    this.onSubmitOfferClose();
  }

  getRegDate(rawDate) {
    const serverTime = this.props.serverTime;
    const delta = serverTime - Number(rawDate);
    if (delta < 60) {
      return 'لحظاتی پیش';
    } else if (delta < 60 * 15) {
      return 'دقایقی پیش';
    } else if (delta < 60 * 30) {
      return 'یک ربع پیش';
    } else if (delta < 60 * 60) {
      return 'نیم ساعت پیش';
    } else if (delta < 60 * 90) {
      return 'یک ساعت پیش';
    }
    return this.getJalaliDate(rawDate, serverTime);
  }


  getJalaliDate(rawDate, serverTime, returnObject = false) {
    if (!rawDate || !serverTime) return '';

    const longDate = Number(rawDate) * 1000;
    const d = new Date(longDate);

    const STlongDate = Number(serverTime) * 1000;
    const STd = new Date(STlongDate);

    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();

    const STy = STd.getFullYear();
    const STm = STd.getMonth() + 1;
    const STday = STd.getDate();

    let h = d.getHours();
    let min = d.getMinutes();

    const jal = jalaali.toJalaali(y, m, day);

    if (returnObject) {
      return {
        isToday: y === STy && m === STm && day === STday,
        jal: jal,
      }
    }

    if (y === STy && m === STm && day === STday) {
      return `${h}:${min} - امروز`;
    }

    let { jm, jd } = jal;
    jm = jm < 10 ? `0${jm}` : `${jm}`;
    jd = jd < 10 ? `0${jd}` : `${jd}`;
    h = h < 10 ? `0${h}` : `${h}`;
    min = min < 10 ? `0${min}` : `${min}`;

    return `${h}:${min} - ${jal.jy}/${jm}/${jd}`;
  }

  onShareLoad() {
    const mobileNumber = this.mobileNumber;
    const loadID = this.props.load.loadID;
    const parameters = {
      phone_number: mobileNumber,
      loadID,
    };
    this.setState({
      shareLoading: true,
    }, () => this.props.onShareLoad(parameters));
  }

  // isLoadMarked() {
  //   const bookmarks = this.props.bookmarkList;
  //   if (!bookmarks) return false;
  //   const loadId = this.props.load.loadID;
  //   let isMarked = false;
  //   bookmarks.map((load) => {
  //     if (load === loadId) {
  //       isMarked = true;
  //     }
  //   });
  //   return isMarked;
  // }

  findProvince(province) {
    let title = '';
    this.props.provinces.map((item) => {
      if (item.id === province) {
        title = item.title;
      }
    });
    return title;
  }

  // onBookmarkClicked(id, isLoadMarked) {
  //   if (isLoadMarked) {
  //     this.props.onRemoveLoadFromBookmarks(id);
  //   } else {
  //     this.props.onSetLoadBookmarked(id);
  //   }
  // }
}

LoadCards.propTypes = {
  load: PropTypes.object,
  type: PropTypes.string,
  // onSetLoadBookmarked: PropTypes.func.isRequired,
  // onRemoveLoadFromBookmarks: PropTypes.func.isRequired,
  // bookmarkList: PropTypes.array,
  provinces: PropTypes.array,
  onShareLoad: PropTypes.func.isRequired,
  shareResponse: PropTypes.object,
  clearResponse: PropTypes.func.isRequired,
  shareLoadResponse: PropTypes.object,
  tokenStatus: PropTypes.number,
  serverTime: PropTypes.number,
  getLoadContact: PropTypes.func.isRequired,
  contactInfo: PropTypes.object,
  deleteLoad: PropTypes.func.isRequired,
  getLoadStats: PropTypes.func.isRequired,
  loadStats: PropTypes.object,
  deleteLoadStatus: PropTypes.object,
  callBackDeleteLoad: PropTypes.func,
  clearDeleteResponse: PropTypes.func,
  sendOffer: PropTypes.func,
  show_day_devider: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loadcards: makeSelectLoadCards(),
  // bookmarkList: RootSelectors.makeSelectBookmarkList(),
  provinces: RootSelectors.makeSelectProvinces(),
  shareLoadResponse: makeSelectShareResponse(),
  tokenStatus: RootSelectors.makeSelectTokenResponse(),
  serverTime: RootSelectors.makeSelectServerTime(),
  contactInfo: makeSelecContactInfo(),
  loadStats: makeSelectLoadsStats(),
  deleteLoadStatus: makeSelectDeleteLoad(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // onSetLoadBookmarked: bindActionCreators(LoadCarsActions.setLoadBookmarked, dispatch),
    // onRemoveLoadFromBookmarks: bindActionCreators(LoadCarsActions.removeLoadFromBookmarks, dispatch),
    onShareLoad: bindActionCreators(LoadCarsActions.shareLoad, dispatch),
    clearResponse: bindActionCreators(LoadCarsActions.clearShareLoadResponse, dispatch),
    getLoadContact: bindActionCreators(LoadCarsActions.getLoadContacts, dispatch),
    deleteLoad: bindActionCreators(LoadCarsActions.deleteLoad, dispatch),
    getLoadStats: bindActionCreators(LoadCarsActions.getLoadStats, dispatch),
    clearDeleteResponse: bindActionCreators(LoadCarsActions.clearDeleteResponse, dispatch),
    sendOffer: bindActionCreators(LoadCarsActions.sendOffer, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'loadCards',
  reducer,
});
export default compose(
  withReducer,
  withConnect,
)(LoadCards);
