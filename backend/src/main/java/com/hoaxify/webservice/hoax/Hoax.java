package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.file.FileAttachment;
import com.hoaxify.webservice.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;


@Entity
@Table(name = "hoaxes")
@Data
public class Hoax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 1000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "hoax")
    private FileAttachment fileAttachment;

}
