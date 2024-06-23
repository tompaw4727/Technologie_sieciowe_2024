package com.example.demo.dto;

public class LoginResponseDTO {
    private String token;
    private Integer userId;
    private String userRole;

    public LoginResponseDTO(String token, long userId ) {}

    /**
     * Constructs a new LoginResponseDTO with the specified token.
     *
     * @param token the authentication token
     */
    public LoginResponseDTO(String token, Integer userId, String userRole) {
        this.token = token;
        this.userId= userId;
        this.userRole = userRole;
    }

    /**
     * Returns the authentication token.
     *
     * @return the authentication token
     */
    public String getToken() {
        return token;
    }

    /**
     * Sets the authentication token.
     *
     * @param token the authentication token
     */
    public void setToken(String token) {
        this.token = token;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserID(Integer userID) {
        this.userId = userID;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
