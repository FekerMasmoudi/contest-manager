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
import tn.soretras.contestmanager.repository.CertificateRepository;
import tn.soretras.contestmanager.service.CertificateService;
import tn.soretras.contestmanager.service.dto.CertificateDTO;
import tn.soretras.contestmanager.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link tn.soretras.contestmanager.domain.Certificate}.
 */
@RestController
@RequestMapping("/api")
public class CertificateResource {

    private final Logger log = LoggerFactory.getLogger(CertificateResource.class);

    private static final String ENTITY_NAME = "certificate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CertificateService certificateService;

    private final CertificateRepository certificateRepository;

    public CertificateResource(CertificateService certificateService, CertificateRepository certificateRepository) {
        this.certificateService = certificateService;
        this.certificateRepository = certificateRepository;
    }

    /**
     * {@code POST  /certificates} : Create a new certificate.
     *
     * @param certificateDTO the certificateDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new certificateDTO, or with status {@code 400 (Bad Request)} if the certificate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/certificates")
    public ResponseEntity<CertificateDTO> createCertificate(@Valid @RequestBody CertificateDTO certificateDTO) throws URISyntaxException {
        log.debug("REST request to save Certificate : {}", certificateDTO);
        if (certificateDTO.getId() != null) {
            throw new BadRequestAlertException("A new certificate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CertificateDTO result = certificateService.save(certificateDTO);
        return ResponseEntity
            .created(new URI("/api/certificates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /certificates/:id} : Updates an existing certificate.
     *
     * @param id the id of the certificateDTO to save.
     * @param certificateDTO the certificateDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated certificateDTO,
     * or with status {@code 400 (Bad Request)} if the certificateDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the certificateDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/certificates/{id}")
    public ResponseEntity<CertificateDTO> updateCertificate(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CertificateDTO certificateDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Certificate : {}, {}", id, certificateDTO);
        if (certificateDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, certificateDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!certificateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CertificateDTO result = certificateService.update(certificateDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, certificateDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /certificates/:id} : Partial updates given fields of an existing certificate, field will ignore if it is null
     *
     * @param id the id of the certificateDTO to save.
     * @param certificateDTO the certificateDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated certificateDTO,
     * or with status {@code 400 (Bad Request)} if the certificateDTO is not valid,
     * or with status {@code 404 (Not Found)} if the certificateDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the certificateDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/certificates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CertificateDTO> partialUpdateCertificate(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CertificateDTO certificateDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Certificate partially : {}, {}", id, certificateDTO);
        if (certificateDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, certificateDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!certificateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CertificateDTO> result = certificateService.partialUpdate(certificateDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, certificateDTO.getId())
        );
    }

    /**
     * {@code GET  /certificates} : get all the certificates.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of certificates in body.
     */
    @GetMapping("/certificates")
    public ResponseEntity<List<CertificateDTO>> getAllCertificates(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Certificates");
        Page<CertificateDTO> page = certificateService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /certificates/:id} : get the "id" certificate.
     *
     * @param id the id of the certificateDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the certificateDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/certificates/{id}")
    public ResponseEntity<CertificateDTO> getCertificate(@PathVariable String id) {
        log.debug("REST request to get Certificate : {}", id);
        Optional<CertificateDTO> certificateDTO = certificateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(certificateDTO);
    }

    /**
     * {@code DELETE  /certificates/:id} : delete the "id" certificate.
     *
     * @param id the id of the certificateDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/certificates/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable String id) {
        log.debug("REST request to delete Certificate : {}", id);
        certificateService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
