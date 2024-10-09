package com.example.donzoom.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ALARM_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private  String title;

    private String body;

    private String status;

    private String type;

    @Builder
    public Alarm(User user, String title, String body, String status, String type) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.status = status;
        this.type = type;
    }

    public void updateStatus(String status) {
        this.status = status;
    }
}
