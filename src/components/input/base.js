import 'linkref/polyfill';
import 'linkstate/polyfill';
import { Component } from 'preact';
import { today } from 'Utils';

import style from './style';

class InputBase extends Component {
  state = {
    text: '',
    error: false,
    control: false
  }

  submit = () => {
    if (this.state.text != '') {
      this.props.submit(
        this.state.text,
        this.props.id,
        new Date().getTime()
      );
      this.setState({text: ''});
      if (typeof window !== "undefined") {
        this.refs.input.scrollIntoView(
          { behavior: 'smooth', block: 'center' }
        );
      }
    } else
      this.errorAnimation();
  }

  errorAnimation = () => {
    this.setState({error: true});
    setTimeout( () => {
      this.setState({ error: false })
    }, 100)
  }

  keyDown = (e) => {
    if (e.key === 'Control')
      this.setState({'control': true})
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submit();
    }
  }

  keyUp = (e) => {
    if (e.key === 'Control')
      this.setState({'control': false})
  }

  focus = () => this.refs.input.focus()

  render = ({ submit, id, date, children }, { text }) =>
    <div class={style.inputcontainer}>
      <div class={
        [style.input, this.state.error ? style.error : null].join(' ')}
      >
        <input
          ref={this.linkRef('input')}
          value={text}
          onKeyDown={this.keyDown}
          onKeyUp={this.keyUp}
          onInput={this.linkState('text')} />
        <button 
          onClick={this.submit}>
            Add
        </button>
      </div>
      <div class={style.bottom}>
        <div class={style.length}>
          {this.state.text.length} characters
        </div>
        { children }
      </div>
    </div>
}

export default InputBase;
