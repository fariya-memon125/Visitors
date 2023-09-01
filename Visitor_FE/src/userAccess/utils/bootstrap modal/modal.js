import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './modal.css'
import {useHistory} from 'react-router-dom'
const ModalExample = (props) => {
    let {
        onModal,
        status,
        body,
        title,
        btn1,
        btn2,
        after

    } = props;
    const [modal, setModal] = useState(false);
    const history = useHistory()
    const toggle = () => {
        setModal(!modal)
        if(modal) return after()
    }
    useEffect(() => {
        if (!status) return
        setModal(status)
        onModal(!status)
        status = undefined
    }, [status, modal])
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className="">
                <ModalHeader className="" toggle={toggle}>{title}</ModalHeader>
                <ModalBody className="">
                    {body}
                </ModalBody>
                <ModalFooter className="" >
                    {btn1 ? <Button onClick={toggle}>{btn1}</Button> : null}
                    {btn2 ? <Button onClick={toggle}>{btn2}</Button> : null}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;