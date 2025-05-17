document.addEventListener('DOMContentLoaded', () => {
    // Get the elements for sign-in and sign-up containers and buttons
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // Toggle between sign-up and sign-in forms when the respective button is clicked
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Get the forms
    const signUpForm = document.querySelector('.sign-up-container form');
    const signInForm = document.querySelector('.sign-in-container form');

    // Function to check if all fields are filled
    function checkEmptyFields(form) {
        const inputs = form.querySelectorAll('input');
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.borderColor = "red"; // Change border color if field is empty
                allFilled = false;
            } else {
                input.style.borderColor = "#ccc"; // Reset border color if field is filled
            }
        });
        return allFilled;
    }

    // Prevent form submission if any field is empty
    signUpForm.addEventListener('submit', function (e) {
        if (!checkEmptyFields(signUpForm)) {
            e.preventDefault(); // Stop form submission if any field is empty
            alert('Please fill out all fields'); // Optional alert for user feedback
        }
    });

    signInForm.addEventListener('submit', function (e) {
        if (!checkEmptyFields(signInForm)) {
            e.preventDefault(); // Stop form submission if any field is empty
            alert('Please fill out all fields'); // Optional alert for user feedback
        }
    });
});