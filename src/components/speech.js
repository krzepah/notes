
import { route } from 'preact-router';
import { connect } from 'mutastore/preact';

import SpeechBase from 'preact-speech';

import store from 'Store';
import { createRecord } from 'Store/record';
import { newRecord } from 'Routes/home/actions';
import { map } from 'ramda';


const selector = (text) => map(
	(e) => {
		let date = e.date;
		while (date.indexOf('/') !== -1)
			date = date.replace('/', ' ');
		if (text.match(date)) {
			route('/record/' + e.id);
		}
	},
	store.getState().records.byId
);

const Speech = connect(
	(state) => ({
		resolver: {
			'nouvel enregistrement': (text, props) => newRecord(props.create),
			précédent: () => {
				if (typeof window !== 'undefined')
					window.history.back();
			},
			suivant: () => {
				if (typeof window !== 'undefined')
					window.history.forward();
			},
			"supprimer l'enregistrement": (text, props) => {
				if (typeof window !== 'undefined') {
					if (String(window.location.pathname).indexOf('/record') !== -1) {
						let recordId = String(window.location.pathname).replace('/record/', '');
						console.log(recordId);
					}
			  else
						console.log('Not a record');
				}
			},
			'[0-9]+ [0-9]+ [0-9]+': (text) => selector(text),
			'[0-9]+ [0-9]+ [0-9]+ [a-z]+': (text) => selector(text)
		}
	}),
	(state, props) => ({
		create: createRecord
	})
)(SpeechBase);

export default Speech;
