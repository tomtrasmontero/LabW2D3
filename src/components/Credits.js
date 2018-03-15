import React from 'react';
import Aux from '../Aux';
import Form from './Form';
import { Link } from "react-router-dom";

const credits = (props) => {
  const creditTransaction = props.creditTrx.map((trx) => (
    <Aux key={trx.id}>
      <p>Desc: {trx.description}</p>
      <p>Amount: {trx.amount}</p>
      <p>Time: {trx.date}</p>
    </Aux>
  ));

  const form = (
    <Form
      type="credit"
      addTrx={props.addTrx}
    />
  )

  return (
    <Aux>
      <h1>Credits</h1>
      <Link to="/">Home</Link>
      <p>Current Balance: {props.accountBalance}</p>
      {form}
      <br />
      {creditTransaction}
    </Aux>
  );
};

export default credits;
