package com.hoaxify.webservice.hoax;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;


@Entity
@Table(name = "hoaxes")
@Data
public class Hoax {
    @Id
    @GeneratedValue
    private long id;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());

}
