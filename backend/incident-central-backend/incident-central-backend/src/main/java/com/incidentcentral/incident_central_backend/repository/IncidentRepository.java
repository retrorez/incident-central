package com.incidentcentral.incident_central_backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incidentcentral.incident_central_backend.model.Incident;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    
    //Find all instances of specific service
    List<Incident> findByService(String service);

    List<Incident> findBySeverity(String severity);

    List<Incident> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    List<Incident> findByTagsContaining(String keyword);

}
