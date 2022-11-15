package com.webdevhod.contactpro.repository;

import com.webdevhod.contactpro.domain.Contact;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Contact entity.
 */
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    @Query("select contact from Contact contact where contact.appUser.login = ?#{principal.username}")
    List<Contact> findByAppUserIsCurrentUser();

    @Query("select contact from Contact contact where contact.appUser.login = ?#{principal.username}")
    Page<Contact> findByAppUserIsCurrentUser(Pageable pageable);

    @Query("select contact from Contact contact where contact.appUser.id = :id")
    List<Contact> findAllById(@Param("id") Long id);

    default Optional<Contact> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Contact> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    @Query(
        "select contact from Contact contact where contact.appUser.login = ?#{principal.username} and (lower(contact.fullName) like :likePattern or lower(contact.lastName || ' ' || contact.firstName) like :likePattern)"
    )
    List<Contact> findByFullNameContaining(@Param("likePattern") String likePattern);

    default Page<Contact> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct contact from Contact contact where contact.appUser.login = ?#{principal.username}",
        countQuery = "select count(distinct contact) from Contact contact"
    )
    Page<Contact> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct contact from Contact contact where contact.appUser.login = ?#{principal.username}")
    List<Contact> findAllWithToOneRelationships();

    @Query(
        "select contact from Contact contact left join fetch contact.categories where contact.appUser.login = ?#{principal.username} and contact.id =:id"
    )
    Optional<Contact> findOneWithToOneRelationships(@Param("id") Long id);

    @Query("select contact from Contact contact where contact.appUser.login = ?#{principal.username} and contact.id =:id")
    Optional<Contact> findOne(@Param("id") Long id);
}
