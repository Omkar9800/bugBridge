package com.cdac.bugbridge.dao;

import java.util.List;
import java.util.Optional;

import com.cdac.bugbridge.exception.UserException;
import com.cdac.bugbridge.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.bugbridge.repository.UserRepository;
import com.cdac.bugbridge.util.UserRole;

@Service
public class UserDAOImpl implements UserDAO {

  private final UserRepository userRepository;

  // Constructor
  @Autowired
  public UserDAOImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // Registering a new user and saving to the database
  @Override
  public void addUser(User entityUser) throws UserException.UserAlreadyExistsException {
    try {
      userRepository.save(entityUser);
    } catch (Exception ex) {
      throw new UserException.UserAlreadyExistsException("Error: " + ex);
    }
  }

  // finding a user by email id
  @Override
  public Optional<User> findUserByEmail(String emailId) {
    return userRepository.findByEmail(emailId);
  }

  // finding a user by email id
  @Override
  public Optional<User> findUserById(Integer userId) {
    return userRepository.findById(userId);
  }

  @Override
  public int deleteUserByEmail(String emailId) {
    return 0;

  }

  @Override
  public int deleteUserById(Integer userId) {
    return userRepository.deleteUserById(userId);
  }

  @Override
  public List<User> listTesters() {
    return userRepository.findByRole(UserRole.TESTER);
  }

  @Override
  public List<User> listDevelopers() {
    // TODO Auto-generated method stub

    return null;
  }

  @Override
  public List<User> listDevelopersAndTesters() {
    // TODO Auto-generated method stub
    return null;

  }

  @Override
  public List<User> listAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public int updateUser(Integer uniqueId, User userDetails) {
    String userName = userDetails.getName();
    String userNewEmail = userDetails.getEmail();
    UserRole userRole = userDetails.getRole();
    return userRepository.updateById(uniqueId, userNewEmail, userName, userRole);
  }

}
