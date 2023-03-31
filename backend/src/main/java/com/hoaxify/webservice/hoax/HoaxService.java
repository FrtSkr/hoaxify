package com.hoaxify.webservice.hoax;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoaxService {

    @Autowired
    HoaxRepository hoaxRepository;
    public void save(Hoax hoax) {
        hoaxRepository.save(hoax);
    }
}
