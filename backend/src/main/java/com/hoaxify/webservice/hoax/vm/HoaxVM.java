package com.hoaxify.webservice.hoax.vm;
import com.hoaxify.webservice.file.FileAttachment;
import com.hoaxify.webservice.file.vm.FileAttachmentVM;
import com.hoaxify.webservice.hoax.Hoax;
import com.hoaxify.webservice.user.vm.UserVM;
import lombok.Data;

@Data
public class HoaxVM {

    private long id;

    private String content;

    private long timestamp;

    private UserVM user;

    private FileAttachmentVM fileAttachment;

    public HoaxVM(Hoax hoax){
        this.setId(hoax.getId());
        this.setContent(hoax.getContent());
        this.setTimestamp(hoax.getTimestamp().getTime());
        this.setUser(new UserVM(hoax.getUser()));
        if(hoax.getFileAttachment() != null){
            this.setFileAttachment(new FileAttachmentVM(hoax.getFileAttachment()));
        }
    }
}
