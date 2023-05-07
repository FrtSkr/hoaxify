package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.hoax.vm.HoaxSubmitVM;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {


    HoaxService hoaxService;

    public HoaxController(HoaxService hoaxService) {
        this.hoaxService = hoaxService;
    }

    @PostMapping("/hoaxes")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse saveHoax(@Valid @RequestBody HoaxSubmitVM hoaxSubmitVM, @CurrentUser User user){
        hoaxService.save(hoaxSubmitVM, user);
        return new GenericResponse("Hoax created");
    }

    @GetMapping({"/hoaxes", "/users/{username}/hoaxes"})
    public Page<HoaxVM> getHoaxes(@PathVariable(required = false) String username, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxes(username, page).map(HoaxVM::new);
    }


    @GetMapping({"/hoaxes/{id:[0-9]+}", "/users/{username}/hoaxes/{id:[0-9]+}"})
    public ResponseEntity<?> getHoaxesRelative(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page,
                                          @PathVariable long id,
                                               @PathVariable(required = false) String username,
                                               @RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
                                               @RequestParam(name = "direction", defaultValue = "before") String direction
                                               ){
        if(count){
            long newHoaxCount = hoaxService.getNewHoaxesCount(id, username);
            Map<String, Long> response = new HashMap<>();
            response.put("count", newHoaxCount);
            return ResponseEntity.ok(response);
        }
        if(direction.equals("after")){

            List<HoaxVM> newHoaxes = hoaxService.getNewHoaxes(id, username, page.getSort())
                    .stream().map(HoaxVM::new).toList();
            return ResponseEntity.ok(newHoaxes);
        }
        return ResponseEntity.ok(hoaxService.getOldHoaxes(id, username, page).map(HoaxVM::new));
    }

    @DeleteMapping("/hoaxes/{id:[0-9]+}")
    @PreAuthorize("@hoaxSecurity.isAllowedToDelete(#id, principal)")
    GenericResponse deleteHoax(@PathVariable long id, @CurrentUser User loggedInUser){
        hoaxService.delete(id);
        return new GenericResponse("Hoax removed");
    }

}
