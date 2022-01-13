import { Button, Container, Stack } from 'react-bootstrap';
import AddBudgetModal from './components/AddBudgetModal';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import TotalBudgetCard from './components/TotalBudgetCard';

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setviewExpensesModalBudgetId] =
        useState();
    const [addExpenseModalBudgetId, setaddExpenseModalBudgetId] = useState();
    const { budgets, getBudgetExpenses } = useBudgets();

    const openAddExpenseModal = (budgetId) => {
        setShowAddExpenseModal(true);
        setaddExpenseModalBudgetId(budgetId);
    };

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Planilla de Presupuestos</h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                        Agregar Presupuesto
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={openAddExpenseModal}
                    >
                        Agregar Gasto
                    </Button>
                </Stack>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(300px, 1fr',
                        gap: '1rem',
                        alignItems: 'flex-start',
                    }}
                >
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        );
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() =>
                                    openAddExpenseModal(budget.id)
                                }
                                onViewExpensesClick={() =>
                                    setviewExpensesModalBudgetId(budget.id)
                                }
                            />
                        );
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() =>
                            setviewExpensesModalBudgetId(
                                UNCATEGORIZED_BUDGET_ID
                            )
                        }
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setviewExpensesModalBudgetId()}
            />
        </>
    );
}

export default App;
