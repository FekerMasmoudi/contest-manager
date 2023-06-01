package tn.soretras.contestmanager.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tn.soretras.contestmanager.web.rest.TestUtil;

class FieldcontestformTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fieldcontestform.class);
        Fieldcontestform fieldcontestform1 = new Fieldcontestform();
        fieldcontestform1.setId("id1");
        Fieldcontestform fieldcontestform2 = new Fieldcontestform();
        fieldcontestform2.setId(fieldcontestform1.getId());
        assertThat(fieldcontestform1).isEqualTo(fieldcontestform2);
        fieldcontestform2.setId("id2");
        assertThat(fieldcontestform1).isNotEqualTo(fieldcontestform2);
        fieldcontestform1.setId(null);
        assertThat(fieldcontestform1).isNotEqualTo(fieldcontestform2);
    }
}
