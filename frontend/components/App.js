import React from 'react'
import axios from 'axios';
import Todo from './Todo';
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newName: '',
      displayChecked: true,
    }
  }

  newTask = e => {
    this.setState({ ...this.state, newName: e.target.value })
  }
  resetDisplay = () => { this.setState({ ...this.state, newName: '' }) }
  getData = () => {
    axios.get(URL).then((response) => this.setState({
      ...this.state, tasks: response.data.data
    }))
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    console.log("state updated!");
  }

  handlePost = () => {
    axios.post(URL, { name: this.state.newName }).then(res => { this.setState({ ...this.state, tasks: this.state.tasks.concat(res.data.data) }); this.resetDisplay() })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.handlePost()
  }

  markCompleted = id => {
    axios.patch(`${URL}/${id}`).then(res => { this.setState({ ...this.state, tasks: this.state.tasks.map(item => { if (item.id !== id) { return item } else { return res.data.data } }) }) })
  }

  displayCompleted = () => {
    this.setState({...this.state, displayChecked: !this.state.displayChecked})
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <h2>Todos</h2>
        {this.state.tasks.reduce((acc, item) => {
          if (this.state.displayChecked || !item.completed) return acc.concat(
            <div onClick={(e) => {this.markCompleted(item.id)}} key={item.id}>{item.name}{item.completed ? '✔' : ''}</div>
          )
          return acc
        }, [])}
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.newName} onChange={this.newTask} type="text" placeholder='Type Todo' />
          <input type="submit" />
        </form>
          <button onClick={this.displayCompleted}>Clear Completed</button>
      </div>
    )
  }
}
