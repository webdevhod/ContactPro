package com.webdevhod.contactpro.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.webdevhod.contactpro.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmailCategoryViewModelTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmailCategoryViewModel.class);
        EmailCategoryViewModel emailCategoryViewModel1 = new EmailCategoryViewModel();
        // emailCategoryViewModel1.setId(1L);
        EmailCategoryViewModel emailCategoryViewModel2 = new EmailCategoryViewModel();
        // emailCategoryViewModel2.setId(emailCategoryViewModel1.getId());
        assertThat(emailCategoryViewModel1).isEqualTo(emailCategoryViewModel2);
        // emailCategoryViewModel2.setId(2L);
        assertThat(emailCategoryViewModel1).isNotEqualTo(emailCategoryViewModel2);
        // emailCategoryViewModel1.setId(null);
        assertThat(emailCategoryViewModel1).isNotEqualTo(emailCategoryViewModel2);
    }
}
