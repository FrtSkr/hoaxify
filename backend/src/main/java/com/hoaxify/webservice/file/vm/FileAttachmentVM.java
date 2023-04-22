package com.hoaxify.webservice.file.vm;

import com.hoaxify.webservice.file.FileAttachment;
import lombok.Data;

@Data
public class FileAttachmentVM {

    private String name;
    private String fileType;
    public FileAttachmentVM(FileAttachment fileAttachment){
        this.setName(fileAttachment.getName());
        this.setFileType(fileAttachment.getFileType());
    }
}
