package com.expensetracker.backend.Service;
// package com.expensetracker.backend.model;

// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class userService {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private BCryptPasswordEncoder passwordEncoder;

//     public User registerUser(User user) {
//         // Encrypt password before saving
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         return userRepository.save(user);
//     }

//     public Optional<User> authenticateUser(String email, String password) {
//         Optional<User> user = userRepository.findByEmail(email);
//         if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
//             return user;
//         }
//         return Optional.empty();
//     }
// }
