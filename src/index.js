import 'Style';

import { Component } from 'preact';
import { Provider } from 'mutastore/preact';
import Router from 'preact-router';
import LiquidRoute, { SlideLeft, SlideRight } from 'liquid-route';
import 'liquid-route/style.css';

import Record from 'Routes/record';

import store from './store';

import Speech from 'Components/speech';

import Home from 'Routes/home';

const keyPress = (e) => {
	if (e.key === 'ArrowUp') {
		// e.preventDefault();
		console.log('ArrowUp');
	}
	if (e.key === 'ArrowDown') {
		// e.preventDefault();
		console.log('ArrowDown');
	}
};

const Routes = () => (
	<div>
		<br />
		<Speech style="padding: 10px;" />
		<Router>
			<LiquidRoute animator={SlideRight} path="/" component={Home} />
			<LiquidRoute animator={SlideLeft} path="/record/:id" component={Record} />
		</Router>
	</div>
);

class App extends Component {
	componentDidMount = () => {
		if (typeof window !== 'undefined') {
			store.setState(JSON.parse(localStorage.getItem('user_data')));
		}
	}

	render = () => (
		<div id="app"
			tabIndex="0"
			onKeyDown={keyPress}
		>
			<Provider store={store}>
				<Routes />
			</Provider>
		</div>
	);
}

export default App;
