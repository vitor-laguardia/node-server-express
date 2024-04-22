class ContactController {
  index(request, response) {
    //list all registers
    response.send("Sent from index contactController");
  }
  show() {
    //get one register
  }
  store() {
    // create new register
  }
  update() {
    //edit a register
  }
  delete() {
    //delete a register
  }
}
//D.P: Singleton --> 1 unic instance of this class is saved in cache.
module.exports = new ContactController();
