import { useEffect, useState } from "react";

// defines the SingleContact component, accepting selectedContactId and setSelectedContactId as props
function SingleContact({ selectedContactId, setSelectedContactId }) {
  // initializes the contact state to null
  const [contact, setContact] = useState(null);

  // sets up an effect that runs after the component renders and whenever selectedContactId changes
  useEffect(() => {
    // defines an asynchronous function to fetch a single contact
    async function fetchSingleContact() {
      try {
        // fetches the contact data from the API using the selectedContactId
        const res = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        // parses the response as JSON
        const json = await res.json();
        // logs the fetched data to the console
        console.log(json);
        // updates the contact state with the fetched data
        setContact(json);
      } catch (error) {
        // catches any errors during the fetch process
        console.error(error);
      }
    }
    // calls the fetchSingleContact function to retrieve data
    fetchSingleContact();
  }, [selectedContactId]); // runs the effect only once after the initial render and whenever selectedContactId changes

  return (
    <div>
      <h1>Details for Contact</h1>
      <p>{contact?.name}</p>
      <p>{contact?.phone}</p>
      <p>{contact?.company?.name}</p>
      <button onClick={() => setSelectedContactId(null)}>Go back</button>
    </div>
  );
}

// exports the SingleContact component
export default SingleContact;