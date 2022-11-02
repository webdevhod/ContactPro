package com.webdevhod.contactpro.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmailContactViewModel.
 */
public class EmailContactViewModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private Contact contact;
    private EmailData emailData;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public Contact getContact() {
        return this.contact;
    }

    public EmailContactViewModel contact(Contact contact) {
        this.setContact(contact);
        return this;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public EmailData getEmailData() {
        return this.emailData;
    }

    public EmailContactViewModel emailData(EmailData emailData) {
        this.setEmailData(emailData);
        return this;
    }

    public void setEmailData(EmailData emailData) {
        this.emailData = emailData;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmailContactViewModel{" +
            "contact='" + getContact() + "'" +
            ", emailData='" + getEmailData() + "'" +
            "}";
    }
}
