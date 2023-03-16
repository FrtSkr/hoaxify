package com.hoaxify.webservice.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
     User findByUsername(String username);

     // UserProjection için kullanılan metot. Ama biz farklı bir yöntem uygulayacağız.
//     @Query(value = "Select u from User u")
//     Page<UserProjection> getAllUsersProjection(Pageable page);
}
