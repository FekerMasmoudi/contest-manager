package tn.soretras.contestmanager.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tn.soretras.contestmanager.web.rest.TestUtil;

class FieldcontestformDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldcontestformDTO.class);
        FieldcontestformDTO fieldcontestformDTO1 = new FieldcontestformDTO();
        fieldcontestformDTO1.setId("id1");
        FieldcontestformDTO fieldcontestformDTO2 = new FieldcontestformDTO();
        assertThat(fieldcontestformDTO1).isNotEqualTo(fieldcontestformDTO2);
        fieldcontestformDTO2.setId(fieldcontestformDTO1.getId());
        assertThat(fieldcontestformDTO1).isEqualTo(fieldcontestformDTO2);
        fieldcontestformDTO2.setId("id2");
        assertThat(fieldcontestformDTO1).isNotEqualTo(fieldcontestformDTO2);
        fieldcontestformDTO1.setId(null);
        assertThat(fieldcontestformDTO1).isNotEqualTo(fieldcontestformDTO2);
    }
}
