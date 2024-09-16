/**
 * DownloadPage
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

export default class Download extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <title>اگمارکت | دریافت اپلیکیشن</title>
          <meta
            name="description"
            content="دریافت اپلیکیشن اگمارکت برای اندروید و ios. جستجو از میان صدها بار روزانه در اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment stacked>
                دریافت اپلیکیشن
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment placeholder padded textAlign="right">
                <Container text>
                  <p>
                    برای دریافت اپلیکیشن اندروید اگمارکت میتوانید از راه های زیر اقدام نمایید:
                  </p>
                  {/*<p>*/}
                    {/*<a href='https://cafebazaar.ir/app/ir.eggmarket.driver/?l=fa' target='_blank'>*/}
                      {/*<Button*/}
                        {/*style={{*/}
                          {/*backgroundColor: '#91b42f',*/}
                          {/*color: 'white',*/}
                        {/*}}>دریافت از کافه بازار</Button>*/}
                    {/*</a>*/}
                  {/*</p>*/}
                  <p>
                    <a href='https://eggmarket.ir/assets/app/latest.apk' target='_blank'>
                      <Button color='black'>لینک مستقیم</Button>
                    </a>
                  </p>
                  <p>
                    اگر IOS دارید یا میخواهید بر روی کامپیوتر از اگمارکت استفاده کنید،
                  </p>
                  <p>
                    پیشنهاد ما به شما وبسایت است:
                  </p>
                  <p>
                    <a href='https://eggmarket.ir/' target='_blank'>
                      <Button color='black'>وبسایت اگمارکت</Button>
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
