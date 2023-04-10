package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.hoax.vm.HoaxVM;
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
    public Page<HoaxVM> getHoaxes(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxes(page).map(HoaxVM::new);
    }

    @GetMapping("/users/{username}/hoaxes")
    public Page<HoaxVM> getUserHoaxes(@PathVariable String username, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxesOfUser(username, page).map(HoaxVM::new);
    }

    @GetMapping("/hoaxes/{id:[0-9]+}")
    public Page<HoaxVM> getHoaxesRelative(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable, @PathVariable long id){
        return hoaxService.getOldHoaxes(id, pageable).map(HoaxVM::new);
    }

}
