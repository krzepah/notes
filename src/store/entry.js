import { merge, filter, concat } from 'ramda';
import { now } from 'Utils';

const createEntry = (state, text, id, newId) => ({
    [newId]: {
      id: newId,
      date: now(),
      content: text
    },
    allIds: concat(
      [newId], state.allIds
    ),
    [id]: {
      ...state[id],
      entries: concat(
        state[id].entries,
        [newId]
      )
    }
})

const updateEntry = (state, id, text) => ({
    [id]: {
      id: id,
      date: state[id].date,
      content: text
    }
})

// TODO : actualy delete the entry
const deleteEntry = (state, props) => ({
    [props.record]: {
      id: props.record,
      date: state[props.record].date,
      content: state[props.record].content,
      entries: filter(
        (e) => e != props.id,
        state[props.record].entries
      )
    }
})

export {
  createEntry,
  updateEntry,
  deleteEntry
}
