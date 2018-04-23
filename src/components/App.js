import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Phrase from './PhraseContainer';
import AddButton from './AddButton';
import './App.css';

import { storage } from '../firebase';
import { getRandomNumber } from '../utils';
const WALLPAPERS_NUM = 15;

const styles = theme => ({
	root: {
		display: 'flex',
		height: '100%',
		width: '100%',
		justifyContent: 'center'
	},
	phrase: {
		alignSelf: 'center'
	},
	addButton: {
		position: 'absolute'
	}
});

class App extends Component {
	state = {
		backgroundSize: 'cover',
		backgroundImage: ''
	};

	static propTypes = {
		classes: PropTypes.object.isRequired
	};

	componentDidMount = async () => {
		const randomNum = getRandomNumber(WALLPAPERS_NUM);
		const url = await storage.ref(`images/wallpapers/${randomNum}.jpg`).getDownloadURL();

		this.setState({
			backgroundImage: `url(${url})`
		});
	};

	render() {
		const { classes } = this.props;
		const { backgroundSize, backgroundImage } = this.state;

		return (
			<div className={classes.root} style={{ backgroundSize, backgroundImage }}>
				<Phrase classNames={classes.phrase} />
				<AddButton classNames={classes.addButton} handleClick={() => console.log('hey')} />
			</div>
		);
	}
}

export default withStyles(styles)(App);
