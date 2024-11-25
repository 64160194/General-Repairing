class AddRequestController {
  static showAddRequestForm(req, res) {
    res.render('add_request', { user: req.session.user });
  }

  static submitAddRequest(req, res) {
    // ตรงนี้คุณจะเพิ่มตรรกะสำหรับการบันทึกข้อมูลคำขอซ่อมลงในฐานข้อมูล
    // เช่น การเรียกใช้ model เพื่อบันทึกข้อมูล
    console.log(req.body); // แสดงข้อมูลที่ส่งมาจากฟอร์ม
    res.redirect('/user_home'); // หลังจากบันทึกเสร็จ ให้ redirect กลับไปหน้าหลักของผู้ใช้
  }
}

module.exports = AddRequestController;