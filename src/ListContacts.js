
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
    static propTypes = {
      contacts: PropTypes.array.isRequired,
      onDeleteContact: PropTypes.func.isRequired,
    }
    //can take a look at Proptypes to know which types of props can be passed into the component
    
    //Since the displayed value will always be the value in the component's state, 
    //we can treat state, then, as the "single source of truth" for the form's state. 
    state = {
      query: ''
    }
    updateQuery = (query) => {
      this.setState(() => ({
        query: query.trim()
      }))
    }
    clearQuery = () => {
        this.updateQuery(' ') //click 'show all' button to reset filter
    }

    render() {
        const { query } = this.state
        const { contacts, onDeleteContact } = this.props
        //filter the contacts if user enters something into the query (the input field)
        const showingContacts = query === '' ? contacts : contacts.filter((c) => (
          c.name.toLowerCase().includes(query.toLowerCase())
        ))
        //using controlled input component
      return (
        <div className='list-contacts'>
          <div className='list-contacts-top'>
            <input
              className='search-contacts'
              type='text'
              placeholder='Search Contacts'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>

        {showingContacts.length !== contacts.length && (
            <div className='showing-contacts'>
                <span>Now showing {showingContacts.length} of {contacts.length}</span>
                <button onClick={this.clearQuery}>Show all</button>
            </div>
        )}

          <ol className='contact-list'>
            {showingContacts.map((contact) => (
              <li key={contact.id} className='contact-list-item'>
                <div
                  className='contact-avatar'
                  style={{
                    backgroundImage: `url(${contact.avatarURL})`
                  }}
                ></div>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.handle}</p>
                </div>
                <button
                  onClick={() => onDeleteContact(contact)}
                  className='contact-remove'>
                    Remove
                </button>
              </li>
            ))
            }
          </ol>
        </div>
      )
    }
  }

// ListContacts.propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onDeleteContact: PropTypes.func.isRequired
//   }


export default ListContacts;