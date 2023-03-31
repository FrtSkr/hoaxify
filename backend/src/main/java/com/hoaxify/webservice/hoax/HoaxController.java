package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.shared.GenericResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

    @Autowired
    HoaxService hoaxService;

    @PostMapping("/hoaxes")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse saveHoax(@Valid @RequestBody Hoax hoax){
        hoaxService.save(hoax);
        return new GenericResponse("Hoax created");
    }
}
