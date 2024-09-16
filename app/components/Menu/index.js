/**
 *
 * Menu
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Responsive,
  Menu as SemanticMenu,
  Dropdown,
  Icon,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as RouterConst from "../../utils/RouterConsts";

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  renderlogedInMenu(screen) {
    const menuItems = [
      {
        key: "list",
        as: Link,
        to: RouterConst.LIST,
        content: "لیست آگهی ها",
      },
      {
        key: "prices",
        as: Link,
        to: RouterConst.PRICES,
        content: "قیمت روز",
      },
      {
        key: "calculator",
        as: Link,
        to: RouterConst.CALCULATOR,
        content: "ماشین حساب",
        new_tab: true,
      },
      {
        key: "my_loads",
        as: Link,
        to: RouterConst.MY_LOADS,
        content: "آگهی های من",
      },
      {
        key: "terms",
        as: Link,
        to: RouterConst.TERMS,
        content: "شرایط استفاده",
      },
      {
        key: "support",
        as: Link,
        to: RouterConst.SUPPORT,
        content: "درباره ما",
      },
      {
        key: "profile",
        as: Link,
        to: RouterConst.PROFILE,
        content: "پروفایل",
      },
      {
        key: "exit",
        onClick: () => this.onLogoutClick(),
        content: "خروج",
      },
    ];

    return (
      <Fragment>
        {screen === "desktop" ? (
          <Fragment>
            <style>
              {`
                .ui.menu .item:before {
                  right: auto !important;
                  left: 0 !important;
                }
              `}
            </style>
            {menuItems.map((item, index) => (
              <SemanticMenu.Item
                key={item.key}
                as={item.as}
                to={item.to}
                onClick={item.onClick}
                target={item.new_tab ? '_blank' : ''}
              >
                {item.content}
              </SemanticMenu.Item>
            ))}
            <SemanticMenu.Item
              key="add"
              as={Link}
              to={RouterConst.SUBMIT_LOAD}
              position="left"
            >
              <Button color="yellow" size="large" color="yellow">
                ثبت آگهی رایگان
              </Button>
            </SemanticMenu.Item>
          </Fragment>
        ) : (
          <Fragment>
            <style>
              {`
                .ui.menu .item>i.dropdown.icon {
                  margin: 0 1em 0 0;
                }
                .ui.menu .ui.dropdown .menu>.item {
                  text-align: right;
                }
              `}
            </style>
            <SemanticMenu.Menu position="left">
              <Dropdown item text="امکانات">
                <Dropdown.Menu>
                  <Dropdown.Divider />
                  {menuItems.map((item, index) => (
                    <Fragment>
                      <Dropdown.Item
                        key={item.key}
                        as={item.as}
                        to={item.to}
                        onClick={item.onClick}
                        target={item.new_tab ? '_blank' : ''}
                      >
                        {item.content}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </Fragment>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <SemanticMenu.Item
                key="add"
                as={Link}
                to={RouterConst.SUBMIT_LOAD}
              >
                <Button color="yellow" size="large" color="yellow">
                  ثبت آگهی رایگان
                </Button>
              </SemanticMenu.Item>
            </SemanticMenu.Menu>
          </Fragment>
        )}
      </Fragment>
    );
  }

  renderLoagedOutMenu() {
    return (
      <Fragment>
        {/*<SemanticMenu.Item as={Link} to={RouterConst.LIST} content="لیست آگهی ها" />*/}
        <SemanticMenu.Item
          as={Link}
          to={RouterConst.PRICES}
          key="prices"
          content="قیمت روز"
        />
        <SemanticMenu.Item
          as={Link}
          to={RouterConst.CALCULATOR}
          key="calculator"
          content="ماشین حساب"
          target="_blank"
        />
        <SemanticMenu.Item
          as={Link}
          to={RouterConst.LOGIN}
          key="register"
          content="ثبت نام"
        />
        <SemanticMenu.Item
          as={Link}
          to={RouterConst.LOGIN}
          key="login"
          content="ورود"
        />
        <SemanticMenu.Item
          as={Link}
          to={RouterConst.SUPPORT}
          key="support"
          content="درباره ما"
        />
      </Fragment>
    );
  }

  onLogoutClick() {
    this.props.onLogout();
  }

  render() {
    const isAuth = this.props.tokenStatus === 200;
    return (
      <SemanticMenu className="main-menu" fixed="top">
        <SemanticMenu.Item as={Link} to={"/"}>
          <img src="/eggmarket.png" alt="اگمارکت" />
        </SemanticMenu.Item>
        {isAuth ? (
          <Fragment>
            {this.renderlogedInMenu(
              this.state.width < 995 ? "mobile" : "desktop"
            )}
            {/*{this.state < 700 ? this.renderlogedInMenu('mobile') : this.renderlogedInMenu('desktop')}*/}
          </Fragment>
        ) : (
          this.renderLoagedOutMenu()
        )}
      </SemanticMenu>
    );
  }
}

Menu.propTypes = {
  tokenStatus: PropTypes.number,
  onLogout: PropTypes.func.isRequired,
};

export default Menu;
