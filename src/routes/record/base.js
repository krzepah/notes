import { route } from 'preact-router';

import { map } from 'ramda';

import { Component } from 'preact';

import style from './style';
import { RecordTitle, Entry } from 'Components/element';
import Input from 'Components/input';

class RecordBase extends Component {
	scrollToHeadNav = () => {
		if (typeof window !== 'undefined')
			document.getElementById('headnav').scrollIntoView(
				{ behavior: 'smooth', block: 'center' }
			);
	}

	scrollToInput = () => {
		if (typeof window !== 'undefined') {
			document.getElementById('inputbr').scrollIntoView(
				{ behavior: 'smooth', block: 'center' }
			);
			setTimeout(this.refs.input._component.focus, 1000);
		}
	}

	componentDidMount = () => {
		if (!this.props.exists)
			route('/');
	}

	shouldComponentUpdate = () => {
		if (!this.props.exists) {
			return false;
		}
	}

	componentDidUpdate = () => {
		if (!this.props.exists) {
			route('/');
		}
	}

	render = ({ id, content, date, entries }) => (
		<div class={style.recordbase}>
			<div class={style.nav} id="headnav">
				<a href="/">← Your records</a>
				<a onClick={this.scrollToInput}>
				↓ Add new entries
				</a>
			</div>
			<RecordTitle
				content={content}
				date={date}
				input
				del
				id={id}
				bump
				menu
			/>
			{ entries ?
				map((eid) => (
					<Entry
						record={id}
						id={eid}
						input
						del
						menu
					/>
				),
				entries)
				: null
			}
			<Input id={id} date={date} ref={this.linkRef('input')}>
			 <a onClick={this.scrollToHeadNav}>
				 ↑ Back to top
			 </a>
			</Input>
			<div id="inputbr" />
		</div>
	)
}

export default RecordBase;
