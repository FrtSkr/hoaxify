package com.hoaxify.webservice.user;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
     User findByUsername(String username);

     Page<User> findByUsernameNot(String username, Pageable page);

     // UserProjection için kullanılan metot. Ama biz farklı bir yöntem uygulayacağız.
//     @Query(value = "Select u from User u")
//     Page<UserProjection> getAllUsersProjection(Pageable page);
}
