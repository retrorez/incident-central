package com.incidentcentral.incident_central_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.incidentcentral.incident_central_backend.model.Incident;
import com.incidentcentral.incident_central_backend.repository.IncidentRepository;

@Service
public class IncidentService {
    
    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public Incident saveIncident(Incident incident) {

        //Add default severity if not provided
        if (incident.getSeverity() == null || incident.getSeverity().isBlank()) {
            incident.setSeverity("Info");
        }

        //Normalize Source App
        if (incident.getSourceApp() != null) {
            incident.setSourceApp(incident.getSourceApp().trim().toLowerCase());
        }

        //Auto-tagging bsaed on keywords in the message
        String msg = incident.getMessage().trim().toLowerCase();
        StringBuilder tags = new StringBuilder();

        if (msg.contains("timeout")) tags.append("timeout,");
        if (msg.contains("exception")) tags.append("exception,");
        if (msg.contains("db") || msg.contains("database")) tags.append("database,");
        if (msg.contains("auth") || msg.contains("unauthorized")) tags.append("auth,");

        if (tags.length() > 0) {
            // Remove trailing comma
            tags.setLength(tags.length() - 1);
            incident.setTags(tags.toString());
        }

        if (incident.getTags() == null) {
            incident.setTags("");
        }


        return incidentRepository.save(incident);
    }

public boolean deleteIncident(Long id) {
    if (!incidentRepository.existsById(id)) {
        return false;
    }
    incidentRepository.deleteById(id);
    return true;
}

public Optional<Incident> getIncidentById(Long id) {
    return incidentRepository.findById(id);
}


}
