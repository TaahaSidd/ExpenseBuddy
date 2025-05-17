
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.time.LocalDate;

public class expGui {

    private final ExpenseManager expenseManager;

    public expGui(ExpenseManager expenseManager) {
        this.expenseManager = expenseManager;
        MainGui();
    }

    public final void MainGui() {
        JFrame frame = new JFrame("Expense Tracker");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(500, 400);

        //
        frame.setLayout(new BorderLayout());

        // Creating Panel for input.
        JPanel inputPanel = new JPanel(new GridLayout(5, 2, 10, 10));
        inputPanel.setBorder(BorderFactory.createTitledBorder("Add Expense"));

        JTextField amountField = new JTextField();
        JComboBox<String> categoryBox = new JComboBox<>(
                new String[]{"Select Category", "Food", "Transport", "Entertainment", "Utilities", "Other"});
        JTextField descriptionField = new JTextField();
        JTextField dateFeild = new JTextField("YYYY-MM-DD");

        inputPanel.add(new JLabel("Amount:"));
        inputPanel.add(amountField);

        inputPanel.add(new JLabel("Category:"));
        inputPanel.add(categoryBox);

        inputPanel.add(new JLabel("Description:"));
        inputPanel.add(descriptionField);

        inputPanel.add(new JLabel("Date:"));
        inputPanel.add(dateFeild);

        JButton addButton = new JButton("Add Expense");
        addButton.setBackground(Color.red);
        addButton.setForeground(Color.white);
        inputPanel.add(addButton);

        //
        JTextArea displayArea = new JTextArea();
        displayArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(displayArea);
        scrollPane.setBorder(BorderFactory.createTitledBorder("Expense"));

        frame.add(inputPanel, BorderLayout.NORTH);
        frame.add(scrollPane, BorderLayout.CENTER);

        // button Action
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    double amount = Double.parseDouble(amountField.getText());
                    String category = (String) categoryBox.getSelectedItem();
                    String description = descriptionField.getText();
                    LocalDate date = LocalDate.parse(dateFeild.getText());

                    Expense expense = new Expense(amount, date, category, description);
                    expenseManager.addExpense(expense);
                    expenseManager.saveExpenses(); // Here is the saving info to the file.

                    displayArea.append("Added: " + expense.getAmount() + ", " + expense.getCategory() + ", "
                            + expense.getDescription() + ", " + expense.getDate() + "\n");

                    amountField.setText("");
                    descriptionField.setText("");
                    dateFeild.setText("YYYY-MM-DD");
                } catch (Exception ex) {
                    JOptionPane.showMessageDialog(frame, "Error: " + ex.getMessage(), "Input Error",
                            JOptionPane.ERROR_MESSAGE);
                }
            }

        });

        frame.setVisible(true);

    }
}
