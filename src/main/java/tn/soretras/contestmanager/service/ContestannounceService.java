package tn.soretras.contestmanager.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.soretras.contestmanager.domain.Contestannounce;
import tn.soretras.contestmanager.domain.Generalrules;
import tn.soretras.contestmanager.repository.ContestannounceRepository;
import tn.soretras.contestmanager.repository.GeneralrulesRepository;
import tn.soretras.contestmanager.service.dto.ContestannounceDTO;
import tn.soretras.contestmanager.service.dto.GeneralrulesDTO;
import tn.soretras.contestmanager.service.mapper.ContestannounceMapper;
import tn.soretras.contestmanager.service.mapper.GeneralrulesMapper;

/**
 * Service Implementation for managing {@link Contestannounce}.
 */
@Service
public class ContestannounceService {

    private final Logger log = LoggerFactory.getLogger(ContestannounceService.class);

    private final ContestannounceRepository contestannounceRepository;

    private final ContestannounceMapper contestannounceMapper;

    private final GeneralrulesRepository generalrulesRepository;

    private final GeneralrulesMapper generalrulesMapper;

    public ContestannounceService(
        ContestannounceRepository contestannounceRepository,
        ContestannounceMapper contestannounceMapper,
        GeneralrulesRepository generalrulesRepository,
        GeneralrulesMapper generalrulesMapper
    ) {
        this.contestannounceRepository = contestannounceRepository;
        this.contestannounceMapper = contestannounceMapper;

        this.generalrulesRepository = generalrulesRepository;
        this.generalrulesMapper = generalrulesMapper;
    }

    /**
     * Save a contestannounce.
     *
     * @param contestannounceDTO the entity to save.
     * @return the persisted entity.
     */
    public ContestannounceDTO save(ContestannounceDTO contestannounceDTO) {
        log.debug("Request to save Contestannounce : {}", contestannounceDTO);
        Contestannounce contestannounce = contestannounceMapper.toEntity(contestannounceDTO);
        contestannounce = contestannounceRepository.save(contestannounce);
        return contestannounceMapper.toDto(contestannounce);
    }

    /**
     * Update a contestannounce.
     *
     * @param contestannounceDTO the entity to save.
     * @return the persisted entity.
     */
    public ContestannounceDTO update(ContestannounceDTO contestannounceDTO) {
        log.debug("Request to update Contestannounce : {}", contestannounceDTO);
        Contestannounce contestannounce = contestannounceMapper.toEntity(contestannounceDTO);
        contestannounce = contestannounceRepository.save(contestannounce);
        return contestannounceMapper.toDto(contestannounce);
    }

    /**
     * Partially update a contestannounce.
     *
     * @param contestannounceDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ContestannounceDTO> partialUpdate(ContestannounceDTO contestannounceDTO) {
        log.debug("Request to partially update Contestannounce : {}", contestannounceDTO);

        return contestannounceRepository
            .findById(contestannounceDTO.getId())
            .map(existingContestannounce -> {
                contestannounceMapper.partialUpdate(existingContestannounce, contestannounceDTO);

                return existingContestannounce;
            })
            .map(contestannounceRepository::save)
            .map(contestannounceMapper::toDto);
    }

    /**
     * Get all the contestannounces.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */

    @SuppressWarnings("unchecked")
    public Page<ContestannounceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contestannounces");
        //return contestannounceRepository.findAll(pageable).map(contestannounceMapper::toDto);

        //Modified By Mohamed
        Page<ContestannounceDTO> pcontanndto = contestannounceRepository.findAll(pageable).map(contestannounceMapper::toDto);
        List<ContestannounceDTO> contestannounceList = new ArrayList<>();
        if (pcontanndto != null && pcontanndto.hasContent()) {
            contestannounceList = pcontanndto.getContent();
            for (int i = 0; i < contestannounceList.size(); i++) { //for designation generalrules
                String idcontann_generules = ((Contestannounce) contestannounceList.get(i).getGeneralrules()).getId();
                GeneralrulesDTO generulesdto = generalrulesRepository
                    .findById(idcontann_generules)
                    .map(generalrulesMapper::toDto)
                    .orElse(null);
                contestannounceList.get(i).setGeneralrules((Set<GeneralrulesDTO>) generulesdto);
            }
            Long total = (long) contestannounceList.size();
            @SuppressWarnings("unused")
            Page<ContestannounceDTO> pages = new PageImpl<ContestannounceDTO>(contestannounceList, pageable, total);
        }
        return pcontanndto;
    }

    /**
     * Get all the contestannounces with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ContestannounceDTO> findAllWithEagerRelationships(Pageable pageable) {
        return contestannounceRepository.findAllWithEagerRelationships(pageable).map(contestannounceMapper::toDto);
    }

    /**
     * Get one contestannounce by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<ContestannounceDTO> findOne(String id) {
        log.debug("Request to get Contestannounce : {}", id);
        return contestannounceRepository.findOneWithEagerRelationships(id).map(contestannounceMapper::toDto);
    }

    /**
     * Delete the contestannounce by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Contestannounce : {}", id);
        contestannounceRepository.deleteById(id);
    }
}
