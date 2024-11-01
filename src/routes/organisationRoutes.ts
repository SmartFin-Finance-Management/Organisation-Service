import express from 'express';
import { createOrg, getAllOrg, getOrgById, updateOrg  , deleteOrg, getProjectsByOrgId,getEmployeesByOrgId,getClientsByOrgId, addProjectToOrg,addClientToOrg,addEmployeeToOrg, getMaxOrgId} from '../controller/organisationController';

const router = express.Router();

router.post('/Orgp', createOrg );
router.get('/Orgp', getMaxOrgId);
router.get('/Org', getAllOrg );
router.get('/Org/:id', getOrgById );
router.put('/Org/:id', updateOrg );
router.delete('/Org/:id', deleteOrg );
router.get('/:orgId/projects', getProjectsByOrgId);
router.get('/:orgId/employees',getEmployeesByOrgId);
router.get('/:orgId/clients', getClientsByOrgId);
router.post('/:orgId/projects', addProjectToOrg);
router.post('/:orgId/clients', addClientToOrg);
router.post('/:orgId/employees', addEmployeeToOrg);

export default router;