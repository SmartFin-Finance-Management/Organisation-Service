// services/organisationService.ts
import OrganisationModel from '../models/organisationModel';
import axios from 'axios';
import { Organisation, Employee, Project, Client } from '../models/types';

// Create a new organisation
export const createOrg = async (data: Organisation) => {
    const organisation = new OrganisationModel(data);
    return await organisation.save();
};

// Update an organisation by ID
export const updateOrg = async (id: string, data: Partial<Organisation>) => {
    return await OrganisationModel.findOneAndUpdate(
        { org_id: id },
        data,
        { new: true, runValidators: true }
    );
};

// Delete an organisation by ID

export const deleteOrg = async (id: string) => {
     await OrganisationModel.findOne({org_id: id});
     return await OrganisationModel.findOneAndDelete({org_id: id});
};

// Fetch all organisations

export const getAllOrgs = async () => {
    return await OrganisationModel.find();
};

// Fetch an organisation by ID

export const getOrgById = async (id: string) => {
    return await OrganisationModel.findOne({ org_id: id });
};






// Fetch employees by organisation ID
export const getEmployeesByOrgId = async (orgId: string) => {
    return await axios.get(`http://localhost:3000/api/employees/orgs/${orgId}`);
};

// Fetch projects by organisation ID
export const getProjectsByOrgId = async (orgId: string) => {
    return await axios.get(`http://localhost:4000/api/projects/orgs/${orgId}`);
};

// Fetch clients by organisation ID
export const getClientsByOrgId = async (orgId: string) => {
    return await axios.get(`http://localhost:6000/api/clients/orgs/${orgId}`);
};

// Add a new project to an organisation
export const addProjectToOrg = async (orgId: string, projectData:Project ) => {
    projectData.org_id = parseInt(orgId, 10);
    return await axios.post('http://localhost:4000/api/projects', projectData);
};

// Add a new client to an organisation
export const addClientToOrg = async (orgId: string, clientData: Client) => {
    clientData.org_id =parseInt(orgId, 10);
    return await axios.post('http://localhost:6000/api/clients', clientData);
};
// Add a new employee to an organisation
export const addEmployeeToOrg = async (orgId: string, employeeData: Employee) => {
    employeeData.org_id = parseInt(orgId, 10);
    return await axios.post('http://localhost:3000/api/employees', employeeData);
};
