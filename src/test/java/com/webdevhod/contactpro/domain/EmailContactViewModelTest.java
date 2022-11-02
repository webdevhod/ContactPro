package com.webdevhod.contactpro.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.webdevhod.contactpro.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmailContactViewModelTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmailContactViewModel.class);
        EmailContactViewModel emailContactViewModel1 = new EmailContactViewModel();
        EmailContactViewModel emailContactViewModel2 = new EmailContactViewModel();
        assertThat(emailContactViewModel1).isEqualTo(emailContactViewModel2);
        assertThat(emailContactViewModel1).isNotEqualTo(emailContactViewModel2);
        assertThat(emailContactViewModel1).isNotEqualTo(emailContactViewModel2);
    }
}
