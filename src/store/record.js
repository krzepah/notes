
import { filter, merge, concat } from 'ramda';
import { now } from 'Utils';

const createRecord = (
  state, newId=now()
) => ({
  [newId]: {
    id: newId,
    date: now(),
    content: '',
    entries: []
  },
  allIds: concat([newId], state.allIds),
  records: concat([newId], state.records)
})

const updateRecord = (state, id, text) => ({
  [id] : {
    id: id,
    date: state[id].date,
    content: text,
    entries: state[id].entries
  }
})

const deleteRecord = (state, props) => ({
  allIds: filter(
    (e) => e != props.id, state.allIds
  ),
  records: filter(
    (e) => e != props.id, state.records
  ),
  [props.id] : undefined
})

export {
  createRecord,
  updateRecord,
  deleteRecord
};
