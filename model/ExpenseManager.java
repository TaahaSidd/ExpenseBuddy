
import java.util.ArrayList;

public class ExpenseManager {

    private ArrayList<Expense> Expenses;
    private final ArrayList<String> categories;
    private final FileManager fileManager;

    public ExpenseManager(String filename) {
        Expenses = new ArrayList<>();
        categories = new ArrayList<>();
        predefinedCategories();
        fileManager = new FileManager(filename);
    }

    public void saveExpenses() {
        fileManager.saveExpenses(Expenses);
    }

    public void loadExpenses() {
        Expenses = fileManager.loadExpenses();
    }

    //Adding
    public void addExpense(Expense exp) {
        if (exp != null) {
            Expenses.add(exp);
            System.out.println("Expense Added Succesfully ! ");
        } else {
            System.out.println("Invalid Expense, Cannot Add ! ");
        }
    }

    // displaying all expenses.
    public void DisplayAllExpense() {
        for (Expense exp : Expenses) {
            exp.DisplayAllExpense();
            System.out.println();
        }
    }

    // function to add all the expenses.
    public double calTotalExpense() {
        double total = 0;

        for (Expense exp : Expenses) {
            total += exp.getAmount();
        }
        return total;
    }

    // Function to remove expense.
    // public void removeExpense(Expense expense) {
    // if (Expenses.remove(expense)) {
    // System.out.println("Expense Removed Sucessfully ! ! ");
    // } else {
    // System.out.println("Expense Not Found ! ! ");
    // }
    // }
    private void predefinedCategories() {
        categories.add("FOOD");
        categories.add("TRANSPORT");
        categories.add("ENTERTAINMENT");
        categories.add("UTILITIES");
        categories.add("Other");
    }

    // Adding Custom Category.
    public void addCustCategory(String category) {
        if (!categories.contains(category)) {
            categories.add(category);
            System.out.println("Category Added Successfully !");
        } else {
            System.out.println("Category Already Exists " + category);
        }
    }

    // function to Display all the category
    public void displayAllCategory() {
        System.out.println("Available Categories : ");
        for (String category : categories) {
            System.out.println("- " + category);
        }
    }

    // function to Search Category
    public void searchCategory(String category) {
        boolean found = false;
        for (Expense exp : Expenses) {
            if (exp.getCategory().equalsIgnoreCase(category)) {
                exp.DisplayAllExpense();
                System.out.println();
                found = true;
            }
        }
        if (!found) {
            System.out.println("No Expenses Found : " + category);
        }
    }

    public ArrayList<String> getCategories() {
        return categories;
    }
}
