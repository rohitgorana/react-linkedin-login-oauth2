function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/index.css';

export var LinkedIn = function (_Component) {
  _inherits(LinkedIn, _Component);

  function LinkedIn() {
    var _temp, _this, _ret;

    _classCallCheck(this, LinkedIn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getUrl = function () {
      var _this$props = _this.props,
          redirectUri = _this$props.redirectUri,
          clientId = _this$props.clientId,
          state = _this$props.state,
          scope = _this$props.scope;
      // TODO: Support IE 11

      var scopeParam = scope ? '&scope=' + encodeURI(scope) : '';
      var linkedInAuthenLink = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri + scopeParam + '&state=' + state;
      return linkedInAuthenLink;
    }, _this.receiveMessage = function (event) {
      if (event.origin === window.location.origin) {
        console.log('event data:', event.data);
        if (event.data.errorMessage && event.data.from === 'Linked In') {
          _this.props.onFailure(event.data);
          _this.popup && _this.popup.close();
        } else if (event.data.code && event.data.from === 'Linked In') {
          _this.props.onSuccess({ code: event.data.code });
          _this.popup && _this.popup.close();
        }
      }
    }, _this.handleConnectLinkedInClick = function (e) {
      console.log('handleConnectLinkedInClick');
      if (e) {
        e.preventDefault();
      }
      _this.props.onClick && _this.props.onClick();
      _this.popup = window.open(_this.getUrl(), '_blank', 'width=600,height=600');
      window.removeEventListener('message', _this.receiveMessage, false);
      window.addEventListener('message', _this.receiveMessage, false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LinkedIn.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage, false);
    if (this.popup && !this.popup.closed) this.popup.close();
  };

  LinkedIn.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        disabled = _props.disabled,
        children = _props.children;

    return React.cloneElement(children, {
      onClick: this.handleConnectLinkedInClick,
      disabled: disabled
    }, children.props.children);
  };

  return LinkedIn;
}(Component);

LinkedIn.propTypes = process.env.NODE_ENV !== "production" ? {
  className: PropTypes.string,
  onFailure: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  clientId: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired
} : {};
LinkedIn.defaultProps = {
  className: 'btn-linkedin',
  disabled: false,
  children: React.createElement('img', { src: require('../assets/linkedin.png'), alt: 'Log in with Linked In', style: { maxWidth: '180px' } }),
  state: 'fdsf78fyds7fm'
};
export default LinkedIn;