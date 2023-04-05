package com.hoaxify.webservice.hoax;

import com.hoaxify.webservice.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.sql.Timestamp;


@Entity
@Table(name = "hoaxes")
@Data
public class Hoax {
    @Id
    @GeneratedValue
    private long id;

    @Size(min = 1, max = 1000)
    @Column(length = 1000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
