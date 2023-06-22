package tn.soretras.contestmanager.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import tn.soretras.contestmanager.domain.Contestfield;
import tn.soretras.contestmanager.service.dto.ContestfieldDTO;
import tn.soretras.contestmanager.domain.Contest;
import java.util.List;


/**
 * Spring Data MongoDB repository for the Contestfield entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContestfieldRepository extends MongoRepository<Contestfield, String> {
    List<ContestfieldDTO> findByContest(Contest contest);
}
