// package com.expensetracker.backend.model;


// import org.apache.el.stream.Optional;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/users")
// public class userController {

//     @Autowired
//     private userService userService;

//     // Register a new user
//     @PostMapping("/register")
//     public ResponseEntity<User> registerUser(@RequestBody User user) {
//         User newUser = userService.registerUser(user);
//         return new ResponseEntity<>(newUser, HttpStatus.CREATED);
//     }

//     // Authenticate user
//     @PostMapping("/login")
//     public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
//         Optional<User> user = userService.authenticateUser(email, password);
//         if (user.isPresent()) {
//             return ResponseEntity.ok("Login successful");
//         }
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//     }
// }
