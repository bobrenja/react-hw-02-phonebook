import { Component } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './Form/AddContactForm';
import style from './my-phonebooks.module.scss';

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

  render() {
    const contactsFilter = this.findContact();
    const isContact = Boolean(contactsFilter.length);
    return (
      <>
        <AddContactForm onSubmit={this.addBook} />

        <div className={style.filter}>
          <label className={style.label}>Search contact</label>
          <input type="text" name="filter" onChange={this.handleEnterInput} />
        </div>

        {isContact && (
          <div className={style.contact}>
            <p>Contact</p>
            <ol>
              {contactsFilter.map(({ id, name, number }) => (
                <li key={id}>
                  {name}: {number}
                </li>
              ))}
            </ol>
          </div>
        )}
      </>
    );
  }
}

export default MyPhoneBooksForm;
