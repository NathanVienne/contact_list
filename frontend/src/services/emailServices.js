import client from '../api/axiosInstance'

export const fetchContact = () => client.get('/contacts')

export const createContact = ({ data }) => client.post('/contacts', data)

export const updateContact = ( id, data ) => client.patch(`/contacts/${id}`, data)

export const deleteContact = (id) => {
    const response = client.delete(`/contacts/${id}`)
    return response.data
}