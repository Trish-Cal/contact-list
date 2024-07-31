// imports React and necessary hooks
import { useEffect, useState } from "react";
// imports ContactRow component
import ContactRow from "../ContactsRow/ContactRow";

// defines ContactList component, accepting setSelectedContactId as a prop
function ContactList({ setSelectedContactId }) {
  // initializes state variable contacts to an empty array
  const [contacts, setContacts] = useState([]);

  // sets up an effect that runs after the component renders
  useEffect(() => {
    // defines an asynchronous function to fetch contacts
    async function fetchContacts() {
      // starts a try/catch block for error handling
      try {
        // fetches data from the API
        const res = await fetch(
          "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
        );
        // parses the response as JSON
        const json = await res.json();
        // logs the fetched data to the console
        console.log(json);
        // updates the contacts state with the fetched data
        setContacts(json);
      } catch (error) {
        // catches any errors during the fetch process
        console.error(error);
      }
    }
    // calls the fetchContacts function to retrieve data
    fetchContacts();
  }, []);
  // runs the effect only once after the initial render
  console.log(contacts);
  // logs the current state of contacts to the console
  return (
    // renders the ContactList component
    <>
      <h2>Contact List</h2>
      <table className="purpleRed">
        <thead className="purpleRed">
          <tr className="purpleRed">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody className="purpleRed">
          {/* maps over the contacts array and renders a ContactRow component for
          each contact */}
          {contacts.map((contact) => (
            // sets the key for each ContactRow component based on the contact's id
            <ContactRow
              key={contact.id}
              // passes the contact object as a prop to the ContactRow component
              contact={contact}
              // passes the setSelectedContactId prop down to the ContactRow component
              setSelectedContactId={setSelectedContactId}
              // contactId={contact.id}
            />
            // <ContactRow key={contact.id} name={contact.name} email={contact.email} phone={contact.phone}/>
          ))}
        </tbody>
      </table>
    </>
  );
}

// exports the ContactList component
export default ContactList;
