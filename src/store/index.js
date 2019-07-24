import createStore from 'mutastore';

let store = createStore({
	allIds: [],
	records: []
});

store.subscribe( (state, action, update) => {
	if (typeof window !== 'undefined')
		localStorage.setItem('user_data', JSON.stringify(state));
});

export default store;
