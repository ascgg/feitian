import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class UserHeader extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    onExportClick: PropTypes.func.isRequired,
    listWater: PropTypes.array.isRequired,
    listElectric: PropTypes.array.isRequired,
    listOil: PropTypes.array.isRequired,
    listBarrack: PropTypes.array.isRequired,
    listLight: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const placeholder = this;
    $(this.refs.mainDrop).dropdown();
  }

  render() {
    const { listWater, listElectric, listOil, listBarrack, listLight } = this.props;
    const { onItemClick, onExportClick } = this.props;
    return (
      <div className="ui top fixed inverted labeled three item icon menu">
        <div className="ui pointing dropdown link item" ref="mainDrop">
          <i className="database icon" />
          <span className="text">总览</span>
          <div className="menu">
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              给排水工程
              <div className="menu">
                { (listWater === undefined || listWater.length === 0) ? <div className="disabled item">空</div> : listWater.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div> )}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              供电工程
              <div className="menu">
                { (listElectric === undefined || listElectric.length === 0) ? <div className="disabled item">空</div> : listElectric.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div> )}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              供油工程
              <div className="menu">
                { (listOil === undefined || listOil.length === 0) ? <div className="disabled item">空</div> : listOil.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div> )}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              营房工程
              <div className="menu">
                { (listBarrack === undefined || listBarrack.length === 0) ? <div className="disabled item">空</div> : listBarrack.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div> )}
              </div>
            </div>
            <div className="ui left pointing scrolling dropdown link item">
              <i className="dropdown icon" />
              助航灯光工程
              <div className="menu">
                { (listLight === undefined || listLight.length === 0) ? <div className="disabled item">空</div> : listLight.map(item => <div className="item" key={item.key} onClick={() => onItemClick(item.name, item.category)}>{item.name}</div> )}
              </div>
            </div>
          </div>
        </div>
        <a className="item" onClick={onExportClick}>
          <i className="file text outline icon" />
          导出
        </a>
        <Link to='/' activeClassName="item">
          <i className="sign out icon" />
          登出
        </Link>
      </div>
    )
  }
}
