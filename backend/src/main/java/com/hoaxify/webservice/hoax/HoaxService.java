package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.file.FileAttachment;
import com.hoaxify.webservice.file.FileAttachmentRepository;
import com.hoaxify.webservice.file.FileService;
import com.hoaxify.webservice.hoax.vm.HoaxSubmitVM;
import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaxService {

    private UserService userService;
    private HoaxRepository hoaxRepository;
    private FileAttachmentRepository fileAttachmentRepository;


    private FileService fileService;

    public HoaxService(HoaxRepository hoaxRepository, FileAttachmentRepository fileAttachmentRepository, FileService fileService, UserService userService) {
        super();
        this.hoaxRepository = hoaxRepository;
        this.fileAttachmentRepository = fileAttachmentRepository;
        this.fileService = fileService;
        this.userService= userService;
    }

    public void save(HoaxSubmitVM hoaxSubmitVM, User user) {
        Hoax hoax = new Hoax();
        hoax.setContent(hoaxSubmitVM.getContent());
        hoax.setUser(user);
        hoaxRepository.save(hoax);
        Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(hoaxSubmitVM.getAttachmentId());
        if(optionalFileAttachment.isPresent()){
            FileAttachment fileAttachment = optionalFileAttachment.get();
            fileAttachment.setHoax(hoax);
            fileAttachmentRepository.save(fileAttachment);
        }
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

    public void delete(long id) {
        Hoax inDB = hoaxRepository.getReferenceById(id);
        if(inDB.getFileAttachment() != null){
            String fileName = inDB.getFileAttachment().getName();
            fileService.deleteAttachmentFile(fileName);
        }
        hoaxRepository.deleteById(id);
    }

}
