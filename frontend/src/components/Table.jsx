
export default function Table({ contacts, onDelete, handleEdit, handleSave, contactID, data, setData }) {

    return (<>
        <div className="w-full border border-base-300">
            <table className="table table-md">
                {/* head */}
                <thead className="bg-base-content text-base-100">
                    <tr>
                        <th>Last name</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(contacts.map((contact) => (
                        <tr key={contact.id}
                            className="hover:bg-info transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-101">
                            <td>{contact.last_name}</td>
                            <td>{contact.first_name}</td>
                            <td>{contact.email}</td>
                            <>
                                {contactID === contact.id
                                    ? <td key={contact.id}>
                                        <input type="text"
                                            value={data}
                                            onChange={(e) => setData(e.target.value)}
                                            className="input"
                                            placeholder="Insérez votre adresse postale" />
                                    </td>

                                    : <td>{contact.adressePostale}</td>
                                }
                            </>
                            <td>
                                <div className="flex space-x-2">
                                    <> {contactID !== contact.id 
                                            ? <button
                                            onClick={() => handleEdit(contact.id)
                                            }
                                            className="btn btn-xs btn-primary">
                                            Modifier
                                        </button >
                                        :<button
                                            onClick={() => handleSave(contact.id)
                                            }
                                            className="btn btn-xs btn-primary">
                                            Sauvegarder
                                        </button >}
                                    </>

                                    <button onClick={() => onDelete(contact.id)}
                                        className="btn btn-xs btn-error">
                                        Supprimer
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                    ))}
                </tbody>
            </table>
        </div>
    </>)
}