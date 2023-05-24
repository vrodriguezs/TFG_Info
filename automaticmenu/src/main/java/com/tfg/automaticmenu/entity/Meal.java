package com.tfg.automaticmenu.entity;

import java.util.ArrayList;
import java.util.List;

public class Meal {

    String name;
    List<Course> courses;

    public Meal(String name) {
        this.name = name;
        courses = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public void addCourse(Course course) {
        courses.add(course);
    }
}
