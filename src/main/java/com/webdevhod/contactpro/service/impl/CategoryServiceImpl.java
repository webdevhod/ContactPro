package com.webdevhod.contactpro.service.impl;

import com.webdevhod.contactpro.domain.Category;
import com.webdevhod.contactpro.repository.CategoryRepository;
import com.webdevhod.contactpro.service.CategoryService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Category}.
 */
@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category save(Category category) {
        log.debug("Request to save Category : {}", category);
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category) {
        log.debug("Request to update Category : {}", category);
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> partialUpdate(Category category) {
        log.debug("Request to partially update Category : {}", category);

        return categoryRepository
            .findById(category.getId())
            .map(existingCategory -> {
                if (category.getName() != null) {
                    existingCategory.setName(category.getName());
                }

                return existingCategory;
            })
            .map(categoryRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Category> findAll(Pageable pageable) {
        log.debug("Request to get all Categories");
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public List<Category> findByAppUserIsCurrentUser() {
        return categoryRepository.findByAppUserIsCurrentUser();
    }

    @Override
    public Page<Category> findByAppUserIsCurrentUser(Pageable pageable) {
        return categoryRepository.findByAppUserIsCurrentUser(pageable);
    }

    public Page<Category> findAllWithEagerRelationships(Pageable pageable) {
        return categoryRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = false)
    public Optional<Category> findOneById(Long id) {
        log.debug("Request to get Category : {}", id);
        return categoryRepository.findOneById(id);
    }

    @Override
    @Transactional(readOnly = false)
    public Optional<Category> findOneByName(String name) {
        log.debug("Request to get Category : {}", name);
        return categoryRepository.findOneByName(name);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Category : {}", id);
        categoryRepository.deleteById(id);
    }

    @Override
    public Optional<Category> findOneWithEagerRelationships(Long id) {
        return categoryRepository.findOneWithEagerRelationships(id);
    }
}
