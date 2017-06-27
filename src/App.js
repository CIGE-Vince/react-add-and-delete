import Redux from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

import './css/main.css';
import inputStyle from './style/App.style';
import styles from './style/App.style';

var addTodoActions = function (text) {
	return {
		type: 'add_todo',
		text: text,
	};
};
var deleteTodoActions = function (id) {
	return {
		type: 'del_todo',
		id,
	};
};
var editTodoActions = function(id,text){
	return{
		type: 'edit_todo',
		id,
		text,
	};

};

var todoReducer = (state, action) => {

	if (typeof state === 'undefined') {
		return [];
	}

	switch (action.type) {
		case 'add_todo':
		console.log('add_todo')
			return [{
				text: action.text,
				completed: false
			}, ...state];
		case 'del_todo':
			return state.filter((item, index) => action.id != index);
		case 'edit_todo':
			return state.map((item,index) => index === action.id ? {...item,text:action.text} : item);
		default:
			return state;
	}

};

const store = createStore(todoReducer);

class App extends React.Component {
	state = {
		items: store.getState()
	}
	componentDidMount = () => {
		var unsubscribe = store.subscribe(this.onChange);
	}
	onChange = () => {
		console.log(store.getState())
		this.setState({
			items: store.getState()
		});
	}
	handleAdd = () => {
		var input = this.refs.todo;
		var value = input.value.trim();

		if (value)
			store.dispatch(addTodoActions(value));

		input.value = '';
	}
	handleDel = (index) => {
		store.dispatch(deleteTodoActions(index));
	}
	render() {
		return (
			<div>
				<pre><pre> </pre> </pre>
				<div style={styles.bodyLocation}>
					<input ref="todo" style={styles.inputStyle} type="text" placeholder="Type Here" />
					<pre></pre>
					<button style={styles.buttonStyleAdd} onClick={this.handleAdd}>click for add</button>
					<button style={styles.buttonStyleAdd}>search for you</button>
				</div>
				<br></br><br></br>
				<p>
					{
						this.state.items.map((item, index) => {
							return <table style={styles.tableStyle} key={index}>
								<tr>
									<td style={styles.tdButton1}><li onDoubleClick={() => this.handleEdit(index,item)}>{item.text}</li></td>
									<td style={styles.tdButton2}>
										<button style={styles.buttonStyleDelete} onClick={() => this.handleDel(index)}>delete</button>
									</td>
								</tr>
							</table>;
						})
					}
				</p>
			</div>
		);
	}
}
export default App;