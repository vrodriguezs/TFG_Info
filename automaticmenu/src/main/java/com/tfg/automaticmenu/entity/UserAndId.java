package com.tfg.automaticmenu.entity;

public class UserAndId {
    private User user;
    private String userId;

    // Getter and Setter methods

    // Constructor
    public UserAndId(User user, String userId) {
        this.user = user;
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public String getUserId() {
        return userId;
    }
}
