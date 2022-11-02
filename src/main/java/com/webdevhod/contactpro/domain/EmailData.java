package com.webdevhod.contactpro.domain;

import java.io.Serializable;
import javax.validation.constraints.*;

/**
 * A EmailData.
 */
public class EmailData implements Serializable {

    private String emailAddress;

    private String subject;
    private String body;
    private Long id;
    private String firstName;
    private String lastName;
    private String groupName;

    public EmailData() {
        this.id = Long.valueOf(0);
        this.emailAddress = "";
        this.subject = "";
        this.body = "";
        this.firstName = "";
        this.lastName = "";
        this.groupName = "";
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public EmailData emailAddress(String emailAddress) {
        this.setEmailAddress(emailAddress);
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getSubject() {
        return this.subject;
    }

    public EmailData subject(String subject) {
        this.setSubject(subject);
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return this.body;
    }

    public EmailData body(String body) {
        this.setBody(body);
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public EmailData firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public EmailData lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGroupName() {
        return this.groupName;
    }

    public EmailData groupName(String groupName) {
        this.setGroupName(groupName);
        return this;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmailData{" +
            "emailAddress='" + getEmailAddress() + "'" +
            ", subject='" + getSubject() + "'" +
            ", body='" + getBody() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", groupName='" + getGroupName() + "'" +
            "}";
    }
}
