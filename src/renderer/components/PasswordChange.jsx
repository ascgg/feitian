import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Message from './Message.jsx'
import { backend } from '../../browser/remote'


const STYLES = {
  wrapper: { paddingTop: '200px', margin: '0 auto' },
  column: { maxWidth: '450px' }
};

export default class PasswordChange extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handleAccount = this.handleAccount.bind(this);
    this.handleOldPassword = this.handleOldPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      account: '',
      oldPassword: '',
      newPassword: '',
      error: null,
      accountEmpty: undefined,
      oldPasswordEmpty: undefined,
      newPasswordEmpty: undefined
    }
  }

  handleAccount(event) {
    this.setState({ account: event.target.value });
  }

  handleOldPassword(event) {
    this.setState({ oldPassword: event.target.value });
  }

  handleNewPassword(event) {
  	this.setState({ newPassword: event.target.value });
  }

  handleChange(event) {
    event.preventDefault();
    const placeholder = this;
    // Check validity and jump to table page.
    const { account, oldPassword, newPassword, error } = this.state;
    const errorHelper = function (error) {
      placeholder.setState({ error: error });
      placeholder.refs.msgerror.appear();
    }
    const successHelper = function () {
      placeholder.setState({ success: true });
      placeholder.refs.msgsuccess.appear();
    }
    const func = async () => {
      try {
        await backend.auth.changePassword({ account: account, oldPassword: oldPassword, newPassword: newPassword }, errorHelper, successHelper);
      } catch (error) {
        this.setState({ error: Error('严重错误') });
      }
    };
    if (account === '') {
      if (oldPassword === '') {
        if (newPassword === '') {
          this.setState({ accountEmpty: true, oldPasswordEmpty: true, newPasswordEmpty: true })
        } else {
          this.setState({ accountEmpty: true, oldPasswordEmpty: true, newPasswordEmpty: false })
        }
      } else {
        if (newPassword === '') {
          this.setState({ accountEmpty: true, oldPasswordEmpty: false, newPasswordEmpty: true })
        } else {
          this.setState({ accountEmpty: true, oldPasswordEmpty: false, newPasswordEmpty: false })
        }
      }
    } else {
      if (oldPassword === '') {
        if (newPassword === '') {
          this.setState({ accountEmpty: false, oldPasswordEmpty: true, newPasswordEmpty: true })
        } else {
          this.setState({ accountEmpty: false, oldPasswordEmpty: true, newPasswordEmpty: false })
        }
      } else {
        if (newPassword === '') {
          this.setState({ accountEmpty: false, oldPasswordEmpty: false, newPasswordEmpty: true })
        } else {
          this.setState({ accountEmpty: false, oldPasswordEmpty: false, newPasswordEmpty: false });
          func();
        }
      }
    }
  }

  render() {
    const { error, success, accountEmpty, oldPasswordEmpty, newPasswordEmpty } = this.state;
    let accountError, oldPasswordError, newPasswordError;
    if (accountEmpty !== undefined) {
      accountError = accountEmpty ? 'error' : '';
    } else {
      accountError = '';
    }
    if (oldPasswordEmpty !== undefined) {
      oldPasswordError = oldPasswordEmpty ? 'error' : '';
    } else {
      oldPasswordError = '';
    }
    if (newPasswordEmpty !== undefined) {
      newPasswordError = newPasswordEmpty ? 'error' : '';
    } else {
      newPasswordError = '';
    }
    return (
      <div className="ui middle aligned center aligned grid" style={STYLES.wrapper}>
        <div className="column" style={STYLES.column}>
          <h2 className="ui teal header">密码修改</h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className={`ui left icon input ${accountError}`}>
                  <i className="user icon"></i>
                  <input type="text" onChange={this.handleAccount} placeholder="账号" maxLength="32" />
                </div>
              </div>
              <div className="field">
                <div className={`ui left icon input ${oldPasswordError}`}>
                  <i className="lock icon"></i>
                  <input type="password" onChange={this.handleOldPassword} placeholder="旧密码" maxLength="32" />
                </div>
              </div>
              <div className="field">
              	<div className={`ui left icon input ${newPasswordError}`}>
                  <i className="lock icon"></i>
                  <input type="password" onChange={this.handleNewPassword} placeholder="新密码" maxLength="32" />
              	</div>
              </div>
              <button className="ui fluid large teal submit button" onClick={this.handleChange}>修改</button>
            </div>
          </form>
          <div className="ui message"><Link to="/">登录</Link></div>
          <div className="content">
            {
              error && <Message closable title="用户信息错误" message={error.message} type="tiny error" ref="msgerror" />
            }
            {
              success && <Message closable title="成功" message="密码修改成功" type="tiny success" ref="msgsuccess" />
            }
          </div>
        </div>
      </div>
    );
  }
}
