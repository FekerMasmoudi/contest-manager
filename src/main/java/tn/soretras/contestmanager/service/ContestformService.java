package tn.soretras.contestmanager.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.soretras.contestmanager.domain.Contestform;
import tn.soretras.contestmanager.repository.ContestRepository;
import tn.soretras.contestmanager.repository.ContestformRepository;
import tn.soretras.contestmanager.service.dto.ContestDTO;
import tn.soretras.contestmanager.service.dto.ContestannounceDTO;
import tn.soretras.contestmanager.service.dto.ContestformDTO;
import tn.soretras.contestmanager.service.dto.GradeDTO;
import tn.soretras.contestmanager.service.dto.SectorDTO;
import tn.soretras.contestmanager.service.dto.SpecialityDTO;
import tn.soretras.contestmanager.service.mapper.ContestMapper;
import tn.soretras.contestmanager.service.mapper.ContestformMapper;

/**
 * Service Implementation for managing {@link Contestform}.
 */
@Service
public class ContestformService {

    private final Logger log = LoggerFactory.getLogger(ContestformService.class);

    private final ContestformRepository contestformRepository;

    private final ContestformMapper contestformMapper;

    private final ContestRepository contestRepository;

    private final ContestMapper contestMapper;

    public ContestformService(
        ContestformRepository contestformRepository,
        ContestformMapper contestformMapper,
        ContestRepository contestRepository,
        ContestMapper contestMapper
    ) {
        this.contestformRepository = contestformRepository;
        this.contestformMapper = contestformMapper;

        this.contestRepository = contestRepository;
        this.contestMapper = contestMapper;
    }

    /**
     * Save a contestform.
     *
     * @param contestformDTO the entity to save.
     * @return the persisted entity.
     */
    public ContestformDTO save(ContestformDTO contestformDTO) {
        log.debug("Request to save Contestform : {}", contestformDTO);
        Contestform contestform = contestformMapper.toEntity(contestformDTO);
        contestform = contestformRepository.save(contestform);
        return contestformMapper.toDto(contestform);
    }

    /**
     * Update a contestform.
     *
     * @param contestformDTO the entity to save.
     * @return the persisted entity.
     */
    public ContestformDTO update(ContestformDTO contestformDTO) {
        log.debug("Request to update Contestform : {}", contestformDTO);
        Contestform contestform = contestformMapper.toEntity(contestformDTO);
        contestform = contestformRepository.save(contestform);
        return contestformMapper.toDto(contestform);
    }

    /**
     * Partially update a contestform.
     *
     * @param contestformDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ContestformDTO> partialUpdate(ContestformDTO contestformDTO) {
        log.debug("Request to partially update Contestform : {}", contestformDTO);

        return contestformRepository
            .findById(contestformDTO.getId())
            .map(existingContestform -> {
                contestformMapper.partialUpdate(existingContestform, contestformDTO);

                return existingContestform;
            })
            .map(contestformRepository::save)
            .map(contestformMapper::toDto);
    }

    /**
     * Get all the contestforms.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<ContestformDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contestforms");
        //return contestformRepository.findAll(pageable).map(contestformMapper::toDto);

        //Modified By Mohamed

        Page<ContestformDTO> pcfdto = contestformRepository.findAll(pageable).map(contestformMapper::toDto);
        List<ContestformDTO> contestformList = new ArrayList<>();
        if (pcfdto != null && pcfdto.hasContent()) {
            contestformList = pcfdto.getContent();
            for (int i = 0; i < contestformList.size(); i++) { //for name contest
                String idcontestform_contest = contestformList.get(i).getContest().getId();
                ContestDTO contanndto = contestRepository.findById(idcontestform_contest).map(contestMapper::toDto).orElse(null);
                contestformList.get(i).setContest(contanndto);
            }
            Long total = (long) contestformList.size();
            Page<ContestformDTO> pages = new PageImpl<ContestformDTO>(contestformList, pageable, total);
        }
        return pcfdto;
    }

    /**
     * Get all the contestforms with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ContestformDTO> findAllWithEagerRelationships(Pageable pageable) {
        return contestformRepository.findAllWithEagerRelationships(pageable).map(contestformMapper::toDto);
    }

    /**
     * Get one contestform by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<ContestformDTO> findOne(String id) {
        log.debug("Request to get Contestform : {}", id);
        return contestformRepository.findOneWithEagerRelationships(id).map(contestformMapper::toDto);
    }

    /**
     * Delete the contestform by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Contestform : {}", id);
        contestformRepository.deleteById(id);
    }
}
