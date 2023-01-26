import { Component } from 'react';
import { nanoid } from 'nanoid';

import MyForm from './Form/MyForm';
import style from './my-phonebooks.module.scss';
import Contacts from './Contacts/Contacts';

class MyPhoneBooksForm extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    contacts: [],
    filter: '',
  };

  handleEnterInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addBook = ({ name, number }) => {
    const isName = Boolean(
      this.state.contacts.find(e => name.toLowerCase() === e.name.toLowerCase())
    );
    if (isName) {
      return alert(`${name} is contact book`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newCont = { id: nanoid(), name: name, number: number };

      return { contacts: [newCont, ...contacts], name: '', number: '' };
    });
  };

  findContact() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalaiseLow = filter.toLowerCase();
    const res = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalaiseLow) ||
        number.includes(normalaiseLow)
    );
    // console.log(res)
    return res;
  }

  deleteContact = id => {
    const { contacts } = this.state;
    const newContact = contacts.filter(e => e.id !== id);
    this.setState({ contacts: newContact });
  };

  render() {
    const contactsFilter = this.findContact();
    const isContact = Boolean(contactsFilter.length);
    return (
      <>
        <h1>Phonebook</h1>

        <MyForm onSubmit={this.addBook} />

        <div className={style.filter}>
          <label className={style.label}>Search contact</label>
          <input type="text" name="filter" onChange={this.handleEnterInput} />
        </div>

        {isContact && (
          <Contacts
            contactsFilter={contactsFilter}
            deleteContact={this.deleteContact}
          />
        )}
      </>
    );
  }
}

export default MyPhoneBooksForm;
