package tn.soretras.contestmanager.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import tn.soretras.contestmanager.repository.FieldcontestformRepository;
import tn.soretras.contestmanager.service.FieldcontestformService;
import tn.soretras.contestmanager.service.dto.FieldcontestformDTO;
import tn.soretras.contestmanager.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link tn.soretras.contestmanager.domain.Fieldcontestform}.
 */
@RestController
@RequestMapping("/api")
public class FieldcontestformResource {

    private final Logger log = LoggerFactory.getLogger(FieldcontestformResource.class);

    private static final String ENTITY_NAME = "fieldcontestform";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FieldcontestformService fieldcontestformService;

    private final FieldcontestformRepository fieldcontestformRepository;

    public FieldcontestformResource(
        FieldcontestformService fieldcontestformService,
        FieldcontestformRepository fieldcontestformRepository
    ) {
        this.fieldcontestformService = fieldcontestformService;
        this.fieldcontestformRepository = fieldcontestformRepository;
    }

    /**
     * {@code POST  /fieldcontestforms} : Create a new fieldcontestform.
     *
     * @param fieldcontestformDTO the fieldcontestformDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fieldcontestformDTO, or with status {@code 400 (Bad Request)} if the fieldcontestform has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fieldcontestforms")
    public ResponseEntity<FieldcontestformDTO> createFieldcontestform(@Valid @RequestBody FieldcontestformDTO fieldcontestformDTO)
        throws URISyntaxException {
        log.debug("REST request to save Fieldcontestform : {}", fieldcontestformDTO);
        if (fieldcontestformDTO.getId() != null) {
            throw new BadRequestAlertException("A new fieldcontestform cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldcontestformDTO result = fieldcontestformService.save(fieldcontestformDTO);
        return ResponseEntity
            .created(new URI("/api/fieldcontestforms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /fieldcontestforms/:id} : Updates an existing fieldcontestform.
     *
     * @param id the id of the fieldcontestformDTO to save.
     * @param fieldcontestformDTO the fieldcontestformDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fieldcontestformDTO,
     * or with status {@code 400 (Bad Request)} if the fieldcontestformDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fieldcontestformDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fieldcontestforms/{id}")
    public ResponseEntity<FieldcontestformDTO> updateFieldcontestform(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody FieldcontestformDTO fieldcontestformDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Fieldcontestform : {}, {}", id, fieldcontestformDTO);
        if (fieldcontestformDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fieldcontestformDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fieldcontestformRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FieldcontestformDTO result = fieldcontestformService.update(fieldcontestformDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fieldcontestformDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /fieldcontestforms/:id} : Partial updates given fields of an existing fieldcontestform, field will ignore if it is null
     *
     * @param id the id of the fieldcontestformDTO to save.
     * @param fieldcontestformDTO the fieldcontestformDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fieldcontestformDTO,
     * or with status {@code 400 (Bad Request)} if the fieldcontestformDTO is not valid,
     * or with status {@code 404 (Not Found)} if the fieldcontestformDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the fieldcontestformDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/fieldcontestforms/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FieldcontestformDTO> partialUpdateFieldcontestform(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody FieldcontestformDTO fieldcontestformDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Fieldcontestform partially : {}, {}", id, fieldcontestformDTO);
        if (fieldcontestformDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fieldcontestformDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fieldcontestformRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FieldcontestformDTO> result = fieldcontestformService.partialUpdate(fieldcontestformDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fieldcontestformDTO.getId())
        );
    }

    /**
     * {@code GET  /fieldcontestforms} : get all the fieldcontestforms.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fieldcontestforms in body.
     */
    @GetMapping("/fieldcontestforms")
    public ResponseEntity<List<FieldcontestformDTO>> getAllFieldcontestforms(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Fieldcontestforms");
        Page<FieldcontestformDTO> page = fieldcontestformService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fieldcontestforms/:id} : get the "id" fieldcontestform.
     *
     * @param id the id of the fieldcontestformDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fieldcontestformDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fieldcontestforms/{id}")
    public ResponseEntity<FieldcontestformDTO> getFieldcontestform(@PathVariable String id) {
        log.debug("REST request to get Fieldcontestform : {}", id);
        Optional<FieldcontestformDTO> fieldcontestformDTO = fieldcontestformService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fieldcontestformDTO);
    }

    /**
     * {@code DELETE  /fieldcontestforms/:id} : delete the "id" fieldcontestform.
     *
     * @param id the id of the fieldcontestformDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fieldcontestforms/{id}")
    public ResponseEntity<Void> deleteFieldcontestform(@PathVariable String id) {
        log.debug("REST request to delete Fieldcontestform : {}", id);
        fieldcontestformService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
