package tn.soretras.contestmanager.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import tn.soretras.contestmanager.domain.Fieldcontestform;

/**
 * Spring Data MongoDB repository for the Fieldcontestform entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldcontestformRepository extends MongoRepository<Fieldcontestform, String> {}
