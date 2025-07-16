const mongoose = require("mongoose");
const XLSX = require("xlsx");
const Student = require("./models/Student");
require("dotenv").config();

async function importStudents(filePath, className) {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ Connected to MongoDB`);

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  for (const row of rows) {
  // Map columns carefully
  const rollNo = row["Roll No"] || row["ROLLNO"] || row["rollno"];
  const name = row["Name"] || row["NAME"];
  const email = row["Email"] || row["GMAIL"] || row["email"];

  // Skip if missing
  if (!rollNo || !name || !email) {
    console.log("⛔ Skipping row (missing data):", row);
    continue;
  }

  // Save student
  await Student.create({
    rollNo,
    name,
    email,
    className
  });
}




  console.log(`✅ Imported ${rows.length} students for ${className}`);
  process.exit();
}

// Usage: node importStudents.js ../student-excel-files/Class-A.xlsx "Class A"
const file = process.argv[2];
const className = process.argv[3];

if (!file || !className) {
  console.error("❌ Usage: node importStudents.js <filePath> <className>");
  process.exit(1);
}

importStudents(file, className);
