/**
 * SupportPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { Grid, Button, Header, Icon, Loader, Segment, Container, ButtonGroup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Support extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Fragment>
        <style>
          {`

          `}
        </style>
        <Helmet>
          <title>اگمارکت | درباره ما</title>
          <meta
            name="description"
            content="پشتیبانی اپلیکیشن اگمارکت برای اندروید و ios. جستجو از میان صدها بار روزانه در اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment stacked>
                درباره ما
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment placeholder padded textAlign="right">
                <Container text>
                  <p>
                    محصولی از شرکت سامانه پیروزه دیبا.<br/>
                    بخاطر اینکه از اگمارکت استفاده میکنید از شما سپاسگزاریم.
                    <br/><br/>
                    اگمارکت بازار آنلاین تجارت B2B در سراسر کشور است که در زمینه ی خرید و فروش تخم مرغ خوراکی (عمده فروشی) و ایجاد تعامل و مبادلات تجاری مابین تامین کنندگان و خریداران فعالیت میکند. خریداران میتوانند با استفاده از اگمارکت از تامین کنندگان به واسطه ی سیستم ارتباطی مستقیم، استعلام قیمت محصول مورد نظر را دریافت کنند. ارتباط بدون واسطه بین خریداران و تامین کنندگان از جمله مزیت های اگمارکت است که در اختیار کاربران قرار میدهد. علاوه بر این تولید کنندگان و بنکداران و توزیع کنندگان نیز میتوانند با پیوستن به دیگر تامین کنندگان در اگمارکت، محصولات خود را از طریق این بازار آنلاین B2B به فروش برسانند.
                    <br/><br/>
                  </p>
                  <p>
                    در صورت داشتن هر گونه سوال، انتقاد و یا پیشنهاد میتوانید از طریق تلگرام با ما در ارتباط باشید:
                  </p>
                  <p>
                    <a href='tg://resolve?domain=IranEggs' target='_blank'>
                      <Button
                        style={{
                          backgroundColor: '#259DDB',
                          color: 'white',
                        }}>پشتیبانی از طریق تلگرام</Button>
                    </a>
                  </p>
                  <p>
                    کانال تلگرام:
                  </p>
                  <p>
                    <a href='tg://resolve?domain=eggmarkets' target='_blank'>
                      <Button
                        style={{
                          backgroundColor: '#259DDB',
                          color: 'white',
                        }}>کانال تلگرام</Button>
                    </a>
                  </p>
                  <p>
                    پست الکترونیکی:
                  </p>
                  <p>
                    <a href='mailto:info@eggmarket.ir' target='_blank'>
                      <Button
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                        }}>info@eggmarket.ir</Button>
                    </a>
                  </p>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}
