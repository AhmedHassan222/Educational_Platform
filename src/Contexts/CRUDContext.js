import { createContext } from "react"
import Cookies from "js-cookie";
import axios from "axios";
export let CRUDContext = createContext(0)
export default function CRUDContextProvide(props) {
    // BASE URL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION ADD >>>>>>>>>>>>>>>>
    async function getAll(endPoint) {
        const { data } = await axios.get(`${baseURL}/${endPoint}`);
        return data.data;
    };
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION ADD
    async function addItem(endPoint, object) {
        await axios.post(`${baseURL}/${endPoint}`, object, {
            headers: {
                'name': 'token',
                "value": `online__${Cookies.get('token')}`
            },
        })
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION UPDATE
    async function updateItem(endPoint, id, object) {
        await axios.put(`${baseURL}/${endPoint}${id}`, object, {
            headers: {
                'name': 'token',
                "value": `online__${Cookies.get('token')}`
            },
        })
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION DELETE
    async function deleteItem(endPoint, id) {
        await axios.delete(`${baseURL}/${endPoint}${id}`, {
            headers: {
                'name': 'token',
                "value": `online__${Cookies.get('token')}`
            },
        })
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION GET ITEM
    async function getItem(endPoint) {
        const { data } = await axios.get(`${baseURL}/${endPoint}`);
        return data;
    };
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION SEARCH
    async function search(endPoint) {
        let { data } = await axios.get(`${baseURL}/${endPoint}`);
        return data.data;
    }
    return <CRUDContext.Provider value={{ getAll, updateItem, deleteItem, getItem, search, addItem }}>
        {props.children}
    </CRUDContext.Provider>
}
