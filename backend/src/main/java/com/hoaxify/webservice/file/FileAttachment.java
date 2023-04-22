package com.hoaxify.webservice.file;

import com.hoaxify.webservice.hoax.Hoax;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class FileAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String fileType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @OneToOne
    private Hoax hoax;


}
