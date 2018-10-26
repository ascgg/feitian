import React from 'react'


const BACKSPACE = 8;
const DELETE = 46;
const F2 = 113;

export default class NumberCellEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeListener = this.onChangeListener.bind(this);
    this.state = this.createInitialState(props);
  }

  createInitialState(props) {
    var startValue;
    var putCursorAtEndOnFocus = false;
    var highlightAllOnFocus = false;

    if (props.keyPress === BACKSPACE || props.keyPress === DELETE) {
      startValue = '';
    } else if (props.charPress) {
      startValue = props.charPress;
    } else {
      startValue = props.value;
      if (props.keyPress === F2) {
        putCursorAtEndOnFocus = true;
      } else {
        highlightAllOnFocus = true;
      }
    }

    return {
      value: startValue,
      putCursorAtEndOnFocus: putCursorAtEndOnFocus,
      highlightAllOnFocus: highlightAllOnFocus
    }
  }

  onChangeListener(event) {
    var newState = {
      value: event.target.value,
      putCursorAtEndOnFocus: this.state.putCursorAtEndOnFocus,
      highlightAllOnFocus: this.state.highlightAllOnFocus
    };
    this.setState(newState);
  }

  render() {
    return (
      <input ref="textField" value={this.state.value} onChange={this.onChangeListener} />
    );
  }

  getValue() {
    return this.state.value;
  }

  afterGuiAttached() {
    var ref = this.refs.textField;
    ref.focus();
    if (this.highlightAllOnFocus) {
      ref.select();
    } else {
      var length = ref.value ? ref.value.length : 0;
      if (length > 0) {
        ref.setSelectionRange(length, length);
      }
    }
  }

  isPopup() {
    return false;
  }

  isCancelBeforeStart() {
    return !!this.props.node.floating;
  }

  isCancelAfterEnd() {
    return false;
  }
}