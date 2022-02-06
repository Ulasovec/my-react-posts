
import {Modal,Button} from "react-bootstrap";
import {useState} from "react";
import React from "react";
import LoginForm from "../../Pages/Registration/LoginForm";
import {useNavigate} from "react-router-dom";
import RegAdminsForm from "./RegAdminsForm";

export function ModalWindows() {
    const [show, setShow] = useState(true);
    const handleClose = () => {setShow(false);navigate('/');}
    const navigate = useNavigate();
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Заполните поля</Modal.Title>
                </Modal.Header>
                <Modal.Body><RegAdminsForm/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        На главную
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}