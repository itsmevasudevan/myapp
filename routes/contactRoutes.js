const express = require("express");
const router = express.Router();

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
    } = require("../Controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");
    

    router.use(validateToken);
    router.route('/').get(getContacts).post(createContact);        
  //Grouped with routes.put .delete. get
    router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);
  
    module.exports = router;