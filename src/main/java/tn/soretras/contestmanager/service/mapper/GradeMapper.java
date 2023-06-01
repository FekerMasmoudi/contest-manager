package tn.soretras.contestmanager.service.mapper;

import org.mapstruct.*;
import tn.soretras.contestmanager.domain.Certificate;
import tn.soretras.contestmanager.domain.Educationlevel;
import tn.soretras.contestmanager.domain.Grade;
import tn.soretras.contestmanager.service.dto.CertificateDTO;
import tn.soretras.contestmanager.service.dto.EducationlevelDTO;
import tn.soretras.contestmanager.service.dto.GradeDTO;

/**
 * Mapper for the entity {@link Grade} and its DTO {@link GradeDTO}.
 */
@Mapper(componentModel = "spring")
public interface GradeMapper extends EntityMapper<GradeDTO, Grade> {
    @Mapping(target = "certificate", source = "certificate", qualifiedByName = "certificateId")
    @Mapping(target = "educationlevel", source = "educationlevel", qualifiedByName = "educationlevelId")
    GradeDTO toDto(Grade s);

    @Named("certificateId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CertificateDTO toDtoCertificateId(Certificate certificate);

    @Named("educationlevelId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EducationlevelDTO toDtoEducationlevelId(Educationlevel educationlevel);
}
