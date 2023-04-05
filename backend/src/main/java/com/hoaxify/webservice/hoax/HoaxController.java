package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.shared.CurrentUser;
import com.hoaxify.webservice.shared.GenericResponse;
import com.hoaxify.webservice.user.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

    @Autowired
    HoaxService hoaxService;

    @PostMapping("/hoaxes")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse saveHoax(@Valid @RequestBody Hoax hoax, @CurrentUser User user){
        hoaxService.save(hoax, user);
        return new GenericResponse("Hoax created");
    }

    @GetMapping("/hoaxes")
    public Page<Hoax> getHoaxes(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxes(page);
    }
}
