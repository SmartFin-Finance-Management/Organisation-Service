// controllers/organisationController.ts
import { Request, Response } from 'express';
import * as organisationService from '../service/organisationService';
import { Organisation, Employee, Project } from '../models/types';
import OrganisationModel from '../models/organisationModel';
import axios from 'axios';


// Create a new organisation
export const createOrg = async (req: Request, res: Response) => {
    const organisationData: Organisation = req.body;

    try {
        const organisation = await organisationService.createOrg(organisationData);
        res.status(201).json(organisation);
    } catch (error) {
        res.status(400).json({ message: "Error creating organisation" });
    }
};

// Read all organisations
export const getAllOrg = async (_req: Request, res: Response) => {
    try {
        const organisations = await organisationService.getAllOrgs();
        res.json(organisations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching organisations" });
    }
};

// Read a single organisation by ID
export const getOrgById = async (req: Request, res: Response) => {
    try {
        const organisation = await organisationService.getOrgById(req.params.id);
        if (!organisation)  res.status(404).json({ message: 'Organisation not found' });
        else res.json(organisation);
    } catch (error) {
        res.status(500).json({ message: "Error fetching organisation" });
    }
};

// Update an organisation by ID
export const updateOrg = async (req: Request, res: Response) => {
    const organisationData: Partial<Organisation> = req.body;

    try {
        const organisation = await organisationService.updateOrg(req.params.id, organisationData);
        if (!organisation)res.status(404).json({ message: 'Organisation not found' });
        else res.json(organisation);
    } catch (error) {
        res.status(400).json({ message: "Error updating organisation" });
    }
};

// Delete an organisation by ID
export const deleteOrg = async (req: Request, res: Response) => {
    try {
        const organisation = await organisationService.deleteOrg(req.params.id);
        if (!organisation) res.status(404).json({ message: 'Organisation not found' });
        else res.json({ message: 'Organisation deleted' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting organisation" });
    }
};

// Add an employee to an organisation
export const addEmployeeToOrg = async (req: Request, res: Response) => {
    const orgId = req.params.orgId;
    const employeeData: Employee = req.body;

    try {
        const response = await organisationService.addEmployeeToOrg(orgId, employeeData);
        res.status(201).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error adding employee to organisation', error: error.message });
    }
};

// Fetch employees by organisation ID
export const getEmployeesByOrgId = async (req: Request, res: Response) => {
    const orgId =req.params.orgId;

    try {
        const response = await organisationService.getEmployeesByOrgId(orgId);
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

// Fetch projects by organisation ID
export const getProjectsByOrgId = async (req: Request, res: Response) => {
    const orgId = req.params.orgId;

    try {
        const response = await organisationService.getProjectsByOrgId(orgId);
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};

// Fetch clients by organisation ID
export const getClientsByOrgId = async (req: Request, res: Response) => {
    const orgId = req.params.orgId;

    try {
        const response = await organisationService.getClientsByOrgId(orgId);
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching clients', error: error.message });
    }
};

// Add a new project to an organisation
export const addProjectToOrg = async (req: Request, res: Response) => {
    const orgId = req.params.orgId;
    const projectData = req.body;

    projectData.org_id = orgId;

    try {
        const response = await organisationService.addProjectToOrg(orgId, projectData);
        res.status(201).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error adding project to organisation', error: error.message });
    }
};

// Add a new client to an organisation
export const addClientToOrg = async (req: Request, res: Response) => {
    const orgId = req.params.orgId;
    const clientData = req.body;

    clientData.org_id = orgId;

    try {
        const response = await organisationService.addClientToOrg(orgId, clientData);
        res.status(201).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error adding client to organisation', error: error.message });
    }
};

// Fetch the maximum org_id
export const getMaxOrgId = async (req: Request, res: Response) => {
    console.log("Fetching max organisation ID");
  
    try {
      // Find the organisation with the maximum org_id
      const maxOrganisation = await OrganisationModel.findOne({}, { org_id: 1 }) // Retrieve only the org_id field
        .sort({ org_id: -1 }) // Sort in descending order to get the max id
        .limit(1); // Limit to 1 result
  
      // If maxOrganisation is found, extract the org_id; otherwise, set it to 0
      const maxId = maxOrganisation ? maxOrganisation.org_id : 0;
  
      // Send back the max org_id as a JSON response
      res.status(200).json({ max_org_id: maxId });
    } catch (error) {
      console.error(`Error fetching max org_id: ${error}`);
      res.status(500).json({ error: `Error fetching maximum org_id: ${error}` });
    }
  };
  
// Fetch all projects in the organization and calculate budget details
export const getProjectsBudgetDetailsByOrgId = async (req: Request, res: Response) => {
    const orgId = req.params.orgId;

    try {
        // Fetch all projects associated with the given organization ID
        const response = await axios.get(`http://localhost:4000/projects/orgs/${orgId}`);
        const projects: Project[] = response.data; // Assuming the response contains the projects array

        // Initialize totals
        let totalBudget = 0;
        let totalSpent = 0;

        // Calculate total budget and total spent
        projects.forEach((project: Project) => {
            totalBudget += project.total_budget;
            totalSpent += project.actual_expenses; // Assuming actual_expenses represents the spent amount
        });

        // Calculate remaining budget
        const remainingBudget = totalBudget - totalSpent;

        // Return the calculated budget details along with the projects
        res.status(200).json({
            total_budget: totalBudget,
            spent: totalSpent,
            remaining: remainingBudget,
            projects: projects // Optionally return the projects data
        });
    } catch (error: any) {
        console.error(`Error fetching projects budget details for org ID ${orgId}: ${error.message}`);
        res.status(500).json({ message: 'Error fetching projects budget details', error: error.message });
    }
};
