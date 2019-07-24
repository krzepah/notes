
import { connect } from 'mutastore/preact';

import HomeBase from './base';

import { createRecord } from 'Store/record';

const Home = connect(
	(state) => ({
		records: state.records
	}),
	(state, props) => ({
		create: createRecord
	})
)(HomeBase);

export default Home;
