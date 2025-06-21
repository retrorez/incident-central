package com.incidentcentral.incident_central_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.incidentcentral.incident_central_backend.model.Incident;
import com.incidentcentral.incident_central_backend.service.IncidentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    // Get all incidents
    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentService.getAllIncidents();
    }

    // Get a specific incident by ID
    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        return incidentService.getIncidentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new incident (uses service logic!)
    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        Incident saved = incidentService.saveIncident(incident);
        return ResponseEntity.ok(saved);
    }

    // Delete an incident
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncident(@PathVariable Long id) {
        if (!incidentService.deleteIncident(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
