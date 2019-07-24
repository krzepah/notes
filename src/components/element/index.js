import { connect } from 'unistore/preact';
import Element from './base';

import { updateEntry, deleteEntry } from 'Store/entry';
import { updateRecord, deleteRecord } from 'Store/record';

const Record = connect (
  (state, props) => ({
    ...state[props.id],
  }),
  {}
)(Element)

const Entry = connect (
  (state, props) => ({
    ...state[props.id]
  }),
  (state, props) => ({
    updat: updateEntry,
    delet: deleteEntry
  })
)(Element);

const RecordTitle = connect(
  (state, props) => ({}),
  (state) => ({
    delet: deleteRecord,
    updat: updateRecord
  })
)(Element)

export { Record, Entry, RecordTitle }
