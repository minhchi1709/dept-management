package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vn.diepgia.mchis.DebtManagement.models.User;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{ 'role' : ?0 }")
    List<User> findByRole(String role);

    @Query("{ 'userId' : ?0 }")
    User findByUserId(String userId);
}
