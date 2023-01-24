import { Component } from "react";
import { nanoid } from 'nanoid';



class AddContactForm extends Component {


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
        name: '',
        number: '',
      };



      handleEnterInput = ({ target }) => {
        console.log(target.value)
        const { name, value } = target;
        this.setState({
          [name]: value,
        });
      };


    render() {

        const {  name, number } = this.state;


        return(

            <form onSubmit={this.addPhoneBook}>
            <label>Name</label>
            <input
              value={name}
              onChange={this.handleEnterInput}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <label>Contact</label>
            <input
              value={number}
              onChange={this.handleEnterInput}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
  
            <button type="submit">Add contact</button>
          </form>
        )
    }
}


export default AddContactForm;