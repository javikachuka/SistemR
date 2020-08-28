import url from './config'
import axios from 'axios'

export async function getPersonas(){
    const res = await axios.get( url+'personas')
    return res.data
}

export async function savePersona(form){
    const res = await axios.post(url+'personas', form)
    return res.data
}

export async function editPersona(form){
    const res = await axios.put(url+'personas', form )
    return res.data
}

export async function deletePersona(value){
    const res = await axios.delete(url+'personas/'+value)
    return res.data
}

export async function getPersonaById(id){
    const res = await axios.get(url+'personas/'+id)
    console.log(res.data)
    return res.data
}



