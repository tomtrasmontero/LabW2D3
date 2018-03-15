import React, { Component } from 'react';

class Form extends Component {
  state = {
    description: '',
    amount: 0,
  };

  handleChange = (e) => {
    const updatedForm = { ...this.state };
    updatedForm[e.target.name] = e.target.value;

    this.setState(updatedForm);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      description: e.target.description.value,
      amount: e.target.amount.value,
      type: this.props.type,
    };
    this.props.addTrx(data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <div>
            <label htmlFor="amount">amount</label>
            <input
              type="text"
              name="amount"
              onChange={this.handleChange}
              value={this.state.amount}
            />
          </div>
          <div>
            <label htmlFor="submit">submit</label>
            <input type="submit" name="submit" />
          </div>
        </form>
      </div>
    );
  };
}

export default Form;
