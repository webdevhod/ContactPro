package com.webdevhod.contactpro.web.rest;

import com.webdevhod.contactpro.domain.*;
import com.webdevhod.contactpro.repository.ContactRepository;
import com.webdevhod.contactpro.security.SecurityUtils;
import com.webdevhod.contactpro.service.CategoryService;
import com.webdevhod.contactpro.service.ContactService;
import com.webdevhod.contactpro.service.MailService;
import com.webdevhod.contactpro.service.UserService;
import com.webdevhod.contactpro.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.webdevhod.contactpro.domain.Contact}.
 */
@RestController
@RequestMapping("/api")
public class ContactResource {

    private final Logger log = LoggerFactory.getLogger(ContactResource.class);

    private static final String ENTITY_NAME = "contact";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactService contactService;

    private final CategoryService categoryService;

    private final ContactRepository contactRepository;

    private final UserService userService;

    private final MailService mailService;

    public ContactResource(
        ContactService contactService,
        ContactRepository contactRepository,
        UserService userService,
        CategoryService categoryService,
        MailService mailService
    ) {
        this.contactService = contactService;
        this.contactRepository = contactRepository;
        this.userService = userService;
        this.categoryService = categoryService;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /contacts} : Create a new contact.
     *
     * @param contact the contact to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contact, or with status {@code 400 (Bad Request)} if the contact has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contacts")
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", contact);
        if (contact.getId() != null) {
            throw new BadRequestAlertException("A new contact cannot already have an ID", ENTITY_NAME, "idexists");
        }

        User user = userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        contact.setAppUser(user);

        checkValidUser(contact);

        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
        contact.setCreated(now);
        contact.setUpdated(now);

        Contact result = contactService.save(contact);

        for (Category category : result.getCategories()) {
            Category categoryFetched = categoryService.findOneWithEagerRelationships(category.getId()).get();
            categoryService.update(categoryFetched.addContact(contact));
        }

        return ResponseEntity
            .created(new URI("/api/contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contacts/:id} : Updates an existing contact.
     *
     * @param id the id of the contact to save.
     * @param contact the contact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contact,
     * or with status {@code 400 (Bad Request)} if the contact is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contacts/{id}")
    public ResponseEntity<Contact> updateContact(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Contact contact
    ) throws URISyntaxException {
        log.debug("REST request to update Contact : {}, {}", id, contact);
        if (contact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contact.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!contactRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        checkValidUser(contact);
        Contact contactOld = contactService.findOneWithEagerRelationships(id).get();

        User user = getCurrentUser();
        contact.setAppUser(user);

        Set<Category> categoriesOld = contactService.findOneWithEagerRelationships(id).get().getCategories();
        Set<Long> categoriesNewIds = new HashSet<>();
        contact.getCategories().forEach(c -> categoriesNewIds.add(c.getId()));

        for (Category category : categoriesOld) {
            if (!categoriesNewIds.contains(category.getId())) {
                Category categoryFetched = categoryService.findOneWithEagerRelationships(category.getId()).get();
                categoryService.update(categoryFetched.removeContact(contactOld));
            }
        }

        for (Long categoryId : categoriesNewIds) {
            Category category = categoryService.findOneWithEagerRelationships(categoryId).get();
            categoryService.update(category.addContact(contact));
        }

        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
        contact.setUpdated(now);

        Contact result = contactService.update(contact);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, contact.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /contacts/:id} : Partial updates given fields of an existing contact, field will ignore if it is null
     *
     * @param id the id of the contact to save.
     * @param contact the contact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contact,
     * or with status {@code 400 (Bad Request)} if the contact is not valid,
     * or with status {@code 404 (Not Found)} if the contact is not found,
     * or with status {@code 500 (Internal Server Error)} if the contact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/contacts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Contact> partialUpdateContact(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Contact contact
    ) throws URISyntaxException {
        log.debug("REST request to partial update Contact partially : {}, {}", id, contact);
        if (contact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contact.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!contactRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        checkValidUser(contactService.findOneWithEagerRelationships(id).get());
        Optional<Contact> result = contactService.partialUpdate(contact);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, contact.getId().toString())
        );
    }

    /**
     * {@code GET  /contacts} : get all the contacts.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contacts in body.
     */
    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getAllContacts(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload,
        @RequestParam(required = false, defaultValue = "0") Long categoryId,
        @RequestParam(required = false, defaultValue = "") String searchTerm
    ) {
        log.debug("REST request to get a page of Contacts");
        Page<Contact> page;
        if (categoryId == 0 && searchTerm.isBlank()) {
            if (eagerload) {
                page = contactService.findAllWithEagerRelationships(pageable);
            } else {
                page = contactService.findByAppUserIsCurrentUser(pageable);
            }
        } else {
            List<Contact> contacts;

            if (!searchTerm.isBlank()) {
                String searchTermDecoded = java.net.URLDecoder.decode(searchTerm, StandardCharsets.UTF_8);
                searchTermDecoded = String.format("%%%s%%", searchTermDecoded.replace(" ", "%").toLowerCase());
                contacts = contactService.findByFullNameContaining(searchTermDecoded);
            } else {
                Set<Contact> contactSet = categoryService.findOneWithEagerRelationships(categoryId).get().getContacts();
                contacts = contactSet.stream().toList();
            }

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), contacts.size());
            page = new PageImpl<>(contacts.subList(start, end), pageable, contacts.size() > 0 ? contacts.size() : 1);
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contacts/:id} : get the "id" contact.
     *
     * @param id the id of the contact to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contact, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contacts/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable Long id) {
        log.debug("REST request to get Contact : {}", id);
        Optional<Contact> contact = contactService.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(contact);
    }

    /**
     * {@code DELETE  /contacts/:id} : delete the "id" contact.
     *
     * @param id the id of the contact to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        log.debug("REST request to delete Contact : {}", id);
        Contact contact = contactService.findOneWithEagerRelationships(id).get();
        checkValidUser(contact);

        List<Long> categoryIds = new ArrayList<>();
        contact.getCategories().forEach(c -> categoryIds.add(c.getId()));

        for (Long categoryId : categoryIds) {
            Category category = categoryService.findOneWithEagerRelationships(categoryId).get();
            categoryService.update(category.removeContact(contact));
        }

        contactService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/email-contact/{id}")
    public ResponseEntity<EmailContactViewModel> getEmailContact(@PathVariable Long id) {
        log.debug("REST request to get Email Contact : {}", id);
        //        Optional<Contact> contact = contactService.findOneWithEagerRelationships(id);
        Optional<Contact> contactOptional = contactService.findOne(id);
        Contact contact = contactOptional.get();

        EmailData emailData = new EmailData();
        emailData.setEmailAddress(contact.getEmail());
        emailData.setFirstName(contact.getFirstName());
        emailData.setLastName(contact.getLastName());
        //        emailData.setContact(contact);

        EmailContactViewModel emailContactViewModel = new EmailContactViewModel();
        emailContactViewModel.setContact(contact);
        emailContactViewModel.setEmailData(emailData);

        return new ResponseEntity<>(emailContactViewModel, HttpStatus.OK);
    }

    @PutMapping("/email-contact/{id}")
    public ResponseEntity<HttpStatus> submitEmailContact(@NotNull @RequestBody EmailContactViewModel emailContactViewModel) {
        Long contactId = emailContactViewModel.getContact().getId();
        log.debug("REST request to post Email Contact : {}", contactId);

        Optional<Contact> contactOptional = contactService.findOne(contactId);
        Contact contact = contactOptional.get();

        checkValidUser(contact, false);

        EmailData emailData = emailContactViewModel.getEmailData();

        HttpStatus emailStatus = HttpStatus.OK;

        if (emailData.getSubject().isBlank() || emailData.getBody().isBlank()) {
            emailStatus = HttpStatus.BAD_REQUEST;
        } else {
            try {
                mailService.sendEmail(contact.getEmail(), emailData.getSubject(), emailData.getBody(), false, true);
            } catch (Exception e) {
                emailStatus = HttpStatus.EXPECTATION_FAILED;
            }
        }

        return new ResponseEntity<>(emailStatus);
    }

    private User getCurrentUser() {
        return userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
    }

    private void checkValidUser(Contact contact) {
        checkValidUser(contact, true);
    }

    private void checkValidUser(Contact contact, boolean eagerload) {
        User user = getCurrentUser();
        if (contact.getAppUser().getId() != user.getId()) {
            throw new BadRequestAlertException("Current user and contact user do not match", ENTITY_NAME, "idsnotmatched");
        }
        if (eagerload) {
            for (Category category : contact.getCategories()) {
                Category categoryFetched = categoryService.findOneById(category.getId()).get();
                if (categoryFetched.getAppUser().getId() != user.getId()) {
                    throw new BadRequestAlertException("Current user and Category user do not match", ENTITY_NAME, "idsnotmatched");
                }
            }
        }
    }
}
