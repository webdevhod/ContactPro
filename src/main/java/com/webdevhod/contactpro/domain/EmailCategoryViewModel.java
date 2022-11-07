package com.webdevhod.contactpro.domain;

import java.io.Serializable;

/**
 * A EmailCategoryViewModel.
 */
public class EmailCategoryViewModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private EmailData emailData;
    private Category category;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public EmailData getEmailData() {
        return this.emailData;
    }

    public EmailCategoryViewModel emailData(EmailData emailData) {
        this.setEmailData(emailData);
        return this;
    }

    public void setEmailData(EmailData emailData) {
        this.emailData = emailData;
    }

    public Category getCategory() {
        return this.category;
    }

    public EmailCategoryViewModel category(Category category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmailCategoryViewModel{" +
            "emailData='" + getEmailData() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
