package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<Hoax> getHoaxes(Pageable page) {
        return hoaxRepository.findAll(page);
    }

    public Page<Hoax> getHoaxesOfUser(String username, Pageable page) {
        User inDB= userService.getByUsername(username);
        return hoaxRepository.findByUser(inDB, page);
    }

    public Page<Hoax> getOldHoaxes(long id, Pageable pageable) {
       return hoaxRepository.findByIdLessThan(id, pageable);
    }


    public Page<Hoax> getOldHoaxesOfUser(long id, String username, Pageable page) {
        User inDb= userService.getByUsername(username);
        return hoaxRepository.findByIdLessThanAndUser(id, inDb, page);
    }

    public long getNewHoaxesCount(long id) {
        return hoaxRepository.countByIdGreaterThan(id);
    }

    public long getNewHoaxesCountOfUser(long id, String username) {
        User inDb= userService.getByUsername(username);
        return hoaxRepository.countByIdGreaterThanAndUser(id, inDb);
    }

    public List<Hoax> getNewHoaxes(long id, Sort sort) {
        return hoaxRepository.findByIdGreaterThan(id, sort);
    }

    public List<Hoax> getNewHoaxesOfUser(long id, String username, Sort sort) {
        User inDb = userService.getByUsername(username);
        return hoaxRepository.findByIdGreaterThanAndUser(id, inDb, sort);
    }
}
