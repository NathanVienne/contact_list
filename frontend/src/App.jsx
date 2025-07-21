import './index.css'
import Table from './components/Table'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import { createContact, deleteContact, fetchContact, updateContact } from './services/emailServices'
import ToastAlert from './components/ToastAlert'

function App() {
  const [contacts, setContacts] = useState([])
  const [contactID, setContactID] = useState(null)
  const [data, setData] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  useEffect(() => {
    try {
      fetchContact()
        .then((response) => {
          setContacts(response.data)
          console.log('RESPONSE =>', response.data)
        })

    } catch (err) {
      console.log('ERROR ON FETCH =>', err);

    }

  }, [])


  const handleCreate = async (data) => {
    try {
      await createContact({ ...contacts, data }).unwrap()
      setToast({ show: true, message: 'Contact ajouté avec succès', type: 'success' })
      // console.log('Nouvel Utilisateur ajouté =>', data);


    } catch (err) {
      console.log(err);
      setToast({ show: true, message: "Erreur lors de l'ajout du contact', type:'error", type: 'error' })
    }
  }

  const handleDelete = async (id) => {
    try {

      setContacts(prev => prev.filter(contact => contact.id !== id));
      await deleteContact(id).unwrap();
      setToast({ show: true, message: 'Contact supprimé avec succès', type: 'success' })


    } catch (error) {
      setContacts(contacts);
      setToast({ show: true, message: "Erreur lors de la suppression du contact', type:'error", type: 'error' })
      console.error("Échec de la suppression:", error);
    }
  };

  const handleChange = (id) => {
    setContactID(id)

    const contact = contacts.find((contct) => contct.id === id)
    setData(contact.adressePostale)
  }

  const handleSave = async (id) => {
    // const contact = contacts.find((contact) => contact.id === id)
    try {
      const udpatedData = { adressePostale: data }
      await updateContact(id, udpatedData).unwrap()
      setToast({ show: true, message: "Adresse Postale modifiée avec succès", type: 'success' })
      setContactID(null)
    } catch (err) {
      console.log('Error on update', err);
      setToast({ show: true, message: "Erreur lors de la modification", type: 'error' })

    }

  }

  return (
    <>
      <h1 className='text-center text-3xl mt-10'>Bienvenue sur Zoutlook</h1>
      <section className='w-2xl md:w-4xl mx-auto'>
        <Form handleAddContact={handleCreate} />
        <Table contacts={contacts}
          onDelete={handleDelete}
          handleEdit={handleChange}
          handleSave={handleSave}
          data={data}
          setData={setData}
          contactID={contactID} />
        <ToastAlert toast={toast} setToast={setToast} />
      </section>
    </>
  )
}

export default App
