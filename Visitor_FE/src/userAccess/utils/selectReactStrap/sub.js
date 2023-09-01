import React,{useEffect, useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default function Sub({selected}){
    const [Svalue, setSvalue] = useState()
    const [Sname, setSname] = useState()
    const [select, setSelect] = useState()
    console.log(Svalue)
    console.log(Sname)

    const set=(e)=>{
        setSvalue(e.target.value)
        console.log(Svalue)
        setSname(e.target.name)
    }
    // useEffect(()=>{
    //     if(!value || !name)return 
    //     selected(value , name)
    // },[value,name])

    useEffect(()=>{
        console.log(Svalue)
    })

    return (
        <div>
            <DropdownItem className="text-white bg-info " onClick={set(e)}  value="0" name="Advanced User" >Advanced User</DropdownItem>
            <DropdownItem divider />
        </div>
    )
}
