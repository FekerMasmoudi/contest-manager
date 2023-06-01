package tn.soretras.contestmanager.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.soretras.contestmanager.domain.Fieldcontestform;
import tn.soretras.contestmanager.repository.FieldcontestformRepository;
import tn.soretras.contestmanager.service.dto.FieldcontestformDTO;
import tn.soretras.contestmanager.service.mapper.FieldcontestformMapper;

/**
 * Service Implementation for managing {@link Fieldcontestform}.
 */
@Service
public class FieldcontestformService {

    private final Logger log = LoggerFactory.getLogger(FieldcontestformService.class);

    private final FieldcontestformRepository fieldcontestformRepository;

    private final FieldcontestformMapper fieldcontestformMapper;

    public FieldcontestformService(FieldcontestformRepository fieldcontestformRepository, FieldcontestformMapper fieldcontestformMapper) {
        this.fieldcontestformRepository = fieldcontestformRepository;
        this.fieldcontestformMapper = fieldcontestformMapper;
    }

    /**
     * Save a fieldcontestform.
     *
     * @param fieldcontestformDTO the entity to save.
     * @return the persisted entity.
     */
    public FieldcontestformDTO save(FieldcontestformDTO fieldcontestformDTO) {
        log.debug("Request to save Fieldcontestform : {}", fieldcontestformDTO);
        Fieldcontestform fieldcontestform = fieldcontestformMapper.toEntity(fieldcontestformDTO);
        fieldcontestform = fieldcontestformRepository.save(fieldcontestform);
        return fieldcontestformMapper.toDto(fieldcontestform);
    }

    /**
     * Update a fieldcontestform.
     *
     * @param fieldcontestformDTO the entity to save.
     * @return the persisted entity.
     */
    public FieldcontestformDTO update(FieldcontestformDTO fieldcontestformDTO) {
        log.debug("Request to update Fieldcontestform : {}", fieldcontestformDTO);
        Fieldcontestform fieldcontestform = fieldcontestformMapper.toEntity(fieldcontestformDTO);
        fieldcontestform = fieldcontestformRepository.save(fieldcontestform);
        return fieldcontestformMapper.toDto(fieldcontestform);
    }

    /**
     * Partially update a fieldcontestform.
     *
     * @param fieldcontestformDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FieldcontestformDTO> partialUpdate(FieldcontestformDTO fieldcontestformDTO) {
        log.debug("Request to partially update Fieldcontestform : {}", fieldcontestformDTO);

        return fieldcontestformRepository
            .findById(fieldcontestformDTO.getId())
            .map(existingFieldcontestform -> {
                fieldcontestformMapper.partialUpdate(existingFieldcontestform, fieldcontestformDTO);

                return existingFieldcontestform;
            })
            .map(fieldcontestformRepository::save)
            .map(fieldcontestformMapper::toDto);
    }

    /**
     * Get all the fieldcontestforms.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<FieldcontestformDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Fieldcontestforms");
        return fieldcontestformRepository.findAll(pageable).map(fieldcontestformMapper::toDto);
    }

    /**
     * Get one fieldcontestform by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<FieldcontestformDTO> findOne(String id) {
        log.debug("Request to get Fieldcontestform : {}", id);
        return fieldcontestformRepository.findById(id).map(fieldcontestformMapper::toDto);
    }

    /**
     * Delete the fieldcontestform by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Fieldcontestform : {}", id);
        fieldcontestformRepository.deleteById(id);
    }
}
