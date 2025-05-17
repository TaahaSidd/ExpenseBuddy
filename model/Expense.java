
import java.time.LocalDate;
import jakar ;

public class Expense {

    private final double amount;
    private final LocalDate date;
    private final String category;
    private final String description;

    public Expense(double amount, LocalDate date, String category, String description) {
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public void DisplayAllExpense() {
        System.out.println("Expense " + amount);
    }
}
