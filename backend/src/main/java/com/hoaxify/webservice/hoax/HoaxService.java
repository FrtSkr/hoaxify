package com.hoaxify.webservice.hoax;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HoaxService {

    @Autowired
    HoaxRepository hoaxRepository;
    public void save(Hoax hoax) {
        hoaxRepository.save(hoax);
    }

    public Page<Hoax> getHoaxes(Pageable page) {
        return hoaxRepository.findAll(page);
    }
}
