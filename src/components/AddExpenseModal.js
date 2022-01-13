import { Button, Form, Modal } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import {
    BudgetsContext,
    UNCATEGORIZED_BUDGET_ID,
} from '../contexts/BudgetsContext';

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const { addExpense, budgets } = useContext(BudgetsContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            ref={descriptionRef}
                            type="text"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Presupuesto</Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}
                        >
                            <option id={UNCATEGORIZED_BUDGET_ID}>
                                Sin Categorizar
                            </option>
                            {budgets.map((budget) => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
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

export default AddExpenseModal;
