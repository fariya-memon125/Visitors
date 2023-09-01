import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import Sub from './sub'
    const Select = ({ onSelect }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [value, setValue] = useState()
    const [name, setName] = useState()
    useEffect(() => {
        if (!value) return
        onSelect(value)
    }, [value])

    const set=(e)=>{
        setValue(e.target.value)
        setName(e.target.name)
    }
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}  >
            <DropdownToggle caret className="form-control text-white " >
                {!name ? "Choose your signup status" : name}
            </DropdownToggle>
            <DropdownMenu className="form-control" >
                <DropdownItem className="text-dark"  header>Choose your signup status!</DropdownItem>
                <DropdownItem className="text-white"  onClick={set} value="0" name="Advanced User" >Advanced User</DropdownItem>
                <DropdownItem  divider />
                <DropdownItem className="text-white" onClick={set} value="1" name="Employee User">Employee User</DropdownItem>
                <DropdownItem  divider />
                <DropdownItem className="text-white" onClick={set} value="2" name="Normal User">Normal User</DropdownItem>
                <DropdownItem  divider />
                {/* <Sub  /> */}
            </DropdownMenu>
        </Dropdown>
    );
}

export default Select;