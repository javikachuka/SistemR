import url from './config'
import axios from 'axios'

export async function getLocalidades(){
    const res = await axios.get( url+'localidades')
    return res.data
}

export async function getLocalidadesByProvincia(idProvincia){
    const res = await axios.get( url+'localidades/'+idProvincia)
    return res.data
}
