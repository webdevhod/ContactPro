package com.webdevhod.contactpro.service.impl;

import com.webdevhod.contactpro.domain.Contact;
import com.webdevhod.contactpro.repository.ContactRepository;
import com.webdevhod.contactpro.service.ContactService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Contact}.
 */
@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    private final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact save(Contact contact) {
        log.debug("Request to save Contact : {}", contact);
        return contactRepository.save(contact);
    }

    @Override
    public Contact update(Contact contact) {
        log.debug("Request to update Contact : {}", contact);
        return contactRepository.save(contact);
    }

    @Override
    public Optional<Contact> partialUpdate(Contact contact) {
        log.debug("Request to partially update Contact : {}", contact);

        return contactRepository
            .findById(contact.getId())
            .map(existingContact -> {
                if (contact.getFirstName() != null) {
                    existingContact.setFirstName(contact.getFirstName());
                }
                if (contact.getLastName() != null) {
                    existingContact.setLastName(contact.getLastName());
                }
                if (contact.getFullName() != null) {
                    existingContact.setFullName(contact.getFullName());
                }
                if (contact.getAddress1() != null) {
                    existingContact.setAddress1(contact.getAddress1());
                }
                if (contact.getAddress2() != null) {
                    existingContact.setAddress2(contact.getAddress2());
                }
                if (contact.getCity() != null) {
                    existingContact.setCity(contact.getCity());
                }
                if (contact.getState() != null) {
                    existingContact.setState(contact.getState());
                }
                if (contact.getZipCode() != null) {
                    existingContact.setZipCode(contact.getZipCode());
                }
                if (contact.getEmail() != null) {
                    existingContact.setEmail(contact.getEmail());
                }
                if (contact.getPhoneNumber() != null) {
                    existingContact.setPhoneNumber(contact.getPhoneNumber());
                }
                if (contact.getBirthDate() != null) {
                    existingContact.setBirthDate(contact.getBirthDate());
                }
                if (contact.getCreated() != null) {
                    existingContact.setCreated(contact.getCreated());
                }
                if (contact.getUpdated() != null) {
                    existingContact.setUpdated(contact.getUpdated());
                }
                if (contact.getImage() != null) {
                    existingContact.setImage(contact.getImage());
                }
                if (contact.getImageContentType() != null) {
                    existingContact.setImageContentType(contact.getImageContentType());
                }

                return existingContact;
            })
            .map(contactRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Contact> findAll(Pageable pageable) {
        log.debug("Request to get all Contacts");
        return contactRepository.findAll(pageable);
    }

    @Override
    public List<Contact> findByFullNameContaining(String likePattern) {
        return contactRepository.findByFullNameContaining(likePattern);
    }

    @Override
    public List<Contact> findByAppUserIsCurrentUser() {
        return contactRepository.findByAppUserIsCurrentUser();
    }

    @Override
    public Page<Contact> findByAppUserIsCurrentUser(Pageable pageable) {
        return contactRepository.findByAppUserIsCurrentUser(pageable);
    }

    public Page<Contact> findAllWithEagerRelationships(Pageable pageable) {
        return contactRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Contact> findOne(Long id) {
        log.debug("Request to get Contact : {}", id);
        return contactRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Contact : {}", id);
        contactRepository.deleteById(id);
    }
}
