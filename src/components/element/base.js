
import style from './style';

import { Component } from 'preact';

import Markup from 'preact-markup';
import 'linkref/polyfill';
import RichTextArea from 'preact-richtextarea';
import Menu from './menu';


function linkState(component, statePath, valuePath) {
  return event => {
    let update = {};
    update[statePath] = event.value;
    component.setState(update);
    component.update();
  };
}

function debounce(func, wait, immediate, context) {
    var result;
    var timeout = null;
    return function() {
        var ctx = context || this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(ctx, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(ctx, args);
        return result;
    };
}

const debouncedUpdate = debounce(
  (component, text) => {
    component.applyUpdate(text)
  },
  1000
)

class Element extends Component {
  state = {
    dialog : false,
    trigger: false,
    animationDelay: false,
    text: ''
  }

  trigger = () => {
    this.setState({
      dialog: true,
      trigger: true,
      animationDelay: false
    })
    setTimeout( () => {
      this.setState({ animationDelay: true })
      this.setState({ trigger: false });
      setTimeout( () => { this.setState( {
        dialog: false,
        trigger: false,
        animationDelay: false
      } )}, 1000)
    }, 2000)
  }

  applyUpdate = (text) => {
    if (this.props.updat && this.refs.input && !this.refs.input.focussed)
      this.props.updat(
        this.props.id,
        this.state.text.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>&nbsp;")
    )
  }

  update = () => debouncedUpdate(this)

  delete = (e) => {
    this.props.delet(this.props)
    this.setState({trigger: false, dialog: false})
  }

  focusout = () => {
    this.props.updat(
        this.props.id,
        this.state.text.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>&nbsp;")
    )
  }

  componentWillReceiveProps = () => {
    setTimeout(
      () => {  
        this.setState({
          text: this.props.content
        })
      },
      10
    )
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.content,
    })
  }

  render = (
    {content, date, input, delet, updat, bump, el, id, del, menu},
    {dialog, trigger, animationDelay}) => {
    return <div
      class={[
        style.element,
        trigger ? style.trigger : null,
        bump ? style.bump : style.default
      ].join(' ')}
      style={{
        "min-height" : this.state.height + 'px',
        "transition": animationDelay ? 'all 1.8s' : 'all .3s'
      }}
    >
      <div class={style.date}>
        <div class={style.datevalue}>
          {date}
        </div>
      </div>
      { input ?
          <RichTextArea
            onfocusout={this.focusout}
            stylesheet={"* { \
              color:" + (trigger ? "white" : bump ? "white" : "#666") + "; \
              font-family: 'Helvetica Neue', arial, sans-serif; \
              font-size: 15px; \
              margin-top:3px; \
              padding-top: 3px; \
              margin-bottom:-2px; \
              overflow: hidden; \
              line-height: 1.6; \
            } \
            body { padding : 8px; } \
            .hash_tag {\
              border: solid 1px; \
              padding: 2px;  \
              border-radius: 3px; \
              border-color: #999; \
            } \
            .hash_tag:hover { \
              transition: all .2s; \
              background: #666; \
              color: white; \
            }"}
            ref={this.linkRef('input')}
            class={style.title}
            onInput={linkState(this, 'text')}
            value={this.state.text}
          />
        : <Markup
            markup={content ? content.replace('&nbsp;', '') : ''}
            class={style.title}
            style="padding:18px;"
          /> }
      { menu ? <Menu/>  : null }
    </div>}
}

export default Element;
