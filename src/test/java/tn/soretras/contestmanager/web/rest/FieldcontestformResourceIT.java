package tn.soretras.contestmanager.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import tn.soretras.contestmanager.IntegrationTest;
import tn.soretras.contestmanager.domain.Contestform;
import tn.soretras.contestmanager.domain.Fieldcontestform;
import tn.soretras.contestmanager.domain.enumeration.etype;
import tn.soretras.contestmanager.repository.FieldcontestformRepository;
import tn.soretras.contestmanager.service.dto.FieldcontestformDTO;
import tn.soretras.contestmanager.service.mapper.FieldcontestformMapper;

/**
 * Integration tests for the {@link FieldcontestformResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FieldcontestformResourceIT {

    private static final String DEFAULT_FNAME = "AAAAAAAAAA";
    private static final String UPDATED_FNAME = "BBBBBBBBBB";

    private static final etype DEFAULT_FTYPE = etype.STRING;
    private static final etype UPDATED_FTYPE = etype.INT;

    private static final String DEFAULT_FVALUE = "AAAAAAAAAA";
    private static final String UPDATED_FVALUE = "BBBBBBBBBB";

    private static final Integer DEFAULT_FRANK = 1;
    private static final Integer UPDATED_FRANK = 2;

    private static final Integer DEFAULT_FSIZE = 1;
    private static final Integer UPDATED_FSIZE = 2;

    private static final String ENTITY_API_URL = "/api/fieldcontestforms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private FieldcontestformRepository fieldcontestformRepository;

    @Autowired
    private FieldcontestformMapper fieldcontestformMapper;

    @Autowired
    private MockMvc restFieldcontestformMockMvc;

    private Fieldcontestform fieldcontestform;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fieldcontestform createEntity() {
        Fieldcontestform fieldcontestform = new Fieldcontestform()
            .fname(DEFAULT_FNAME)
            .ftype(DEFAULT_FTYPE)
            .fvalue(DEFAULT_FVALUE)
            .frank(DEFAULT_FRANK)
            .fsize(DEFAULT_FSIZE);
        // Add required entity
        Contestform contestform;
        contestform = ContestformResourceIT.createEntity();
        contestform.setId("fixed-id-for-tests");
        fieldcontestform.setContestform(contestform);
        return fieldcontestform;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fieldcontestform createUpdatedEntity() {
        Fieldcontestform fieldcontestform = new Fieldcontestform()
            .fname(UPDATED_FNAME)
            .ftype(UPDATED_FTYPE)
            .fvalue(UPDATED_FVALUE)
            .frank(UPDATED_FRANK)
            .fsize(UPDATED_FSIZE);
        // Add required entity
        Contestform contestform;
        contestform = ContestformResourceIT.createUpdatedEntity();
        contestform.setId("fixed-id-for-tests");
        fieldcontestform.setContestform(contestform);
        return fieldcontestform;
    }

    @BeforeEach
    public void initTest() {
        fieldcontestformRepository.deleteAll();
        fieldcontestform = createEntity();
    }

    @Test
    void createFieldcontestform() throws Exception {
        int databaseSizeBeforeCreate = fieldcontestformRepository.findAll().size();
        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);
        restFieldcontestformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeCreate + 1);
        Fieldcontestform testFieldcontestform = fieldcontestformList.get(fieldcontestformList.size() - 1);
        assertThat(testFieldcontestform.getFname()).isEqualTo(DEFAULT_FNAME);
        assertThat(testFieldcontestform.getFtype()).isEqualTo(DEFAULT_FTYPE);
        assertThat(testFieldcontestform.getFvalue()).isEqualTo(DEFAULT_FVALUE);
        assertThat(testFieldcontestform.getFrank()).isEqualTo(DEFAULT_FRANK);
        assertThat(testFieldcontestform.getFsize()).isEqualTo(DEFAULT_FSIZE);
    }

    @Test
    void createFieldcontestformWithExistingId() throws Exception {
        // Create the Fieldcontestform with an existing ID
        fieldcontestform.setId("existing_id");
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        int databaseSizeBeforeCreate = fieldcontestformRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldcontestformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkFnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldcontestformRepository.findAll().size();
        // set the field null
        fieldcontestform.setFname(null);

        // Create the Fieldcontestform, which fails.
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        restFieldcontestformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkFtypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldcontestformRepository.findAll().size();
        // set the field null
        fieldcontestform.setFtype(null);

        // Create the Fieldcontestform, which fails.
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        restFieldcontestformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllFieldcontestforms() throws Exception {
        // Initialize the database
        fieldcontestformRepository.save(fieldcontestform);

        // Get all the fieldcontestformList
        restFieldcontestformMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldcontestform.getId())))
            .andExpect(jsonPath("$.[*].fname").value(hasItem(DEFAULT_FNAME)))
            .andExpect(jsonPath("$.[*].ftype").value(hasItem(DEFAULT_FTYPE.toString())))
            .andExpect(jsonPath("$.[*].fvalue").value(hasItem(DEFAULT_FVALUE)))
            .andExpect(jsonPath("$.[*].frank").value(hasItem(DEFAULT_FRANK)))
            .andExpect(jsonPath("$.[*].fsize").value(hasItem(DEFAULT_FSIZE)));
    }

    @Test
    void getFieldcontestform() throws Exception {
        // Initialize the database
        fieldcontestformRepository.save(fieldcontestform);

        // Get the fieldcontestform
        restFieldcontestformMockMvc
            .perform(get(ENTITY_API_URL_ID, fieldcontestform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fieldcontestform.getId()))
            .andExpect(jsonPath("$.fname").value(DEFAULT_FNAME))
            .andExpect(jsonPath("$.ftype").value(DEFAULT_FTYPE.toString()))
            .andExpect(jsonPath("$.fvalue").value(DEFAULT_FVALUE))
            .andExpect(jsonPath("$.frank").value(DEFAULT_FRANK))
            .andExpect(jsonPath("$.fsize").value(DEFAULT_FSIZE));
    }

    @Test
    void getNonExistingFieldcontestform() throws Exception {
        // Get the fieldcontestform
        restFieldcontestformMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingFieldcontestform() throws Exception {
        // Initialize the database
        fieldcontestformRepository.save(fieldcontestform);

        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();

        // Update the fieldcontestform
        Fieldcontestform updatedFieldcontestform = fieldcontestformRepository.findById(fieldcontestform.getId()).get();
        updatedFieldcontestform.fname(UPDATED_FNAME).ftype(UPDATED_FTYPE).fvalue(UPDATED_FVALUE).frank(UPDATED_FRANK).fsize(UPDATED_FSIZE);
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(updatedFieldcontestform);

        restFieldcontestformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fieldcontestformDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isOk());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
        Fieldcontestform testFieldcontestform = fieldcontestformList.get(fieldcontestformList.size() - 1);
        assertThat(testFieldcontestform.getFname()).isEqualTo(UPDATED_FNAME);
        assertThat(testFieldcontestform.getFtype()).isEqualTo(UPDATED_FTYPE);
        assertThat(testFieldcontestform.getFvalue()).isEqualTo(UPDATED_FVALUE);
        assertThat(testFieldcontestform.getFrank()).isEqualTo(UPDATED_FRANK);
        assertThat(testFieldcontestform.getFsize()).isEqualTo(UPDATED_FSIZE);
    }

    @Test
    void putNonExistingFieldcontestform() throws Exception {
        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();
        fieldcontestform.setId(UUID.randomUUID().toString());

        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldcontestformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fieldcontestformDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFieldcontestform() throws Exception {
        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();
        fieldcontestform.setId(UUID.randomUUID().toString());

        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFieldcontestformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFieldcontestform() throws Exception {
        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();
        fieldcontestform.setId(UUID.randomUUID().toString());

        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFieldcontestformMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFieldcontestformWithPatch() throws Exception {
        // Initialize the database
        fieldcontestformRepository.save(fieldcontestform);

        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();

        // Update the fieldcontestform using partial update
        Fieldcontestform partialUpdatedFieldcontestform = new Fieldcontestform();
        partialUpdatedFieldcontestform.setId(fieldcontestform.getId());

        partialUpdatedFieldcontestform.fname(UPDATED_FNAME);

        restFieldcontestformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFieldcontestform.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFieldcontestform))
            )
            .andExpect(status().isOk());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
        Fieldcontestform testFieldcontestform = fieldcontestformList.get(fieldcontestformList.size() - 1);
        assertThat(testFieldcontestform.getFname()).isEqualTo(UPDATED_FNAME);
        assertThat(testFieldcontestform.getFtype()).isEqualTo(DEFAULT_FTYPE);
        assertThat(testFieldcontestform.getFvalue()).isEqualTo(DEFAULT_FVALUE);
        assertThat(testFieldcontestform.getFrank()).isEqualTo(DEFAULT_FRANK);
        assertThat(testFieldcontestform.getFsize()).isEqualTo(DEFAULT_FSIZE);
    }

    @Test
    void fullUpdateFieldcontestformWithPatch() throws Exception {
        // Initialize the database
        fieldcontestformRepository.save(fieldcontestform);

        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();

        // Update the fieldcontestform using partial update
        Fieldcontestform partialUpdatedFieldcontestform = new Fieldcontestform();
        partialUpdatedFieldcontestform.setId(fieldcontestform.getId());

        partialUpdatedFieldcontestform
            .fname(UPDATED_FNAME)
            .ftype(UPDATED_FTYPE)
            .fvalue(UPDATED_FVALUE)
            .frank(UPDATED_FRANK)
            .fsize(UPDATED_FSIZE);

        restFieldcontestformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFieldcontestform.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFieldcontestform))
            )
            .andExpect(status().isOk());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
        Fieldcontestform testFieldcontestform = fieldcontestformList.get(fieldcontestformList.size() - 1);
        assertThat(testFieldcontestform.getFname()).isEqualTo(UPDATED_FNAME);
        assertThat(testFieldcontestform.getFtype()).isEqualTo(UPDATED_FTYPE);
        assertThat(testFieldcontestform.getFvalue()).isEqualTo(UPDATED_FVALUE);
        assertThat(testFieldcontestform.getFrank()).isEqualTo(UPDATED_FRANK);
        assertThat(testFieldcontestform.getFsize()).isEqualTo(UPDATED_FSIZE);
    }

    @Test
    void patchNonExistingFieldcontestform() throws Exception {
        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();
        fieldcontestform.setId(UUID.randomUUID().toString());

        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldcontestformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, fieldcontestformDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFieldcontestform() throws Exception {
        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();
        fieldcontestform.setId(UUID.randomUUID().toString());

        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFieldcontestformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFieldcontestform() throws Exception {
        int databaseSizeBeforeUpdate = fieldcontestformRepository.findAll().size();
        fieldcontestform.setId(UUID.randomUUID().toString());

        // Create the Fieldcontestform
        FieldcontestformDTO fieldcontestformDTO = fieldcontestformMapper.toDto(fieldcontestform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFieldcontestformMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fieldcontestformDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fieldcontestform in the database
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFieldcontestform() throws Exception {
        // Initialize the database
        fieldcontestformRepository.save(fieldcontestform);

        int databaseSizeBeforeDelete = fieldcontestformRepository.findAll().size();

        // Delete the fieldcontestform
        restFieldcontestformMockMvc
            .perform(delete(ENTITY_API_URL_ID, fieldcontestform.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fieldcontestform> fieldcontestformList = fieldcontestformRepository.findAll();
        assertThat(fieldcontestformList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
