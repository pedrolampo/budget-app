import { Button, Form, Modal } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import { BudgetsContext } from '../contexts/BudgetsContext';

const AddBudgetModal = ({ show, handleClose }) => {
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useContext(BudgetsContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Presupuesto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Gasto Máximo</Form.Label>
                        <Form.Control
                            ref={maxRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddBudgetModal;
