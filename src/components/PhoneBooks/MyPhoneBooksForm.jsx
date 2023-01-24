import { Component } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './Form/AddContactForm';

// import style from './my-phonebooks-form.module.scss';

class MyPhoneBooksForm extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    contacts: [
      {
        id: nanoid(),
        name: 'vasay',
        number: '445677',
      },

      {
        id: nanoid(),
        name: 'Taras',
        number: '1234567',
      },
    ],

    filter: '',
  };

  handleEnterInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addBook = ({ name, number }) => {
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

  render() {
    const contactsFilter = this.findContact();
    return (
      <>
        <AddContactForm onSubmit={this.addBook} />

        <label htmlFor="Search contact"></label>
        <input type="text" name="filter" onChange={this.handleEnterInput} />

        <div>Contact</div>
        <ol>
          {contactsFilter.map(({ id, name, number }) => (
            <li key={id}>
              {name}: {number}
            </li>
          ))}
        </ol>
      </>
    );
  }
}

export default MyPhoneBooksForm;
