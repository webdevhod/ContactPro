package com.webdevhod.contactpro.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.webdevhod.contactpro.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmailDataTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmailData.class);
        EmailData emailData1 = new EmailData();
        EmailData emailData2 = new EmailData();
        assertThat(emailData1).isEqualTo(emailData2);
        assertThat(emailData1).isNotEqualTo(emailData2);
        assertThat(emailData1).isNotEqualTo(emailData2);
    }
}
