package com.webdevhod.contactpro.repository;

import com.webdevhod.contactpro.domain.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Category entity.
 *
 * When extending this class, extend CategoryRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface CategoryRepository extends CategoryRepositoryWithBagRelationships, JpaRepository<Category, Long> {
    @Query("select category from Category category where category.id = :id and category.appUser.login = ?#{principal.username}")
    Optional<Category> findOneById(@Param("id") Long id);

    @Query("select category from Category category where category.appUser.login = ?#{principal.username} and category.name = :name")
    Optional<Category> findOneByName(@Param("name") String name);

    @Query("select category from Category category where category.appUser.login = ?#{principal.username}")
    List<Category> findByAppUserIsCurrentUser();

    @Query("select category from Category category where category.appUser.login = ?#{principal.username}")
    Page<Category> findByAppUserIsCurrentUser(Pageable pageable);

    default Optional<Category> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Category> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Category> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct category from Category category left join fetch category.contacts where category.appUser.login = ?#{principal.username}",
        countQuery = "select count(distinct category) from Category category"
    )
    Page<Category> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct category from Category category left join fetch category.contacts where category.appUser.login = ?#{principal.username}"
    )
    List<Category> findAllWithToOneRelationships();

    @Query(
        "select category from Category category left join fetch category.contacts where category.id = :id AND category.appUser.login = ?#{principal.username}"
    )
    Optional<Category> findOneWithToOneRelationships(@Param("id") Long id);
}
