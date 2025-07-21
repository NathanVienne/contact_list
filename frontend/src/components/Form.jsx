import { useState } from "react"
import getIP from "../utilities/getIPAdress"
export default function Form({ handleAddContact }) {
    const [lname, setLname] = useState('')
    const [fname, setFname] = useState('')
    const [email, setEmail] = useState('')
    const [adresseP, setAdresseP] = useState('')

    const [lnameErr, setLnameErr] = useState('')
    const [fnameErr, setFnameErr] = useState('')
    const [emailErr, setemailErr] = useState('')
    const [adressePErr, setAdressePErr] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!FieldsValidation()) {
            return;
        }

        try {
            const ip = await getIP();
            console.log('Adresse IP =>', ip);


            const newContact = {
                last_name: lname,
                first_name: fname,
                email: email,
                adressePostale: adresseP,
                adresse_ip: ip,
                created_at: new Date().toISOString().slice(0, 10),
                modified_at: new Date().toISOString().slice(0, 10),
            };

            console.log('Nouveau contact =>', newContact);
            handleAddContact(newContact);
            reset();

        } catch (err) {
            console.error("Erreur lors de la récupération de l'IP:", err);

            const newContact = {

                adresse_ip: 'non disponible',
            };
            handleAddContact(newContact);
            reset();
        }
    };

    const FieldsValidation = () => {
        let validated = true;
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i

        if (!lname.trim()) {
            setLnameErr('Le NOM est obligatoire !')
            validated = false
        } else if (lname.length > 100) {
            setLnameErr('Le nom ne doit pas dépasser 100 caractères !')
            validated = false
        }

        if (!fname.trim()) {
            setFnameErr('Le Prénom est obligatoire !')
            validated = false
        } else if (fname.length > 100) {
            setFnameErr('Le Prénom ne doit pas dépasser 100 caractères !')
            validated = false
        }

        if (!email.trim()) {
            setemailErr("L'email est obligatoire !")
            validated = false
        } else if (!regexEmail.test(email)) {
            setemailErr("L'adresse email saisie n'est pas valide !")
            validated = false
        }
        
        const regexPost = /^(?=.*\d)[a-zA-Z0-9\s,.'-]{10,}$/
        if (!adresseP.trim()) {
            setAdressePErr("L'adresse postale est obligatoire !")
        } else if (!regexPost.test(adresseP)) {
            setAdressePErr("L'adresse email saisie n'est pas valide !")
        }
        return validated
    }

    const reset = () => {
        setLname('')
        setLnameErr('')
        setFname('')
        setFnameErr('')
        setEmail('')
        setemailErr('')
        setAdressePErr('')
    }
    const handleClose = () => {
        reset()
        return;
    }
    return (<>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-outline btn-base-content" onClick={() => document.getElementById('form_modal').showModal()}>Ajouter un contact</button>
        <dialog id="form_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4 text-xs text-primary">Appuyez sur Echap ou sur le bouton fermer le formulaire</p>


                <form method="dialog" onSubmit={handleSubmit}>
                    {/* if there is a button in form, it will close the modal */}
                    <div className="flex col">
                        <fieldset className="fieldset block">
                            <legend className="fieldset-legend">NOM<span className="text-error">*</span></legend>
                            <input type="text"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                className="input"
                                placeholder="Insérez votre Nom" />
                            {lnameErr && <p className="text-error">{lnameErr}</p>}
                        </fieldset>
                        <fieldset className="fieldset block">
                            <legend className="fieldset-legend">Prénom<span className="text-error">*</span></legend>
                            <input type="text"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                className="input"
                                placeholder="Insérez votre Prénom" />
                            {fnameErr && <p className="text-error">{fnameErr}</p>}
                        </fieldset>
                    </div>
                    <fieldset className="fieldset block">
                        <legend className="fieldset-legend">Adresse Email
                            <span className="text-error">*</span></legend>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            placeholder="Insérez votre adresse email" />
                        {emailErr && <p className="text-error">{emailErr}</p>}
                    </fieldset>
                    <fieldset className="fieldset block">
                        <legend className="fieldset-legend">Adresse Postale
                            <span className="text-error">*</span></legend>
                        <input type="text"
                            value={adresseP}
                            onChange={(e) => setAdresseP(e.target.value)}
                            className="input"
                            placeholder="Insérez votre adresse postale" />
                        {adressePErr && <p className="text-error">{adressePErr}</p>}
                    </fieldset>
                    <div className="modal-action flex flex-col">
                        <p className="py-4 text-xs text-white italic"><span className="text-error">*</span> Indique que les champs sont obligatoires</p>
                        <div className="mx-auto space-x-3">
                            <button className={`btn btn-primary`} type="submit">Ajouter</button>
                            <button className="btn btn-error"
                                onClick={() => {
                                    document.getElementById('form_modal').close()
                                    handleClose()
                                }}>Fermer</button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    </>)
}