package vn.com.fsoft.cep.repository;

import io.micronaut.core.annotation.NonNull;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaSpecificationExecutor;
import io.micronaut.data.repository.PageableRepository;
import vn.com.fsoft.cep.entity.Adgroup;

import java.util.UUID;

@Repository
public interface AdgroupRepository extends PageableRepository<Adgroup, UUID>, JpaSpecificationExecutor<Adgroup> {

    @Override
    @Query(value = "UPDATE adgroup SET is_deleted = true, deleted_at = now() WHERE id = :uuid", nativeQuery = true)
    void deleteById(@NonNull UUID uuid);
}
