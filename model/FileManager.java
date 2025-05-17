
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;

public class FileManager {
    private final String filename;

    public FileManager(String filename) {
        this.filename = filename;
    }

    public void saveExpenses(ArrayList<Expense> expenses) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            for (Expense exp : expenses) {
                writer.write(exp.getAmount() + ", " +
                        exp.getDate() + ", " +
                        exp.getCategory() + ", " +
                        "\"" + exp.getDescription() + "\"");
                writer.newLine();
            }
            System.out.println("Expenses Saved !");
        } catch (IOException e) {
            System.out.println("Error Saving Expenses ! ! " + e.getMessage());
        }
    }

    public ArrayList<Expense> loadExpenses() {
        ArrayList<Expense> expenses = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 4) {
                    double amount = Double.parseDouble(parts[0].trim());
                    LocalDate date = LocalDate.parse(parts[1].trim());
                    String category = parts[2].trim();
                    String description = parts[3].trim();
                    expenses.add(new Expense(amount, date, category, description));
                }
            }
            System.out.println("Expenses loaded from file !");
        } catch (FileNotFoundException e) {
            System.out.println("File not found : " + filename);
        } catch (IOException e) {
            System.out.println("Error Reading File :" + e.getMessage());
        }

        return expenses;
    }

}
