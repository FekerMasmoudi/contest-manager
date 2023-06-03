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
import tn.soretras.contestmanager.domain.Grade;
import tn.soretras.contestmanager.repository.CertificateRepository;
import tn.soretras.contestmanager.repository.EducationlevelRepository;
import tn.soretras.contestmanager.repository.GradeRepository;
import tn.soretras.contestmanager.service.dto.CertificateDTO;
import tn.soretras.contestmanager.service.dto.EducationlevelDTO;
import tn.soretras.contestmanager.service.dto.GradeDTO;
import tn.soretras.contestmanager.service.mapper.CertificateMapper;
import tn.soretras.contestmanager.service.mapper.EducationlevelMapper;
import tn.soretras.contestmanager.service.mapper.GradeMapper;

/**
 * Service Implementation for managing {@link Grade}.
 */
@Service
public class GradeService {

    private final Logger log = LoggerFactory.getLogger(GradeService.class);

    private final GradeRepository gradeRepository;

    private final GradeMapper gradeMapper;

    //Modified By Mohamed

    private final CertificateRepository certificateRepository;

    private final CertificateMapper certificateMapper;

    private final EducationlevelRepository educationlevelRepository;

    private final EducationlevelMapper educationlevelMapper;

    public GradeService(
        GradeRepository gradeRepository,
        GradeMapper gradeMapper,
        CertificateRepository certificateRepository,
        CertificateMapper certificateMapper,
        EducationlevelRepository educationlevelRepository,
        EducationlevelMapper educationlevelMapper
    ) {
        this.gradeRepository = gradeRepository;
        this.gradeMapper = gradeMapper;

        //Modified By Mohamed
        this.certificateRepository = certificateRepository;
        this.certificateMapper = certificateMapper;
        this.educationlevelRepository = educationlevelRepository;
        this.educationlevelMapper = educationlevelMapper;
    }

    /**
     * Save a grade.
     *
     * @param gradeDTO the entity to save.
     * @return the persisted entity.
     */
    public GradeDTO save(GradeDTO gradeDTO) {
        log.debug("Request to save Grade : {}", gradeDTO);
        Grade grade = gradeMapper.toEntity(gradeDTO);
        grade = gradeRepository.save(grade);
        return gradeMapper.toDto(grade);
    }

    /**
     * Update a grade.
     *
     * @param gradeDTO the entity to save.
     * @return the persisted entity.
     */
    public GradeDTO update(GradeDTO gradeDTO) {
        log.debug("Request to update Grade : {}", gradeDTO);
        Grade grade = gradeMapper.toEntity(gradeDTO);
        grade = gradeRepository.save(grade);
        return gradeMapper.toDto(grade);
    }

    /**
     * Partially update a grade.
     *
     * @param gradeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<GradeDTO> partialUpdate(GradeDTO gradeDTO) {
        log.debug("Request to partially update Grade : {}", gradeDTO);

        return gradeRepository
            .findById(gradeDTO.getId())
            .map(existingGrade -> {
                gradeMapper.partialUpdate(existingGrade, gradeDTO);

                return existingGrade;
            })
            .map(gradeRepository::save)
            .map(gradeMapper::toDto);
    }

    /**
     * Get all the grades.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<GradeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Grades");
        //return gradeRepository.findAll(pageable).map(gradeMapper::toDto);

        //Modified By Mohamed
        Page<GradeDTO> pgdto = gradeRepository.findAll(pageable).map(gradeMapper::toDto);
        List<GradeDTO> gradeList = new ArrayList<>();
        if (pgdto != null && pgdto.hasContent()) {
            gradeList = pgdto.getContent();
            for (int i = 0; i < gradeList.size(); i++) { //for designation certificate
                String idgra_cert = gradeList.get(i).getCertificate().getId();
                CertificateDTO certdto = certificateRepository.findById(idgra_cert).map(certificateMapper::toDto).orElse(null);
                gradeList.get(i).setCertificate(certdto);

                //for designation educationlevel
                String idgra_educlevel = gradeList.get(i).getEducationlevel().getId();
                EducationlevelDTO educleveldto = educationlevelRepository
                    .findById(idgra_educlevel)
                    .map(educationlevelMapper::toDto)
                    .orElse(null);
                gradeList.get(i).setEducationlevel(educleveldto);
            }
            Long total = (long) gradeList.size();
            Page<GradeDTO> pages = new PageImpl<GradeDTO>(gradeList, pageable, total);
        }
        return pgdto;
    }

    /**
     * Get one grade by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<GradeDTO> findOne(String id) {
        log.debug("Request to get Grade : {}", id);
        return gradeRepository.findById(id).map(gradeMapper::toDto);
        //Modified By Mohamed
        /* Optional<GradeDTO> odto =  gradeRepository.findById(id).map(gradeMapper::toDto);
        List<GradeDTO> gradeList = new ArrayList<>();
        if(odto != null && odto.hasContent()) {
        	gradeList = odto.getContent();
            for(int i =0; i < gradeList.size();i++)
            { //for designation certificate
            	String idgra_cert = ((GradeDTO) gradeList).getCertificate().getId();
            	CertificateDTO certdto = certificateRepository.findById(idgra_cert).map(certificateMapper::toDto).orElse(null);            	
            	((GradeDTO) gradeList).setCertificate(certdto);
            	
            	//for designation educationlevel
            	String idgra_educlevel = ((GradeDTO) gradeList).getEducationlevel().getId();
            	EducationlevelDTO educleveldto = educationlevelRepository.findById(idgra_educlevel).map(educationlevelMapper::toDto).orElse(null);            	
            	((GradeDTO) gradeList).setEducationlevel(educleveldto);
            }           
            Long total =  (long) gradeList.size();
            Optional<GradeDTO> pages = new PageImpl<GradeDTO>(gradeList, id, total );
        }
        return odto; */
    }

    /**
     * Delete the grade by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Grade : {}", id);
        gradeRepository.deleteById(id);
    }
}
