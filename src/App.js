import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {
    state = {
      balance: 0,
      currentUser: {
        userName: 'bob',
        memberSince: '10/1/88',
      },
      debits: [],
      credits: [],
    }

  componentDidMount() {
    this.updateCreditAndDebit();
  }


  updateCreditAndDebit = async () => {
    let balance = 0;
    const urlCredits = "http://localhost:4000/credits";
    const urlDebits = "http://localhost:4000/debits";
    const debits = await axios.get(urlDebits);
    const credits = await axios.get(urlCredits);
    debits.data.forEach(debit => balance += debit.amount);
    credits.data.forEach(credit => balance -= credit.amount);

    this.setState({ debits: debits.data, credits: credits.data, balance: balance.toFixed(2)});
  };

  addTransaction = (trx) => {
    const id = `${trx.amount}${trx.description}`;
    const date = new Date();
    const balance = (this.state.balance * 1) + (trx.amount * 1);
    const transaction = {
      id,
      description: trx.description,
      amount: trx.amount,
      date: date.toDateString(),
    };
    if (trx.type === "debit"){
      const newDebits = [...this.state.debits, transaction];
      this.setState({ debits: newDebits, balance});
    } else {
      const newCredits = [...this.state.credits, transaction];
      this.setState({ credits: newCredits, balance});
    }
  };

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  render() {
    const { balance } = this.state;
    const HomeComponent = () => (<Home accountBalance={balance} />);
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debitTrx={this.state.debits}
        accountBalance={balance}
        addTrx={(trx) => this.addTransaction(trx)}
      />
    );

    const CreditsComponent = () => (
      <Credits
        creditTrx={this.state.credits}
        accountBalance={balance}
        addTrx={(trx) => this.addTransaction(trx)}
      />
    );

    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/userProfile" component={UserProfileComponent} />
          <Route exact path="/login" component={LogInComponent} />
          <Route exact path="/debits" component={DebitsComponent} />
          <Route exact path="/credits" component={CreditsComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
