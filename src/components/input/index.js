
import { connect } from 'mutastore/preact';

import InputBase from './base';
import { createEntry } from 'Store/entry';

const Input = connect(
  (state, props) => ({ }),
  (state, props) => ({
    submit: createEntry
  })
)(InputBase);

export default Input;
