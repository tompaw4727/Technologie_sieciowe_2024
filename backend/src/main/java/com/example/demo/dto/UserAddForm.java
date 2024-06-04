package com.example.demo.dto;

public class UserAddForm {
    private String username;
    private String password;
    private String role;
    private String fullName;
    private String userMail;

    public UserAddForm(String username, String password, String role, String fullName, String userMail) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.fullName = fullName;
        this.userMail = userMail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }
}
