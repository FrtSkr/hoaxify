package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoaxRepository extends JpaRepository<Hoax, Long> {
    Page<Hoax> findByUser(User user, Pageable page);
    Page<Hoax> findByIdLessThan(long id, Pageable page);

    Page<Hoax> findByIdLessThanAndUser(long id, User user, Pageable page);

    long countByIdGreaterThan(long id);
    long countByIdGreaterThanAndUser(long id, User user);

    List<Hoax> findByIdGreaterThan(long id, Sort sort);

    List<Hoax> findByIdGreaterThanAndUser(long id, User user, Sort sort);
}
