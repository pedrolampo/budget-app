import { Button, Modal, Stack } from 'react-bootstrap';
import { useContext } from 'react';
import {
    BudgetsContext,
    UNCATEGORIZED_BUDGET_ID,
} from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';

const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
        useContext(BudgetsContext);

    const expenses = getBudgetExpenses(budgetId);

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
            : budgets.find((b) => b.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Gastos - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button
                                variant="outline-danger"
                                onClick={() => {
                                    deleteBudget(budget);
                                    handleClose();
                                }}
                            >
                                Eliminar
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map((expense) => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">
                                {expense.description}
                            </div>
                            <div className="fs-5">
                                {currencyFormatter.format(expense.amount)}
                            </div>
                            <Button
                                onClick={() => deleteExpense(expense)}
                                size="sm"
                                variant="outline-danger"
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpensesModal;
