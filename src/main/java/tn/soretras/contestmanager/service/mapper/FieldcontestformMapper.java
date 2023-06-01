package tn.soretras.contestmanager.service.mapper;

import org.mapstruct.*;
import tn.soretras.contestmanager.domain.Contestform;
import tn.soretras.contestmanager.domain.Fieldcontestform;
import tn.soretras.contestmanager.service.dto.ContestformDTO;
import tn.soretras.contestmanager.service.dto.FieldcontestformDTO;

/**
 * Mapper for the entity {@link Fieldcontestform} and its DTO {@link FieldcontestformDTO}.
 */
@Mapper(componentModel = "spring")
public interface FieldcontestformMapper extends EntityMapper<FieldcontestformDTO, Fieldcontestform> {
    @Mapping(target = "contestform", source = "contestform", qualifiedByName = "contestformId")
    FieldcontestformDTO toDto(Fieldcontestform s);

    @Named("contestformId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContestformDTO toDtoContestformId(Contestform contestform);
}
