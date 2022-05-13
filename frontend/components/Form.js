import React from 'react'

export default class Form extends React.Component {
  render() {
    return (<form onSubmit={this.props.handleSubmit}>
              <input onChange={this.props.handleChange} type="text" placeholder='Type Todo' name='text'/>
              <input type="submit" value="Add Todo" name='add'/>
              <input onClick={() => this.props.handleClick} type="button" value="Clear Completed" name='clear'/>
            </form>)
  }
}
