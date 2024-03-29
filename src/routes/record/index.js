import { connect } from 'mutastore/preact';
import RecordBase from './base';

const Record = connect(
	(state, props) => ({
		...state[props.id],
		exists: (state[props.id] !== undefined)
	}),
	{}
)(RecordBase);

export default Record;
