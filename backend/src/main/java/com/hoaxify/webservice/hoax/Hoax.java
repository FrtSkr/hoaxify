package com.hoaxify.webservice.hoax;

import jakarta.persistence.*;
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

}
