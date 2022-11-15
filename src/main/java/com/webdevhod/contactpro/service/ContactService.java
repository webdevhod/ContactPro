package com.webdevhod.contactpro.service;

import com.webdevhod.contactpro.domain.Contact;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

/**
 * Service Interface for managing {@link Contact}.
 */
public interface ContactService {
    /**
     * Save a contact.
     *
     * @param contact the entity to save.
     * @return the persisted entity.
     */
    Contact save(Contact contact);

    /**
     * Updates a contact.
     *
     * @param contact the entity to update.
     * @return the persisted entity.
     */
    Contact update(Contact contact);

    /**
     * Partially updates a contact.
     *
     * @param contact the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Contact> partialUpdate(Contact contact);

    /**
     * Get all the contacts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Contact> findAll(Pageable pageable);

    List<Contact> findByFullNameContaining(String likePattern);

    List<Contact> findByAppUserIsCurrentUser();
    Page<Contact> findByAppUserIsCurrentUser(Pageable pageable);

    /**
     * Get all the contacts with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Contact> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" contact.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Contact> findOne(Long id);

    /**
     * Delete the "id" contact.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Optional<Contact> findOneWithEagerRelationships(Long id);

    List<Contact> findAllById(Long id);
}
