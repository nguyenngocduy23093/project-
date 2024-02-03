import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    nationality: String,
    education: [
      {
        schoolName: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date
      }
    ]
  });
  const skillSchema = new mongoose.Schema({
    name: String
  });
  
  const projectSchema = new mongoose.Schema({
    name: String,
    content: String,
    role: String,
    startDate: Date,
    endDate: Date
  });
  
  const workExperienceSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    company: String,
    role: String
  });

  const interestSchema = new mongoose.Schema({
    name: String
  });
  
  const goalSchema = new mongoose.Schema({
    description: String
  });
 
  const passwordSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  });
  
const User = mongoose.model('User', userSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Project = mongoose.model('Project', projectSchema);
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
const Interest = mongoose.model('Interest', interestSchema);
const Goal = mongoose.model('Goal', goalSchema);
const Password=mongoose.model('Password', passwordSchema)


export {User,Skill,Project,WorkExperience,Interest,Goal,Password};
