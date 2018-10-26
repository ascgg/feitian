import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Message from './Message.jsx'
import { backend } from '../../browser/remote'


const STYLES = {
  wrapper: { paddingTop: '200px', margin: '0 auto' },
  column: { maxWidth: '450px' }
};

export default class UserCreate extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handlePersonId = this.handlePersonId.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
    	personId: '',
      account: '',
      password: '',
      error: null,
      personIdEmpty: undefined,
      accountEmpty: undefined,
      passwordEmpty: undefined
    }
  }
  
  handlePersonId(event) {
  	this.setState({ personId: event.target.value });
  }

  handleAccount(event) {
    this.setState({ account: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Check validity and return to login page.
    const placeholder = this;
    const { personId, account, password, error } = this.state;
    const errorHelper = function (error) {
    	placeholder.setState({ error: error })
      placeholder.refs.msg.appear();
    }
    const successHelper = function () {
    	placeholder.context.router.push('/');
    }
    const func = async () => {
      try {
        await backend.auth.createUser({ personId: personId, account: account, password: password }, errorHelper, successHelper);
      } catch (error) {
        this.setState({ error: Error('严重错误') });
      }
    };
    if (personId === '') {
      if (account === '') {
        if (password === '') {
          this.setState({ personIdEmpty: true, accountEmpty: true, passwordEmpty: true })
        } else {
          this.setState({ personIdEmpty: true, accountEmpty: true, passwordEmpty: false })
        }
      } else {
        if (password === '') {
          this.setState({ personIdEmpty: true, accountEmpty: false, passwordEmpty: true })
        } else {
          this.setState({ personIdEmpty: true, accountEmpty: false, passwordEmpty: false })
        }
      }
    } else {
      if (account === '') {
        if (password === '') {
          this.setState({ personIdEmpty: false, accountEmpty: true, passwordEmpty: true })
        } else {
          this.setState({ personIdEmpty: false, accountEmpty: true, passwordEmpty: false })
        }
      } else {
        if (password === '') {
          this.setState({ personIdEmpty: false, accountEmpty: false, passwordEmpty: true })
        } else {
          this.setState({ personIdEmpty: false, accountEmpty: false, passwordEmpty: false });
          func();
        }
      }
    }
  }

  render() {
    const { error, accountEmpty, personIdEmpty, passwordEmpty } = this.state;
    let accountError, personIdError, passwordError;
    if (accountEmpty !== undefined) {
      accountError = accountEmpty ? 'error' : '';
    } else {
      accountError = '';
    }
    if (personIdEmpty !== undefined) {
      personIdError = personIdEmpty ? 'error' : '';
    } else {
      personIdError = '';
    }
    if (passwordEmpty !== undefined) {
      passwordError = passwordEmpty ? 'error' : '';
    } else {
      passwordError = '';
    }
    return (
      <div className="ui middle aligned center aligned grid" style={STYLES.wrapper}>
        <div className="column" style={STYLES.column}>
          <h2 className="ui teal header">创建新账号</h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className={`ui left icon input ${personIdError}`}>
                  <i className="book icon" />
                  <input type="text" onChange={this.handlePersonId} value={this.state.personId} placeholder="证件号" maxLength="16" />
                </div>
              </div>
              <div className="field">
                <div className={`ui left icon input ${accountError}`}>
                  <i className="user icon" />
                  <input type="text" onChange={this.handleAccount} value={this.state.account} placeholder="账号" maxLength="32" />
                </div>
              </div>
              <div className="field">
                <div className={`ui left icon input ${passwordError}`}>
                  <i className="lock icon" />
                  <input type="password" onChange={this.handlePassword} value={this.state.password} placeholder="密码" maxLength="32" />
                </div>
              </div>
              <button className="ui fluid large teal submit button" onClick={this.handleSubmit}>提交</button>
            </div>
          </form>
          <div className="ui message"><Link to="/">登录</Link></div>
          <div className="content">
            {
              error && <Message closable title="用户创建失败" message={error.message} type="tiny error" ref="msg" />
            }
          </div>
        </div>
      </div>
    );
  }
}
