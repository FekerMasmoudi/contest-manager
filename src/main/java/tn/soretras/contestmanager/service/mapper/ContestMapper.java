package tn.soretras.contestmanager.service.mapper;

import org.mapstruct.*;
import tn.soretras.contestmanager.domain.Contest;
import tn.soretras.contestmanager.domain.Contestannounce;
import tn.soretras.contestmanager.domain.Grade;
import tn.soretras.contestmanager.domain.Sector;
import tn.soretras.contestmanager.domain.Speciality;
import tn.soretras.contestmanager.service.dto.ContestDTO;
import tn.soretras.contestmanager.service.dto.ContestannounceDTO;
import tn.soretras.contestmanager.service.dto.GradeDTO;
import tn.soretras.contestmanager.service.dto.SectorDTO;
import tn.soretras.contestmanager.service.dto.SpecialityDTO;

/**
 * Mapper for the entity {@link Contest} and its DTO {@link ContestDTO}.
 */
@Mapper(componentModel = "spring")
public interface ContestMapper extends EntityMapper<ContestDTO, Contest> {
    @Mapping(target = "contestannounce", source = "contestannounce", qualifiedByName = "contestannounceId")
    @Mapping(target = "grade", source = "grade", qualifiedByName = "gradeId")
    @Mapping(target = "speciality", source = "speciality", qualifiedByName = "specialityId")
    @Mapping(target = "sector", source = "sector", qualifiedByName = "sectorId")
    ContestDTO toDto(Contest s);

    @Named("contestannounceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContestannounceDTO toDtoContestannounceId(Contestannounce contestannounce);

    @Named("gradeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GradeDTO toDtoGradeId(Grade grade);

    @Named("specialityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SpecialityDTO toDtoSpecialityId(Speciality speciality);

    @Named("sectorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SectorDTO toDtoSectorId(Sector sector);
}
