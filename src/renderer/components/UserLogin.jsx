import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Message from './Message.jsx'
import { backend } from '../../browser/remote'


const STYLES = {
  wrapper: { paddingTop: '200px', margin: '0 auto' },
  column: { maxWidth: '450px' }
};

export default class UserLogin extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handleAccount = this.handleAccount.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      account: '',
      password: '',
      accountEmpty: undefined,
      passwordEmpty: undefined,
      error: null
    }
  }

  handleAccount(event) {
    this.setState({ account: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    const placeholder = this;
    // Check validity and jump to table page.
    const { account, password, error, } = this.state;
    const errorHelper = function (error) {
      placeholder.setState({ error: error });
      placeholder.refs.msg.appear();
    }
    const successHelper = function () {
      placeholder.context.router.push('/tables');
    }
    const func = async () => {
      try {
        await backend.auth.loginUser({ account: account, password: password }, errorHelper, successHelper);
      } catch (error) {
        this.setState({ error: new Error('严重错误') });
      }
    };
    if (account === '') {
      if (password === '') {
        this.setState({ accountEmpty: true, passwordEmpty: true })
      } else {
        this.setState({ accountEmpty: true, passwordEmpty: false })
      }
    } else {
      if (password === '') {
        this.setState({ accountEmpty: false, passwordEmpty: true })
      } else {
        this.setState({ accountEmpty: false, passwordEmpty: false })
        func();
      }
    }
  }

  render() {
    const { error, accountEmpty, passwordEmpty } = this.state;
    let accountError, passwordError;
    if (accountEmpty !== undefined) {
      accountError = accountEmpty ? 'error' : '';
    } else {
      accountError = '';
    }
    if (passwordEmpty !== undefined) {
      passwordError = passwordEmpty ? 'error' : '';
    } else {
      passwordError = '';
    }
    return (
      <div className="ui middle aligned center aligned grid" style={STYLES.wrapper}>
        <div className="column" style={STYLES.column}>
          <h2 className="ui teal header">用户登录</h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className={`ui left icon input ${accountError}`}>
                  <i className="user icon"></i>
                  <input type="text" onChange={this.handleAccount} placeholder="账号" maxLength="32" />
                </div>
              </div>
              <div className="field">
                <div className={`ui left icon input ${passwordError}`}>
                  <i className="lock icon"></i>
                  <input type="password" onChange={this.handlePassword} placeholder="密码" maxLength="32" />
                </div>
              </div>
              <button className="ui fluid large teal submit button" onClick={this.handleLogin}>登录</button>
            </div>
          </form>
          <div className="ui message"><Link to="/create">创建新账号</Link> | <Link to="/change">修改密码</Link></div>
          <div className="content">
            {
              error && <Message closable title="错误" message={error.message} type="tiny error" ref="msg" />
            }
          </div>
        </div>
      </div>
    );
  }
}
