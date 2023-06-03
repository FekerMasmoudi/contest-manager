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
import tn.soretras.contestmanager.domain.Contest;
import tn.soretras.contestmanager.repository.ContestRepository;
import tn.soretras.contestmanager.repository.ContestannounceRepository;
import tn.soretras.contestmanager.repository.GradeRepository;
import tn.soretras.contestmanager.repository.SectorRepository;
import tn.soretras.contestmanager.repository.SpecialityRepository;
import tn.soretras.contestmanager.service.dto.ContestDTO;
import tn.soretras.contestmanager.service.dto.ContestannounceDTO;
import tn.soretras.contestmanager.service.dto.GradeDTO;
import tn.soretras.contestmanager.service.dto.SectorDTO;
import tn.soretras.contestmanager.service.dto.SpecialityDTO;
import tn.soretras.contestmanager.service.mapper.ContestMapper;
import tn.soretras.contestmanager.service.mapper.ContestannounceMapper;
import tn.soretras.contestmanager.service.mapper.GradeMapper;
import tn.soretras.contestmanager.service.mapper.SectorMapper;
import tn.soretras.contestmanager.service.mapper.SpecialityMapper;

/**
 * Service Implementation for managing {@link Contest}.
 */
@Service
public class ContestService {

    private final Logger log = LoggerFactory.getLogger(ContestService.class);

    private final ContestRepository contestRepository;

    private final ContestMapper contestMapper;

    //Modified By Mohamed

    private final ContestannounceRepository contestannounceRepository;

    private final ContestannounceMapper contestannounceMapper;

    private final GradeRepository gradeRepository;

    private final GradeMapper gradeMapper;

    private final SpecialityRepository specialityRepository;

    private final SpecialityMapper specialityMapper;

    private final SectorRepository sectorRepository;

    private final SectorMapper sectorMapper;

    public ContestService(
        ContestRepository contestRepository,
        ContestMapper contestMapper,
        ContestannounceRepository contestannounceRepository,
        ContestannounceMapper contestannounceMapper,
        GradeRepository gradeRepository,
        GradeMapper gradeMapper,
        SpecialityRepository specialityRepository,
        SpecialityMapper specialityMapper,
        SectorRepository sectorRepository,
        SectorMapper sectorMapper
    ) {
        this.contestRepository = contestRepository;
        this.contestMapper = contestMapper;

        //Modified By Mohamed

        this.contestannounceRepository = contestannounceRepository;
        this.contestannounceMapper = contestannounceMapper;

        this.gradeRepository = gradeRepository;
        this.gradeMapper = gradeMapper;

        this.specialityRepository = specialityRepository;
        this.specialityMapper = specialityMapper;

        this.sectorRepository = sectorRepository;
        this.sectorMapper = sectorMapper;
    }

    /**
     * Save a contest.
     *
     * @param contestDTO the entity to save.
     * @return the persisted entity.
     */
    public ContestDTO save(ContestDTO contestDTO) {
        log.debug("Request to save Contest : {}", contestDTO);
        Contest contest = contestMapper.toEntity(contestDTO);
        contest = contestRepository.save(contest);
        return contestMapper.toDto(contest);
    }

    /**
     * Update a contest.
     *
     * @param contestDTO the entity to save.
     * @return the persisted entity.
     */
    public ContestDTO update(ContestDTO contestDTO) {
        log.debug("Request to update Contest : {}", contestDTO);
        Contest contest = contestMapper.toEntity(contestDTO);
        contest = contestRepository.save(contest);
        return contestMapper.toDto(contest);
    }

    /**
     * Partially update a contest.
     *
     * @param contestDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ContestDTO> partialUpdate(ContestDTO contestDTO) {
        log.debug("Request to partially update Contest : {}", contestDTO);

        return contestRepository
            .findById(contestDTO.getId())
            .map(existingContest -> {
                contestMapper.partialUpdate(existingContest, contestDTO);

                return existingContest;
            })
            .map(contestRepository::save)
            .map(contestMapper::toDto);
    }

    /**
     * Get all the contests.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<ContestDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contests");
        //return contestRepository.findAll(pageable).map(contestMapper::toDto);

        //Modified By Mohamed

        Page<ContestDTO> pcdto = contestRepository.findAll(pageable).map(contestMapper::toDto);
        List<ContestDTO> contestList = new ArrayList<>();
        if (pcdto != null && pcdto.hasContent()) {
            contestList = pcdto.getContent();
            for (int i = 0; i < contestList.size(); i++) { //for announceText contestannounce
                String idcontest_contestann = contestList.get(i).getContestannounce().getId();
                ContestannounceDTO contanndto = contestannounceRepository
                    .findById(idcontest_contestann)
                    .map(contestannounceMapper::toDto)
                    .orElse(null);
                contestList.get(i).setContestannounce(contanndto);

                //for designation grade
                String idcontest_grade = contestList.get(i).getGrade().getId();
                GradeDTO gradedto = gradeRepository.findById(idcontest_grade).map(gradeMapper::toDto).orElse(null);
                contestList.get(i).setGrade(gradedto);

                //for designation speciality
                String idcontest_speciality = contestList.get(i).getSpeciality().getId();
                SpecialityDTO specialitydto = specialityRepository.findById(idcontest_speciality).map(specialityMapper::toDto).orElse(null);
                contestList.get(i).setSpeciality(specialitydto);

                //for designation sector
                String idcontest_sector = contestList.get(i).getSector().getId();
                SectorDTO sectordto = sectorRepository.findById(idcontest_sector).map(sectorMapper::toDto).orElse(null);
                contestList.get(i).setSector(sectordto);
            }
            Long total = (long) contestList.size();
            Page<ContestDTO> pages = new PageImpl<ContestDTO>(contestList, pageable, total);
        }
        return pcdto;
    }

    /**
     * Get one contest by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<ContestDTO> findOne(String id) {
        log.debug("Request to get Contest : {}", id);
        return contestRepository.findById(id).map(contestMapper::toDto);
    }

    /**
     * Delete the contest by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Contest : {}", id);
        contestRepository.deleteById(id);
    }
}
