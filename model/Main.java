
public class Main {

    public static void main(String[] args) {
        ExpenseManager expenseManager = new ExpenseManager("expense.csv");
        new expGui(expenseManager);

        // javax.swing.SwingUtilities.invokeLater(() -> new expGui(expenseManager));
        // this is the another way of adding gui.
        // Console Approah
        /*
         * while (true) {
         * System.out.println("\nExpense Tracker Menu:");
         * System.out.println("1. Add Expense");
         * System.out.println("2. Display All Expenses");
         * System.out.println("3. Display Expenses by Category");
         * System.out.println("4. Calculate Total Expense");
         * // System.out.println("5. Load the File");
         * System.out.println("5. Exit");
         * System.out.print("Enter your choice: ");
         * int option = sc.nextInt();
         * 
         * switch (option) {
         * case 1:
         * System.out.println("Enter Amount : ");
         * double amount = sc.nextDouble();
         * sc.nextLine();
         * 
         * System.out.println("Enter Category (Select From Available Categories) : ");
         * expenseManager.displayAllCategory();
         * String category = sc.nextLine();
         * 
         * System.out.println("Enter Description : ");
         * String description = sc.nextLine();
         * 
         * System.out.println("Enter Date (YYYY-MM-DD) ");
         * String inpDate = sc.nextLine();
         * LocalDate date = LocalDate.parse(inpDate);
         * 
         * Expense expense = new Expense(amount, date, category, description);
         * expenseManager.addExpense(expense);
         * expenseManager.saveExpenses(); // saving content to file.
         * break;
         * case 2:
         * expenseManager.DisplayAllExpense();
         * // expenseManager.loadExpenses(); will work on this later.
         * break;
         * 
         * case 3:
         * System.out.println("Enter Category to Search : ");
         * String searchCat = sc.next();
         * expenseManager.searchCategory(searchCat);
         * break;
         * 
         * case 4:
         * double totalExp = expenseManager.calTotalExpense();
         * System.out.println("Total Expenses : " + totalExp);
         * break;
         * 
         * // case 5:
         * // expenseManager.loadExpenses();
         * // break;
         * 
         * case 5:
         * System.exit(0);
         * break;
         * 
         * default:
         * System.out.println("Invalid Input ! ! ! ! ");
         * break;
         * }
         * }
         */
    }
}
