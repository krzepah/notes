
import { merge, concat } from 'ramda';
import { route } from 'preact-router'

const newRecord = (create) => {
  let id = new Date().getTime()
  create(id);
  route('/record/' + id);
}

export { newRecord };