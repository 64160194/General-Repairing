const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // หรือพอร์ตอื่นๆ ที่คุณต้องการใช้

// ตั้งค่า EJS เป็น view engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// กำหนด directory ที่เก็บไฟล์ view (ejs)
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});