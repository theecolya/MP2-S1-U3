import React from 'react'
import TodoList from './TodoList'

export default class Todo extends React.Component {
  render() {
    return (<ul><TodoList handleComplete={this.props.handleComplete(e, idx)} state={this.props.state}/></ul>)
  }
}
