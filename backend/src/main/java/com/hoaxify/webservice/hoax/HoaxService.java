package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaxService {

    @Autowired
    HoaxRepository hoaxRepository;

    @Autowired
    UserService userService;

    public void save(Hoax hoax, User user) {
        hoax.setUser(user);
        hoaxRepository.save(hoax);
    }

    public Page<Hoax> getHoaxes(String username, Pageable page) {
        if(username != null){
            User inDB= userService.getByUsername(username);
            return hoaxRepository.findByUser(inDB, page);
        }
        return hoaxRepository.findAll(page);
    }


    public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
        Specification<Hoax> specification = idLessThan(id);
        if(username != null){
            User inDb= userService.getByUsername(username);
            specification = specification.and(userIs(inDb));

        }
       return hoaxRepository.findAll(specification, page);
    }



    public long getNewHoaxesCount(long id, String username) {
        Specification<Hoax> specification = idGreaterThan(id);
        if(username != null){
            User inDb= userService.getByUsername(username);
            specification = specification.and(userIs(inDb));
        }
        return hoaxRepository.count(specification);
    }

    public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
        Specification<Hoax> specification = idGreaterThan(id);
        if(username != null){
            User inDb = userService.getByUsername(username);
            specification = specification.and(userIs(inDb));
        }
        return hoaxRepository.findAll(specification, sort);
    }


    Specification<Hoax> idLessThan(long id) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.lessThan(root.get("id"), id);
        };
    }

    Specification<Hoax> userIs(User user){
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("user"), user);
        };
    }

    Specification<Hoax> idGreaterThan(long id) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.greaterThan(root.get("id"), id);
        };
    }

}
