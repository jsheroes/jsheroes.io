import React, { Component } from 'react';
import PropTypes from 'prop-types';
import menuItems from '../data/menuitems';
import { styles, mediaQueries, emptyFunc } from '../constants';

const sizeL = 992;

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideNavUp: false,
      currentHash: '',
      showNavItems: false,
      viewportWidth: 0
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.toggleNavItems = this.toggleNavItems.bind(this);
    this.hideNavItems = this.hideNavItems.bind(this);
  }

  componentDidMount() {
    this.setState({
      viewportWidth: window.innerWidth,
      showNavItems: window.innerWidth > sizeL,
    });
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  handleScroll() {
    const { hideNavUp } = this.state;
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition > 50 && !hideNavUp) {
      this.setState({ hideNavUp: true, showNavItems: false });
    } else if (scrollPosition < 50 && hideNavUp) {
      this.setState({ hideNavUp: false });
    }
  }

  handleHashChange(ev) {
    this.setState({ currentHash: ev.newURL.split('#')[1] });
  }

  toggleNavItems () {
    this.setState({
      showNavItems: !this.state.showNavItems
    })
  }

  hideNavItems () {
    this.setState({
      showNavItems: false
    })
  }

  render() {
    const { hideNavUp, showNavItems, viewportWidth } = this.state;
    const navbarMaxLColors = showNavItems && (viewportWidth < sizeL)
      ? 'navbar-max-L-colors' : '';

    return (
      <div
        style={this.props.style}
        className={hideNavUp ? 'hideNavUp' : navbarMaxLColors}
      >
        <nav className="clearfix">
          <span>
            <img alt="website-logo" src="static/img/website_logo.png" />
          </span>
          <button onClick={this.toggleNavItems}>
             <i className='fa fa-bars' aria-hidden='true' />
          </button>
          <ul
            className={`${ showNavItems ? 'showNavItems' : ''}`}
            onClick={viewportWidth < sizeL ? this.hideNavItems : emptyFunc}
          >
            {
              menuItems.map((item) => {
                const active = `#${this.state.currentHash}` === item.url
                  ? 'active'
                  : '';
                return (
                  <li key={item.id}>
                    <a href={`/${item.url}`} className={active}>{item.label}</a>
                  </li>
                );
              })
            }
          </ul>
        </nav>

        { /*language=CSS*/ }
        <style jsx>{`
          div {
            width: 100%;
            height: 78px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 3;
            background-color: ${styles.mainColor2};
            border-top: 6px solid ${styles.mainColor6};
            -webkit-transition: top .2s ease-in-out;
            -moz-transition: top .2s ease-in-out;
            transition: top .2s ease-in-out;
            font-family: Roboto, sans-serif;
            font-weight: 400;
          }

          .navbar-max-L-colors {
            background-color: ${styles.mainColor1}
            border-top-color: ${styles.mainColor1};
          }

          span {
            display: inline-block;
            float: left;
            width: 145px;
            height: inherit;
            margin-left: 15px;
          }
          img {
            width: inherit;
            height: auto;
            padding-bottom: 3px;
          }

          nav {
            height: auto;
            line-height: 72px;
          }

          ul {
            display: inline-block;
            float: right;
          }

          li {
            margin: 0 35px;
            display: inline-block;
          }

          a {
            padding: 5px 15px;
            text-transform: capitalize;
            color: #fff;
            font-size: 18px;
            font-weight: 400;
            text-decoration: none !important;
          }

          .hideNavUp {
            top: -78px;
          }

          .showNavItems {
            display: block;
          }

          .active {
            color: ${styles.mainColor6}
          }

          button {
            display: inline-block;
            float: right;
            margin: 10px 10px 10px 0;
            line-height: 28px;
            font-size: 28px;
            color: ${styles.mainColor3};
            background-color: transparent;
            border: none;
            outline: none;
          }

          @media (max-width: ${mediaQueries.L}) {/*992px*/
            div {
              height: 52px;
              background-color: transparent;
              border-top: 2px solid transparent;
            }
            img {
              display: none;
            }
            ul {
              display: none;
              width: 100%;
              text-align: center;
              background-color: ${styles.mainColor1};
            }
            li {
              display: block;
              margin: 0;
              line-height: 50px;
            }
            li:first-child {
              border-top: 1px solid rgba(250, 250, 250, .5);
            }
            a {
              display: block;
              padding: 0;
              font-size: 16px;
            }
            .hideNavUp {
              top: -52px;
            }
          }

          @media (min-width: ${mediaQueries.L}) {
            div {
             border-top: 4px solid ${styles.mainColor6};
            }
            span {
              width: 125px;
            }
            li {
              margin: 0 0 0 40px;
            }
            button {
              display: none;
            }
          }

          @media (min-width: ${mediaQueries.XL}) {
            div {
             border-top: 6px solid ${styles.mainColor6};
            }
            span {
              width: 145px;
              margin-left: 45px;
            }
            li {
              margin: 0 30px;
            }
            a {
              font-size: 20px;
            }
          }

        `}</style>
      </div>
    );
  }
}

Nav.propTypes = {
  style: PropTypes.any,
};

