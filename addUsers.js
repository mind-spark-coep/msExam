const mongoose = require("mongoose");
const User = require("./models/user");

require("dotenv").config();

// MongoDB connection
const MONGODB_URI = process.env.MONGO_URL;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const usersToAdd = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      school: "Delhi Public School",
    },
    {
      name: "Aditi Patel",
      email: "aditi.patel@example.com",
      school: "St. Xavier's School",
    },
    {
      name: "Advait Desai",
      email: "advait.desai@example.com",
      school: "Bhartiya Vidya Bhavan",
    },
    {
      name: "Akshara Singh",
      email: "akshara.singh@example.com",
      school: "Army Public School",
    },
    {
      name: "Aryan Verma",
      email: "aryan.verma@example.com",
      school: "Kendriya Vidyalaya",
    },
    {
      name: "Chahat Choudhary",
      email: "chahat.choudhary@example.com",
      school: "Bharatiya Vidya Bhavan",
    },
    {
      name: "Devika Reddy",
      email: "devika.reddy@example.com",
      school: "Sri Chaitanya Techno School",
    },
    {
      name: "Eshaan Kapoor",
      email: "eshaan.kapoor@example.com",
      school: "The Mother's International School",
    },
    {
      name: "Gayatri Gupta",
      email: "gayatri.gupta@example.com",
      school: "Modern School",
    },
    {
      name: "Harsh Shah",
      email: "harsh.shah@example.com",
      school: "Vidya Niketan School",
    },
    {
      name: "Ishaan Joshi",
      email: "ishaan.joshi@example.com",
      school: "DPS RK Puram",
    },
    {
      name: "Juhi Mishra",
      email: "juhi.mishra@example.com",
      school: "Loreto Convent School",
    },
    {
      name: "Kabir Singh",
      email: "kabir.singh@example.com",
      school: "La Martiniere Boys' College",
    },
    {
      name: "Lavanya Gupta",
      email: "lavanya.gupta@example.com",
      school: "Sanskriti School",
    },
    {
      name: "Manan Sharma",
      email: "manan.sharma@example.com",
      school: "DPS Noida",
    },
    {
      name: "Navya Patel",
      email: "navya.patel@example.com",
      school: "Amity International School",
    },
    {
      name: "Omkar Verma",
      email: "omkar.verma@example.com",
      school: "Ryan International School",
    },
    {
      name: "Prisha Singh",
      email: "prisha.singh@example.com",
      school: "The Shri Ram School",
    },
    {
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      school: "St. Mary's School",
    },
    {
      name: "Samaira Bhatia",
      email: "samaira.bhatia@example.com",
      school: "Cathedral and John Connon School",
    },
  ];
  

async function addUsersToDatabase() {
    for (const userData of usersToAdd) {
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            console.log("New user added:", savedUser);
        } catch (error) {
            console.error("Error adding user:", error.message);
        }
    }
    mongoose.connection.close();
}

addUsersToDatabase();
