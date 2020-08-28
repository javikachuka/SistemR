import url from './config'
import axios from 'axios'

export async function getProvincias(){
    const res = await axios.get( url+'provincias')
    return res.data
}

export async function getProvinciasByPais(idPais){
    const res = await axios.get( url+'provincias/'+idPais)
    return res.data
}
