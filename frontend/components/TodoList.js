import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
    this.props.state.map(item => <li key={item.name} id={item.name} onClick={(e) => {this.props.handleComplete(e, item.id); console.log(e)}}>{item.name}</li>))
  }
}
