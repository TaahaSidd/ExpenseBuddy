// Base URL of the backend
const baseUrl = "http://localhost:8080/api/expenses";

// Handle form submission to add a new expense
document.querySelector('.form-container').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Retrieve input values
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = new Date().toISOString().split('T')[0]; // Automatically add today's date
    const selectedChip = document.querySelector('.category-chip.selected');
    const category = selectedChip ? selectedChip.textContent : null;

    // Validate inputs
    if (!description || !amount || !category) {
        alert('Please fill in all fields and select a category.');
        return;
    }

    const expense = { description, amount, category, date };

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense),
        });
        const data = await response.json();
        alert('Expense added successfully!');
        console.log(data);

        // Display the recent expense in the section
        displayRecentExpense(data); // Pass the added expense data to the function

        // Clear form inputs        document.getElementById('amount').value = '';
        document.querySelectorAll('.category-chip').forEach(chip => chip.classList.remove('selected'));

    } catch (error) {
        console.error('Error adding expense:', error);
    }
});

// Fetch expenses from the server and render them dynamically
async function fetchExpenses() {
    try {
        const response = await fetch(baseUrl); // Replace with your actual API endpoint
        const expenses = await response.json();
        const expenseList = document.getElementById('recentExpensesList');
        expenseList.innerHTML = ''; // Clear current list

        expenses.forEach((expense) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.id = `expense-${expense.id}`; // Use a unique ID for each expense

            const expenseDetails = document.createElement('div');
            expenseDetails.classList.add('expense-details');
            expenseDetails.innerHTML = `
                <span class="expense-name">${expense.description}</span>
                <span class="expense-amount">₹${expense.amount}</span>
                <span class="expense-date">${expense.date}</span>
            `;
            expenseItem.appendChild(expenseDetails);

            const expenseActions = document.createElement('div');
            expenseActions.classList.add('expense-actions');
            expenseActions.innerHTML = `
                <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseItem.appendChild(expenseActions);

            expenseList.appendChild(expenseItem); // Add the item to the list
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Delete an expense by ID
async function deleteExpense(expenseId) {
    try {
        const response = await fetch(`${baseUrl}/${expenseId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Expense deleted successfully!');
            fetchExpenses(); // Reload expenses after deletion
        } else {
            alert('Error deleting expense');
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}

// Edit an expense by ID
function editExpense(expenseId) {
    const expenseItem = document.getElementById(`expense-${expenseId}`);
    const expenseName = expenseItem.querySelector('.expense-name').textContent;
    const expenseAmount = expenseItem.querySelector('.expense-amount').textContent.replace('₹', '');
    const expenseDate = expenseItem.querySelector('.expense-date').textContent;

    // Pre-fill the form for editing
    document.getElementById('description').value = expenseName;
    document.getElementById('amount').value = expenseAmount;
    document.getElementById('date').value = expenseDate;

    // Add an "Update Expense" button dynamically
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Expense';
    updateButton.classList.add('btn', 'btn-primary');
    updateButton.onclick = async (e) => {
        e.preventDefault();
        const updatedExpense = {
            description: document.getElementById('description').value,
            amount: document.getElementById('amount').value,
            date: document.getElementById('date').value,
        };

        try {
            await fetch(`${baseUrl}/${expenseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExpense),
            });
            alert('Expense updated successfully!');
            fetchExpenses(); // Reload expenses after updating
        } catch (error) {
            console.error('Error updating expense:', error);
        }

        // Remove the update button after updating
        updateButton.remove();
    };

    // Append the "Update Expense" button to the form if it doesn't already exist
    const form = document.querySelector('.form-container');
    if (!form.contains(updateButton)) form.appendChild(updateButton);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Scroll smoothly to the target section
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
        });

        // Activate the corresponding section and hide others
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// JavaScript to handle smooth scrolling
const addExpenseBtn = document.getElementById('addExpenseBtn');
const addExpenseSection = document.getElementById('addExpenseSection');

addExpenseBtn.addEventListener('click', () => {
    addExpenseSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryChips = document.querySelectorAll('.category-chip');
    let selectedCategory = null;

    categoryChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            // Remove the selected class from all chips
            categoryChips.forEach((chip) => chip.classList.remove('selected'));

            // Add the selected class to the clicked chip
            chip.classList.add('selected');
            selectedCategory = chip.textContent; // Store the selected category

            console.log(`Selected category: ${selectedCategory}`);
        });
    });
});

// Function to display recent expenses in the section
function displayRecentExpense(expense) {
    const recentExpensesList = document.getElementById('recentExpensesList');

    // Create a new row for the recent expense
    const expenseRow = document.createElement('div');
    expenseRow.classList.add('expense-row');

    // Create the expense item
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');

    // Create the expense icon
    const expenseIcon = document.createElement('div');
    expenseIcon.classList.add('expense-icon');
    expenseIcon.textContent = getExpenseIcon(expense.category); // Set the corresponding icon

    // Create the expense details
    const expenseDetails = document.createElement('div');
    expenseDetails.classList.add('expense-details');

    const expenseTitle = document.createElement('h3');
    expenseTitle.classList.add('expense-title');
    expenseTitle.textContent = expense.description;

    const expenseCategory = document.createElement('p');
    expenseCategory.classList.add('expense-category');
    expenseCategory.textContent = expense.category;

    const expenseAmount = document.createElement('p');
    expenseAmount.classList.add('expense-amount');
    expenseAmount.textContent = `$${expense.amount}`;

    // Append the details to the expense item
    expenseDetails.appendChild(expenseTitle);
    expenseDetails.appendChild(expenseCategory);
    expenseDetails.appendChild(expenseAmount);

    expenseItem.appendChild(expenseIcon);
    expenseItem.appendChild(expenseDetails);

    // Append the expense item to the row
    expenseRow.appendChild(expenseItem);

    // Add the row to the recent expenses list
    recentExpensesList.appendChild(expenseRow);
}

// Helper function to get the icon based on the category
function getExpenseIcon(category) {
    switch (category) {
        case 'Food':
            return '🍔';
        case 'Transportation':
            return '🚗';
        case 'Utilities':
            return '💡';
        case 'Entertainment':
            return '🎬';
        case 'Healthcare':
            return '💊';
        case 'Shopping':
            return '🛍️';
        case 'Travel':
            return '✈️';
        case 'Education':
            return '📚';
        case 'Salary':
            return '💼';
        case 'Others':
            return '💸';
        default:
            return '🛒'; // Default icon if no match
    }
}

// Function to calculate metrics and update the UI
async function updateMetrics() {
    try {
        const response = await fetch(baseUrl); // Fetch all expenses
        const expenses = await response.json();

        // Total Expenses Calculation
        const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        document.querySelector('.metrics-section .metric-value').textContent = `₹${totalExpenses.toFixed(2)}`;

        // Average Expense Calculation
        const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
        document.querySelectorAll('.metrics-section .metric-value')[1].textContent = `₹${averageExpense.toFixed(2)}`;

        // Category-wise Expense Calculation
        const categoryTotals = expenses.reduce((totals, expense) => {
            const category = expense.category;
            if (!totals[category]) {
                totals[category] = 0;
            }
            totals[category] += parseFloat(expense.amount);
            return totals;
        }, {});

        // Update category totals in the UI
        const categoryElements = document.querySelectorAll('.category-total');
        categoryElements.forEach((element) => {
            const category = element.dataset.category;
            if (categoryTotals[category] !== undefined) {
                element.textContent = `₹${categoryTotals[category].toFixed(2)}`;
            } else {
                element.textContent = '₹0.00';
            }
        });
    } catch (error) {
        console.error('Error fetching expenses for metrics:', error);
    }
}

// Function to update the expense distribution chart
function updateChart(categories) {
    const chartData = Object.entries(categories).map(([category, total]) => ({
        category,
        total,
    }));

    // Optionally, use a chart library like Chart.js to create a chart
    console.log('Category-wise Distribution:', chartData);
    // For now, we can log the data to inspect it.
}

// Fetch expenses and update the overview
async function fetchExpensesOverview() {
    try {
        const response = await fetch(baseUrl);
        const expenses = await response.json();

        if (expenses.length === 0) {
            return; // No expenses to show
        }

        const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        const averageExpense = totalExpenses / expenses.length;

        // Calculate monthly expenses
        const currentMonth = new Date().getMonth();
        const monthlyExpenses = expenses.filter(expense => new Date(expense.date).getMonth() === currentMonth);
        const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        const totalExpensesElement = document.getElementById('totalExpenses');
        const averageExpenseElement = document.getElementById('averageExpense');
        const monthlyExpensesElement = document.getElementById('monthlyExpenses');
        const monthlyChangeElement = document.getElementById('monthlyChange');

        totalExpensesElement.textContent = `₹${totalExpenses.toFixed(2)}`;
        averageExpenseElement.textContent = `₹${averageExpense.toFixed(2)}`;
        monthlyExpensesElement.textContent = `₹${monthlyTotal.toFixed(2)}`;

        // Calculate the monthly change in expenses (you can improve this logic as needed)
        const lastMonthExpenses = expenses.filter(expense => new Date(expense.date).getMonth() === currentMonth - 1);
        const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        const changePercentage = lastMonthTotal === 0 ? 0 : ((monthlyTotal - lastMonthTotal) / lastMonthTotal) * 100;
        monthlyChangeElement.textContent = `${changePercentage > 0 ? '+' : ''}${changePercentage.toFixed(2)}%`;

        // Update the chart
        updateChart(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Function to update the chart
function updateChart(expenses) {
    const categoryData = {};

    expenses.forEach(expense => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);

        if (categoryData[category]) {
            categoryData[category] += amount;
        } else {
            categoryData[category] = amount;
        }
    });

    // Prepare data for chart
    const chartLabels = Object.keys(categoryData);
    const chartValues = Object.values(categoryData);

    // Define a color palette for the gradients
    const gradientColors = chartLabels.map((_, index) => {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, `hsl(${index * 30}, 70%, 60%)`);  // Light color
        gradient.addColorStop(1, `hsl(${index * 30}, 70%, 40%)`);  // Darker shade
        return gradient;
    });

    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartValues,
                backgroundColor: gradientColors,  // Apply gradient colors to the segments
                borderColor: '#fff',  // Optional: white border around each segment
                borderWidth: 2,  // Optional: border width for segment separation
                hoverOffset: 10,  // Slightly elevate the segments on hover for a 3D effect
            }]
        },
        options: {
            responsive: true,
            cutout: '80%',  // Reduce the doughnut hole size for a sleek appearance
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Arial, sans-serif',
                            weight: 'bold',
                            size: 14,  // Larger font size for clarity
                        },
                        padding: 20,  // Adds padding between legend items
                    },
                },
                tooltip: {
                    backgroundColor: '#fff',  // Light background for tooltips
                    titleColor: '#333',  // Dark title color for better contrast
                    bodyColor: '#555',  // Subtle text color for body
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
                        },
                    },
                },
            },
            animation: {
                animateScale: true,  // Animate scale changes (for example, when data is updated)
                animateRotate: true,  // Animate the chart’s rotation
            },
        }
    });
}

// Fetch expenses when the page loads
document.addEventListener('DOMContentLoaded', fetchExpensesOverview);

const expenses = [
    { category: "Groceries", amount: 1500 },
    { category: "Transportation", amount: 500 },
    { category: "Dining Out", amount: 1200 },
    { category: "Utilities", amount: 800 },
    { category: "Groceries", amount: 300 },
    { category: "Transportation", amount: 200 },
];

const categories = [
    { name: "Groceries", icon: "🥦" },
    { name: "Transportation", icon: "🚗" },
    { name: "Dining Out", icon: "🍔" },
    { name: "Utilities", icon: "💻" },
];

// Calculate total expenses by category
const categoryTotals = categories.map((category) => {
    const total = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0);

    return { ...category, total };
});

// Render categories dynamically
const categoryGrid = document.getElementById("category-grid");
categoryGrid.innerHTML = categoryTotals
    .map(
        (cat) => `
    <div class="category-item">
        <div class="category-icon">${cat.icon}</div>
        <h3 class="category-name">${cat.name}</h3>
        <p class="category-total">Total: ₹${cat.total}</p>
    </div>
    `
    )
    .join("");

const dots = document.querySelectorAll('.pagination-dot');
const messages = [
    "Track your daily expenses in seconds.",
    "Visualize spending with dynamic charts.",
    "Set savings goals and achieve them!"
];
const title = document.querySelector('.cta-title');
let currentIndex = 0; // To track the active dot

function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active')); // Remove 'active' class from all dots
    dots[index].classList.add('active'); // Add 'active' class to the current dot
    title.textContent = messages[index]; // Update the title text
}

function autoMoveDots() {
    currentIndex = (currentIndex + 1) % dots.length; // Increment index and loop back to 0
    updateDots(currentIndex); // Update the dots and message
}

// Start auto-moving dots every 3 seconds
setInterval(autoMoveDots, 3000);

// Optional: Add click functionality to override auto-move if a dot is clicked
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index; // Update currentIndex to the clicked dot
        updateDots(currentIndex);
    });
});