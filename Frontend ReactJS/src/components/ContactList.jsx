import { useEffect, useState } from "react";
import AddContact from "./AddContact";
const ContactList = (props) => {
  const [contacts, setContacts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const id = props.id;

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  const handleDelete = async (contact) => {
    try {
      await fetch(
        "https://localhost:7012/Users/deleteContact/" + id + "/" + contact.id,
        {
          method: "DELETE",
        }
      ).then((res) => {
        if (res.ok) {
          alert("Usuario eliminado");
          handleRefetch();
        } else {
          alert("Error al eliminar");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      fetch("https://localhost:7012/Users/getUserContacts/" + id)
        .then((res) => res.json())
        .then((data) => setContacts(data));
    } catch (e) {
      console.log(e);
    }
  }, [refetch]);
  return (
    <div>
      <h1>Contact List</h1>
      <div className="ContactList">
        {contacts.map((contact) => (
          <div key={contact.Id} className="Contact">
            <span className="Name">
              <label htmlFor="Name">Name</label>
              <input type="text" id="Name" value={contact.name} readOnly />
            </span>
            <span className="Email">
              <label htmlFor="Email">Email</label>
              <input type="email" id="Email" value={contact.email} readOnly />
            </span>
            <span className="Phone">
              <label htmlFor="Phone">Phone</label>
              <input type="text" id="Phone" value={contact.phone} readOnly />
            </span>
            <span className="Address">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                id="Address"
                value={contact.address}
                readOnly
              />
            </span>
            <span className="Company">
              <label htmlFor="Company">Company</label>
              <input
                type="text"
                id="Company"
                value={contact.company}
                readOnly
              />
            </span>
            <span className="Notes">
              <label htmlFor="Notes">Notes</label>
              <input type="text" id="Notes" value={contact.notes} readOnly />
            </span>
            <button onClick={() => handleDelete(contact)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="RegistrarContacto">
        <AddContact id={id} handleRefetch={handleRefetch} />
      </div>
      <div>
        <button onClick={() => props.setLoggedIn(false)}>Logout</button>
      </div>
    </div>
  );
};

export default ContactList;
