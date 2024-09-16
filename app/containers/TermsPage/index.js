/**
 * TermsPage
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

export default class Terms extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <title>اگمارکت | شرایط استفاده</title>
          <meta
            name="description"
            content="شرایط استفاده از اگمارکت. جستجو از میان ۱۰ هزاربار روزانه در سامانه جستجو و اعلام بار اگمارکت از همه ی نقاط ایران" />
        </Helmet>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment stacked>
                شرایط استفاده
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment placeholder textAlign="right">
                <Container text>
                  <br/>
                  <p>
                    کاربر با ورود به سایت اگمارکت یا ثبت نام در آن، شرایط زیر را می‌پذیرد:
                  </p>
                  <p>
                    ماده ۱
                    <br />
                    تعاریف و اصطلاحات : اصطلاحاتی که در این قوانین و مقررات به کار رفته است دارای معانی مشروح زیر است:
                    <br />
                    ۱-۱: صاحب بار: افرادی که در برنامۀ مشتری یا وبسایت اگمارکت به منظور ارسال بار ثبت‌نام کرده‌اند.
                    <br />
                    ۲-۱: گیرنده: شخص حقیقی یا حقوقی که توسط صاحب بار به عنوان گیرنده بار معرفی شده است..
                    <br />
                    ۳-۱: بار: محموله ای که قرار است توسط راننده و به درخواست صاحب بار حمل شده و به گیرنده برسد.
                    <br />
                    ۴-۱: کاربر:هر شخص حقیقی یا حقوقی که وارد وبسایت یا اپلیکیشن شده و فارغ از فعالیت خاصی از آنها بازدید می کند.
                    <br />
                    ۵-۱: کاربران: صاحبان بار و بنکداران و توزیع کنندگان تشکیل دهنده ی کاربران هستند.
                    <br />
                    ۶-۱: شرکت: ارائه دهندۀ سرویس اگمارکت.
                    <br />
                    ۷-۱: اگمارکت: سرویسی که شرکت اگمارکت ارائه می‌دهد.
                    <br />
                    ۸-۱: حساب کاربری: حسابی است که افراد برای استفاده از سرویس اگمارکت در نرم‌افزار اگمارکت ایجاد کرده‌اند.
                    <br />
                    ۹-۱: اطلاعات محرمانه: اطلاعاتی که توسط کاربران در اختیار اگمارکت قرار داده می‌شود مانند شماره تماس، آدرس محل اقامت، ایمیل و غیره.
                    <br />
                  </p>
                  <p>
                    ماده ۲ - حساب کاربری
                    <br />
                    ۱-۲: کاربر با ثبت نام در اگمارکت می‌پذیرد که قوانین و مقررات اگمارکت را به صورت کامل مطالعه کرده و قبول کرده است. این قوانین ممکن است در طول زمان تغییر کند، استفادۀ مستمر کاربران از اگمارکت به معنی پذیرش هرگونه تغییر در قوانین و مقررات آن است.
                    <br />
                    ۲-۲: برای استفاده از اگمارکت لازم است که هر کاربر یک حساب کاربری در اگمارکت بسازد. تنها افرادی که بیش از ۱۸ سال سن و واجد اهلیت قانونی باشند می‌توانند اقدام به ساختن حساب کاربری در اگمارکت کنند. برای استفاده از اگمارکت کاربر باید نام، نام خانوادگی و شماره همراه خود را در نرم افزار اگمارکت ثبت کند.
                    <br />
                    ۳-۲: کاربر می‌پذیرد اطلاعات خواسته شده را به صورت صحیح و به روز در سرویس اگمارکت وارد کند.
                    <br />
                    ۴-۲: هر فرد تنها می‌تواند یک حساب کاربری به عنوان کاربر در اگمارکت داشته باشد.
                    <br />
                    ۵-۲: مسئولیت همۀ فعالیت‌هایی که از طریق حساب کاربری اشخاص در اگمارکت یا سایر خدمات مربوط به اگمارکت انجام می‌شود به عهدۀ کاربر است.
                    <br />
                    ۶-۲: مسئولیت حفظ امنیت اطلاعات حساب کاربری از جمله نام کاربری و رمز عبور به عهدۀ کاربر است. در صورت مفقود شدن یا سرقت اطلاعات حساب کاربری، کاربر موظف است در اسرع وقت موضوع را به اطلاع ما برساند. بدیهی است تا زمانی که اطلاع‌رسانی به اگمارکت انجام نشده است مسئولیت همۀ فعالیت‌هایی که از طریق حساب کاربری مذکور انجام شده و می‌شود به عهدۀ کاربر خواهد بود.
                    <br />
                    ۷-۲: کاربر حق ندارد به اشخاص حقیقی و حقوقی دیگر اجازه استفاده از حساب کاربری خود را بدهد یا حساب خود را به فرد یا شرکت دیگری منتقل کند.
                    <br />
                    ۸-۲: در شرایط خاصی ممکن است از کاربر برای استفاده از سرویس، درخواست احراز هویت شود، در چنین شرایطی اگر کاربر اطلاعات کافی در اختیار ما قرار ندهد، اگمارکت می‌تواند حساب کاربری وی را مسدود کرده و از ارائۀ سرویس به کاربر خودداری کند.
                    <br />
                  </p>
                  <p>
                    ماده ۳ - استفاده از اگمارکت
                    <br />
                    ایران یا مخالف با عرف جامعه استفاده نکند. کاربر حق ندارد اشیاء غیر مجاز از جمله مشروبات الکلی، مواد مخدر، سلاح یا سایر اشیاء یا حیواناتی که طبق قانون جمهوری اسلامی ایران مجاز نیست از طریق این سرویس ارسال نموده یا همراه داشته باشد.
                    <br />
                    ۲-۳: کاربر متعهد می‌شود هیچگاه از سرویس اگمارکت به صورتی که به اگمارکت یا شرکای آن صدمه ای وارد کند استفاده نکند.
                    <br />
                    ۳-۳: کاربر می‌پذیرد که اگمارکت ممکن است از ارسال پیامک به عنوان راه ارتباطی شرکت با وی استفاده کند. کاربر می‌تواند درخواست کند که ارسال این پیام‌ها قطع شود اما می‌پذیرد که با انصراف از دریافت این پیام‌ها، ممکن است در استفاده از سرویس با مشکل مواجه شود.
                    <br />
                    ۴-۳: اگمارکت ممکن است کدهایی به منظور هدیه به کاربر ارائه کند که با وارد کردن این کدها در برنامه، یا درصدی از هزینه کاسته یا مبلغ مشخصی به حساب کاربر در اگمارکت اضافه می‌شود.
                    <br />
                    ۵-۳: کاربر می‌پذیرد که اجازۀ انتقال یا فروش کدها را به افراد دیگر ندارد. همچنین کاربر مجاز نیست این کدها را به صورت عمومی منتشر کند (حتی اگر اگمارکت در فضاهای عمومی این کدها را منتشر کرده باشد) مگر اینکه اگمارکت راگمارکتَ این اجازه را به آنها داده باشد.
                    <br />
                    ۶-۳: کاربر می‌پذیرد کدهایی که جهت افزایش اعتبار یا کاهش هزینه حمل به آنها داده می‌شود ممکن است منقضی شوند. از آنجایی که اگمارکت برای ارائه این کدها هزینه‌ای از کاربران دریافت نمی‌کند، این حق برای آن محفوظ است که مبلغ یا درصد تاثیر این کدها را حتی پس از انتشار آنها تغییر دهد یا در صورت لزوم آنها را باطل کند. همچنین درصورتی که اگمارکت تشخیص دهد که استفاده از این کد به دلیل خطای فنی یا تخلف صورت گرفته و یا غیر قانونی بوده است، می‌تواند این کدها یا اعتباری که در نتیجۀ استفاده از آنها به حساب کاربر اضافه شده است را باطل یا حذف کند که در این صورت تمام مسئولیت ها به عهده ی کاربر متخلف است.
                    <br />
                    ۷-۳- مسئولیت تامین اینترنت و سخت‌افزار لازم و همچنین پرداخت هزینه‌های مربوط به آنها برای استفاده از سرویس اگمارکت به عهدۀ کاربر است.
                    <br />
                    ۸-۳: کاربر می‌پذیرد حداکثر بار مجاز در هر ماشین همان است که در کارت ماشین نوشته شده و زدن اضافه بار به هیچ وجه حتی با توافق صاحب بار و راننده مجاز نمی‌باشد.
                    <br />
                    ۹-۳: کاربر متعهد می‌شود پس از اتمام حمل از هیچ بخش از اطلاعاتی که در نتیجه استفاده از سرویس اگمارکت، از تولیدکنندگان و یا توزیع کنندگان کسب کرده است هیچگونه استفاده‌ای نکند. استفادۀ کاربر از این اطلاعات باید مطابق با عرف جامعه و قوانین جمهوری اسلامی ایران باشد.
                    <br />
                    ۱۰-۳: با استفاده از سرویس اگمارکت کاربر می‌پذیرد که در حین حمل، اگمارکت را وسیله‌ای برای تبلیغات و بازاریابی کالاهای دیگر و خدمات شخصی خود قرار ندهد و از هرگونه معرفی و عرضۀ محصولات و خدمات شخصی و یا متعلق به دیگران خارج از چهارچوب، خودداری کند.
                    <br />
                    ۱۱-۳: کاربر متعهد به رعایت همۀ قوانین راهنمایی و رانندگی، اسلامی، شرعی، اخلاقی و اجتماعی جمهوری اسلامی ایران هنگام استفاده از اگمارکت، است.
                    <br />
                    ۱۲-۳- کاربر می‌پذیرد که متن حریم شخصی اگمارکت را مطالعه کرده است و مورد قبول وی است.
                    <br />
                    ۱۳-۳: کاربر می‌پذیرد که اگمارکت خدمات تولید و توزیع بار نیست بلکه تنها یک خدمات نرم افزاری است که ارتباط بین تولیدکنندگان و توزیع کنندگان را جهت توافق بر انجام یک معامله و سپس حمل بار، فراهم می‌کند. در سرویس اگمارکت خریدار مختار است یک دراعلام بار را بپذیرد یا رد کند، همچنین صاحب بار مختار است پس از ارسال درخواست خرید، مشخص شدن راننده و قبل از آغاز عزیمت راننده به نقطه مبداء، حمل را انجام دهد یا خیر. لذا هر حملی که صاحب بار با راننده انجام می‌دهد باید به عنوان یک قرارداد لازم مستقل بین خریدار و صاحب بار در نظر گرفته شود.
                    <br />
                    ۱۴-۳: خدمات اگمارکت ممکن است با مشارکت خدمات شرکت‌های دیگری ارائه شود که شرکت اگمارکت کنترلی روی آنها ندارد. در چنین شرایطی کاربر می‌پذیرد که این خدمات، قوانین استفاده و مقررات مختص خود را دارند و اگمارکت مسئولیتی در خصوص قوانین و خدمات این شرکت‌ها ندارد.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۴ – هزینه‌ها و پرداخت
                    <br />
                    ۱-۴- کاربر می‌پذیرد امکان استرداد هزینه‌هایی که کاربر به اگمارکت می‌پردازد وجود ندارد.
                    <br />
                    ۲-۴- کاربر می‌پذیرد هزینۀ سرویس از قبل از طرف اگمارکت مشخص می‌شود و پس از استفاده از آن اعتراضی نسبت به هزینۀ سرویس نمی‌تواند داشته باشد.
                    <br />
                    ۳-۴- پرداخت هزینۀ سرویس فقط از طریق روش‌هایی که توسط اگمارکت مشخص می‌شود، می‌تواند صورت گیرد. این روش‌ها عبارتند از پرداخت اعتباری از داخل برنامۀ موبایل، پرداخت اینترنتی برای افزایش اعتبار و سایر روش هایی که ممکن است در آینده به سامانه اضافه شوند.
                    <br />
                    ۴-۴- کاربر می‌پذیرد هزینۀ سرویس ارائه شده ممکن است بسته به ویژگی‌های سرویس ارائه شده از جمله نوع سرویس، زمان سرویس، مکان سرویس یا عوامل دیگر متغیر باشد.
                    <br />
                    ۵-۴: کاربر می‌پذیرد هزینۀ سرویس ارائه شده ممکن است بسته به ویژگی‌های سرویس ارائه شده از جمله نوع سرویس، زمان سرویس، مکان سرویس (مبدا، مقصد یا مسیر حمل) یا عوامل دیگر متغیر باشد.
                    <br />
                    ۶-۴: کاربر می‌پذیرد که باید هزینۀ سرویس را مستقل از هر گونه مشکلی که ممکن است در برنامه اگمارکت جهت پرداخت آنلاین به وجود بیاید به شرکت پرداخت کند. در صورتی که به دلیل مشکلی در برنامه اگمارکت یا مشکلات ارتباطی از جمله اینترنت و شبکۀ تلفن همراه امکان پرداخت از طریق اپلیکیشن فراهم نشود صاحب بار همچنان موظف به پرداخت هزینه خواهد بود. در این شرایط پرداخت هزینه ممکن است با هماهنگی کاربرد با دفتر شرکت اگمارکت یا روش‌های دیگر صورت پذیرد. در صورتی که صاحب بار به هر دلیلی از جمله مشکلات اپلیکیشن پرداخت را انجام نداده باشد، شرکت حق دارد مبلغ حمل را از اعتبار کاربر در اگمارکت کسر کند.
                    <br />
                    ۷-۴: صاحب بار می‌پذیرد هر گونه آسیب به خودروی راننده در نتیجه استفاده از سرویس با حساب کاربری وی ایجاد شود، مسئولیت تامین هزینه‌های مربوطه به عهده وی خواهد بود. این موارد شامل توقیف خودرو در نتیجه مسروقه یا مشکوک بودن بار و از این قبیل می‌باشد. در چنین مواردی اگمارکت حق دارد این هزینه ها را از اعتبار موجود در حساب اگمارکت صاحب بار کسر یا از وی وصول کند.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۵ - مسئولیت اگمارکت
                    <br />
                    ۱-۵- اگمارکت با تمام امکانات خود از جمله واحدهای خدمات مشتریان و پشتیبانی تمامی تلاش خود را جهت رضایت کاربران، رفع اختلافات ایجاد شده در زمان ارائه و استفادۀ خدمات اگمارکت بین کاربران و ایجاد صلح و سازش در بین آنها می‌کند.
                    <br />
                    ۲-۵- اگمارکت با استفاده از نظارت‌های خود تلاش می‌کند سرویس با کیفیت به کاربران، سلامت ، زمان ارائۀ سرویس و یا کیفیت و سلامت محصولاتی که با استفاده از سرویس‌های اگمارکت خریداری شود ارائه دهد.
                    <br />
                    ۳-۵- اگمارکت تلاش خود را جهت استفاده از سرویس ارائه شده توسط کاربران محترم می‌کند اما تضمینی نسبت به اجرا شدن آن روی همۀ دستگاه‌ها یا همۀ شبکه‌های ارتباطی (اینترنت، شبکه تلفن‌همراه و …) نخواهد داد.
                    <br />
                    ۴-۵- تمامی اطلاعات کاربران به‌عنوان اطلاعات محرمانه نزد اگمارکت محافظت شده و دسترسی به آن توسط اشخاص ثالث ممنوع بوده مگر برابر تصمیم مقام صالح.
                    <br />
                    ۵-۵- چنانچه هر یک از کاربران اگمارکت در زمان استفاده از خدمات آن با مشکلی مواجه شوند، برابر شرایط فوق می‌توانند شکایت خود را از طریق واحدهای خدمات مشتریان و پشتیبانی مطرح کنند و اگمارکت پیگیری لازم و تلاش خود را جهت حل و فصل اختلافات به‌عمل خواهد آورد.
                    <br />
                    ۶-۵- جهت اطلاع بیشتر کاربران با نحوه و شرایط ارائۀ خدمات اگمارکت و استفاده از اپلیکیشن‌ ، همۀ اطلاعات مورد نیاز کاربران توسط اگمارکت در اپلیکیشن قرار داده شده است و اشخاص می‌توانند با مراجعه به قسمت مذکور و مطالعۀ آنها کاملا با شرایط ذکر شده و خدمات اگمارکت آشنا شوند. همچنین همکاران ما در واحد خدمات مشتریان پاسخگوی هر گونه ابهام و سؤال کاربران هستند.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۶ – مسئولیت کاربران
                    <br />
                    ۱-۶: مسئولیت همۀ اقدامات و افعال کاربران تولیدکننده و توزیع کننده که ناشی از عدم رعایت قوانین موضوعه جمهوری اسلامی ایران از جمله قانون مجازات اسلامی (ارتکاب جرم در هنگام حمل) و قوانین مدنی (ورود خسارت به اموال کاربر) باشد، برعهدۀ شخص متخلف بوده و اگمارکت هیچ گونه مسئولیتی در قبال اعمال و افعال فوق نداشته و نخواهد داشت و اگمارکت می‌تواند ضمن غیر فعال کردن متخلف، از طریق مراجع صالح اقدامات قانونی را علیه نامبرده نسبت به احقاق حقوق قانونی اگمارکت به‌عمل آورد.
                    <br />
                    ۲-۶- هر گونه اقدامی از سوی کاربران که منجر به ورود خسارت به شهرت تجاری، نام و اعتبار اگمارکت شود تخلف از شرایط قراردادی و قانونی تلقی و اگمارکت حق غیر فعال نمودن کاربر و اقدام قانونی علیه وی را جهت مطالبه خسارت و احقاق حقوق قانونی خود خواهد داشت.
                    <br />
                    ۳-۶: صاحب بار موظف است بار را در زمان اعلام شده آماده ارسال داشته باشد و مسئولیت هرگونه تاخیر در بارگیری یا تخلیه به عهده وی بوده و باید ضرر و زیان راننده را جبران نماید.
                    <br />
                    ۴-۶:  فروشنده و خریدار متعهد می‌شوند که در تمام زمان حمل بار موبایل خود را به صورت روشن همراه داشته باشد و به تماس‌های اگمارکت و صاحب بار پاسخ صحیح دهد.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۷ - شرایط بار به شرح زیر است:
                    <br />
                    ۱-۷:  تولیدکننده و یا صاحب بار باید مجوزهای لازم برای حمل بار را از مراجع ذیصلاح، قبل از ارسال بار اخذ نماید و در اختیار خریدار قرار دهد.
                    <br />
                    ۲-۷: بار باید متناسب با خودرو بوده به نحوی که متعارف محسوب و وزن و نوع آن متناسب با وزن و شرایطی باشد که از طرف کارخانۀ سازندۀ خودرو تعیین شده باشد.
                    <br />
                    ۳-۷: انتقال بار و کالا بدون حضور صاحب بار (مالک کالا) ممنوع است و کاربر حق ارسال کالا را نخواهد داشت، در صورت عدم رعایت، همۀ مسئولیت‌های ناشی از این تخلف برعهدۀ اقدام کنندگان آن است و اگمارکت حق دارد نسبت به قطع دسترسی اقدام و مبادرت به پیگیری قانونی از جمله مطالبۀ خسارت از شخص متخلف کند.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۸ - موارد فنی
                    <br />
                    ۱-۸ کاربر حق ندارد هیچ‌گونه تلاشی در جهت استخراج سورس کد (Source Code) نرم‌افزارهای اگمارکت شامل دیکامپایل(Decompile) ، مهندسی معکوس(Reverse Engineering) یا فعالیت‌های مشابه انجام دهد، مگر اینکه اجازۀ چنین کاری به صورت قانونی صادر شده باشد.
                    <br />
                    ۲-۸- کاربر مجاز نیست با استفاده از روش‌های Framing یا Mirroring یا روش‌های دیگر نسخۀ دیگری از سرویس اگمارکت را روی سرورهای دیگر ارائه کند. همچنین کاربر مجاز نیست در نرم‌افزار اگمارکت یا در روش ارائۀ سرویس اگمارکت تغییر یا اخلالی ایجاد کند.
                    <br />
                    ۳-۸- کاربر حق ندارد برنامه یا اسکریپتی با هدف ایندکس گذاری (Indexing)، مطالعه یا هر گونه فعالیت داده‌کاوی روی سرویس اجرا کند.
                    <br />
                    ۴-۸-کاربر حق ندارد هیچ فعالیتی در راستای حصول دسترسی غیرقانونی و غیرمتداول به هیچ بخش سرویس اگمارکت یا سرویس های مرتبط با اگمارکت انجام دهد.
                    <br />
                    ۵-۸-کاربر متعهد است که هیچ عملی (به صلاحدید خودمان) که ممکن است بی دلیل، ناخواسته یا بطور نامناسب فشار زیادی را به زیرساخت سازمان ما تحمیل کند انجام ندهد.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۹ - محتوای تولید شده توسط کاربران
                    <br />
                    اگمارکت ممکن است گاهی به کاربران اجازه دهد که در وب سایت، برنامه موبایل و یا سایر بخش‌های این سرویس عکس، متن، فایل صوتی، فایل تصویری یا فایل‌های مشابه منتشر کنند. مالکیت هر مطلب (شامل متن، عکس، فایل صوتی، فایل تصویری و …) که به این شکل در سرویس ثبت شود همچنان متعلق به کاربران خواهد بود؛ اما با ثبت آنها در سرویس‌های مرتبط به اگمارکت کاربران این حق را به اگمارکت می‌دهند که آنها را در هر مکان و هر زمانی به صورت دیجیتال یا چاپی برای هر نوع کاربردی منتشر کند. همچنین اگمارکت مجاز است حق انتشار این مطالب را به اشخاص یا شرکت‌های دیگر منتقل کند.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۱۰ - قطع سرویس
                    <br />
                    اگمارکت در شرایطی که به هر دلیل به این نتیجه برسد حضور یک کاربر می‌تواند برای شرکت یا سایر مشتریان خطرناک یا نامطلوب باشد، حق حذف دسترسی کاربر مذکور به سرویس اگمارکت را دارد.
                    <br />
                  </p>
                  <p>
                    ‌ ماده ۱۱ - توافق از راه دور
                    <br />
                    ۱-۱۱: کاربر توافق می‌کند جهت مبادلۀ آسان اطلاعات، همۀ تغییرات و الحاقیه‌های قوانین و مقررات حاضر اعم از تغییر و اضافه کردن شروط آن، ارسال اخطاریه و ابلاغیه‌های مربوط به اگمارکت، از طریق سیستم رایانه‌ای اگمارکت به‌عمل آید و کاربر ضمن پذیرش اطلاع از شرط و روند اجرایی آن موافقت خود را نسبت به اعمال شرط مذکور اعلام می‌کند.
                    <br />
                    ۲-۱۱: مسئولیت حفظ و حراست از حساب کاربر برعهدۀ کاربر بوده و کاربر ضمن پذیرش این مسئولیت، همۀ داده پیام‌های صادره از طریق حساب کاربری مذکور را منتسب به خود دانسته و هرگونه ادعایی نسبت به انکار، تردید و جعل داده پیام‌های ارسال شده از ناحیۀ نامبرده غیر قابل استماع و مردود است.
                    <br />
                    ۳-۱۱: کاربر می‌پذیرد هر گونه رویه، اشکال، عبارات مبین تایید و اعلام قبولی و تصدیق داده پیام‌های صادره از طرف اگمارکت به منزله امضا الکترونیکی و قبولی محسوب می‌شود و هر گونه ادعایی نسبت به امضا و قبولی مذکور غیر قابل استماع و مردود است.
                    <br />
                    ۴-۱۱: کاربر با عضویت در سرویس اگمارکت قصد و اراده خود را نسبت به پذیرش انعقاد هرگونه اقدام و عمل حقوقی از جمله عقود و معاملات از راه دور و از طریق سیستم رایانه‌ای و الکترونیکی اعلام می‌کند.
                    <br />
                  </p>
                  <p>
                    ماده ۱۲ - سلب مسئولیت
                    <br />
                    ۱-۱۲: ما تنها متعهد به وعده های صریح و آشکاری هستیم که در این توافقنامه دادهایم. در قبال برداشتهای
                    ضمنی از توافقنامه هیچ تعهد و مسئولیتی نداریم.
                    <br />
                    ۲-۱۲: تلاش اگمارکت، ثبت بارهایی با با اطلاعات صحیح و درست است اما نمی‌تواند صحت بارها را تضمین نماید و
                    هیچ‌گونه تعهد یا مسئولیتی در قبال بارهای ثبت شده در اگمارکت برعهده نمی‌گیرد.
                    <br/><br/><br/>
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
