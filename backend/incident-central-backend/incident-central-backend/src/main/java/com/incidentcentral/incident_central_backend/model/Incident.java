package com.incidentcentral.incident_central_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "incidents")

public class Incident {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String service;
    
    @Column(length=1000, nullable=false)
    private String message;

    private String severity;
    
    private LocalDateTime timestamp = LocalDateTime.now();

    private String sourceApp;
    private String tags;
}
