import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  //no need to use constructor for state, can write state as a class field
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll() //returns a promise
      .then(contacts => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  removeContact = (contact) => {
    this.setState((currentState)=>({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id // id doesn't equal id of contact we passed in
      })
    }))
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        <ListContacts 
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
