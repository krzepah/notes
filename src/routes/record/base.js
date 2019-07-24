import { route } from 'preact-router';

import { connect } from 'unistore/preact';

import { map } from 'ramda';

import { Component } from 'preact';

import style from './style';
import { RecordTitle, Entry } from 'Components/element';
import Input from 'Components/input';
import { today } from 'Utils';

class RecordBase extends Component {
  scrollToId = (id) => {
    if (typeof window !== "undefined")
      document.getElementById(id).scrollIntoView(
        { behavior: 'smooth', block: 'center' }
      );
  }

  scrollToInput = (id) => {
    if (typeof window !== "undefined") {
      document.getElementById(id).scrollIntoView(
        { behavior: 'smooth', block: 'center' }
      );
      setTimeout(this.refs.input._component.focus, 1000);
    }
  }

  componentDidUpdate = () =>{
    if (!this.props.exists) {
      route('/')
    }
  }

  shouldComponentUpdate = () => {
    if (!this.props.exists) {
      return false;
    }
  }

  componentDidMount = () => {
    if (!this.props.exists)
      route('/')
  }

  render = ({id, content, date, entries}) => <div
    class={style.recordbase}
  >
    <div class={style.nav} id="headnav">
      <a href="/">← Your records</a>
      <a onClick={() => this.scrollToInput('inputbr')}>
        ↓ Add new entries
      </a>
    </div>
    <RecordTitle
      content={content}
      date={date}
      input={true}
      del={true}
      id={id}
      bump
      menu />
    { entries ? 
        map((eid) => <Entry
          record={id}
          id={eid}
          input={true}
          del
          menu
        />,
        entries)
      : null
    }
    <Input id={id} date={date} ref={this.linkRef('input')}>
     <a onClick={() => this.scrollToId('headnav')}>
       ↑ Back to top
     </a>
    </Input>
    <div id="inputbr" />
  </div>
}

export default RecordBase;
