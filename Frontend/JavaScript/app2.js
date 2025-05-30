const baseUrl = "http://localhost:8080/api/expenses";

async function updateReportPageMetrics() {
    try {
        const response = await fetch(baseUrl); // Fetch all expenses
        const expenses = await response.json();

        // Total Expenses Calculation
        const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        document.getElementById('totalExpense').textContent = `₹${totalExpenses.toFixed(2)}`;

        // Average Daily Expense Calculation
        const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
        document.getElementById('avgDailyExpense').textContent = `₹${averageExpense.toFixed(2)}`;

        // Find Top Category (category with highest total expense)
        const categoryTotals = expenses.reduce((totals, expense) => {
            const category = expense.category;
            if (!totals[category]) {
                totals[category] = 0;
            }
            totals[category] += parseFloat(expense.amount);
            return totals;
        }, {});

        // Find the category with the highest total
        const topCategory = Object.keys(categoryTotals).reduce((topCat, category) => {
            if (categoryTotals[category] > categoryTotals[topCat]) {
                return category;
            }
            return topCat;
        }, Object.keys(categoryTotals)[0] || 'None');

        document.getElementById('topCategory').textContent = topCategory;

    } catch (error) {
        console.error('Error fetching expenses for metrics:', error);
    }
}

// Call the function to update the report page
updateReportPageMetrics();

async function updateExpenseAnalysis(filter = 'month') {
    try {
        const response = await fetch(baseUrl); // Fetch all expenses
        const expenses = await response.json();

        // Filter expenses based on the selected range
        const filteredExpenses = filterExpensesByDate(expenses, filter);

        // Prepare data for the chart
        const chartData = prepareChartData(filteredExpenses);

        // Update the chart
        updateChart(chartData);
    } catch (error) {
        console.error('Error fetching expenses for chart:', error);
    }
}

// Filter expenses based on the selected range (week/month/custom)
function filterExpensesByDate(expenses, filter) {
    const now = new Date();
    let startDate;

    if (filter === 'week') {
        startDate = new Date(now.setDate(now.getDate() - 7)); // Last 7 days
    } else if (filter === 'month') {
        startDate = new Date(now.setMonth(now.getMonth() - 1)); // Last month
    } else if (filter === 'custom') {
        // Custom date range logic (if needed)
        startDate = new Date('2025-01-01'); // Example: set custom date
    }

    return expenses.filter((expense) => new Date(expense.date) >= startDate);
}

// Prepare data for the chart based on filtered expenses
function prepareChartData(filteredExpenses) {
    const labels = [];
    const amounts = [];

    filteredExpenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const dateString = `${expenseDate.getDate()}/${expenseDate.getMonth() + 1}`; // e.g. 21/1
        if (!labels.includes(dateString)) {
            labels.push(dateString);
            amounts.push(parseFloat(expense.amount));
        } else {
            const index = labels.indexOf(dateString);
            amounts[index] += parseFloat(expense.amount);
        }
    });

    return {
        labels: labels,
        datasets: [{
            label: 'Expenses Over Time',
            data: amounts,
            borderColor: '#000000',
            backgroundColor: 'rgb(255, 255, 255)',
            borderWidth: 2,
        }],
    };
}

// Update the chart with new data
function updateChart(chartData) {
    const ctx = document.getElementById('expenseTrendsChart').getContext('2d');

    if (window.expenseChart) {
        window.expenseChart.destroy();
    }

    window.expenseChart = new Chart(ctx, {
        type: 'line', // Line chart
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        beginAtZero: true,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount (₹)',
                        beginAtZero: true,
                    },
                    ticks: {
                        beginAtZero: true,
                    },
                },
            },
            elements: {
                line: {
                    tension: 0.4, // Makes the line curves smoother (higher value for more rounded lines)
                    borderCapStyle: 'round', // Rounds the ends of the line
                    borderJoinStyle: 'round', // Rounds the corners where lines meet
                    borderWidth: 3, // Sets the thickness of the line
                },
                point: {
                    radius: 5, // Controls the size of the points on the line (optional)
                    hoverRadius: 7, // Size of the point when hovered (optional)
                    backgroundColor: '#4e73df', // Color of the points
                },
            },
        },
    });

}

// Event listeners for filter buttons
document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const filter = event.target.getAttribute('data-filter');
        updateExpenseAnalysis(filter);
    });
});

// Initial chart rendering (e.g., for last month)
updateExpenseAnalysis('month');

// Fetch expenses and display them in the table
async function fetchExpenses() {
    try {
        const response = await fetch(baseUrl);
        expenses = await response.json();
        const tableBody = document.getElementById('expenseTable');
        tableBody.innerHTML = ''; // Clear existing rows

        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Attach event listeners to Edit and Delete buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });

    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Show the modal and populate it with the selected expense's data
function handleEdit(event) {
    const index = event.target.getAttribute('data-index');
    const expense = expenses[index]; // Get the corresponding expense from the data

    // Populate modal with expense data
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editCategory').value = expense.category;
    document.getElementById('editDescription').value = expense.description;
    document.getElementById('editDate').value = expense.date;  // Ensure this is populated as well

    // Store the index for later use when saving
    document.getElementById('saveEditBtn').setAttribute('data-index', index);

    // Show the modal (make it visible)
    const modal = document.getElementById('editExpenseModal');
    modal.style.display = 'flex';
}

// Save edited expense data
async function saveEdit() {
    const index = document.getElementById('saveEditBtn').getAttribute('data-index'); // Get the expense index
    const updatedExpense = {
        amount: document.getElementById('editAmount').value,
        category: document.getElementById('editCategory').value,
        description: document.getElementById('editDescription').value,
        date: document.getElementById('editDate').value,
    };

    try {
        // Send the updated data to the server (or data store)
        const response = await fetch(`${baseUrl}/${expenses[index].id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExpense),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        console.log('Expense updated:', result);

        // Close the modal
        document.getElementById('editExpenseModal').style.display = 'none';

        // Refresh the expense table to reflect the changes
        fetchExpenses();

    } catch (error) {
        console.error('Error updating expense:', error);
    }
}

// Handle delete action
async function handleDelete(event) {
    const index = event.target.getAttribute('data-index');
    try {
        const response = await fetch(`${baseUrl}/${expenses[index].id}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        console.log('Expense deleted:', result);
        fetchExpenses(); // Refresh table
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}

// Close modal when the close button is clicked
document.getElementById('closeEditModalBtn').onclick = () => {
    document.getElementById('editExpenseModal').style.display = 'none';
};

// Save the changes when the "Save" button in the modal is clicked
document.getElementById('saveEditBtn').onclick = saveEdit;

// Initialize the page
fetchExpenses();