import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import { Goal, Interest, Password, Project, Skill, User, WorkExperience } from "./model/user.model";
const server = express();
dotenv.config();
server.use(express.json());
server.use(morgan("combined")); 


server.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err);
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.json(users);
      }
    });
  });
  
  server.post('/users', (req, res) => {
    const userData = req.body;
  
    const newUser = new User(userData);
  
    newUser.save((err, user) => {
      if (err) {
        console.error('Lỗi lưu thông tin cá nhân: ' + err);
        res.status(500).json({ error: 'Lỗi lưu thông tin cá nhân' });
      } else {
        res.json(user);
      }
    });
  });

  server.get('/skills', (req, res) => {
    Skill.find({}, (err, skills) => {
      if (err) {
        console.error('Lỗi truy vấn kỹ năng: ' + err);
        res.status(500).json({ error: 'Lỗi truy vấn kỹ năng' });
      } else {
        res.json(skills);
      }
    });
  });
  
  // Route để thêm một kỹ năng mới
  server.post('/skills', (req, res) => {
    const newSkill = new Skill({
      name: req.body.name
    });
  
    newSkill.save((err, skill) => {
      if (err) {
        console.error('Lỗi thêm kỹ năng mới: ' + err);
        res.status(500).json({ error: 'Lỗi thêm kỹ năng mới' });
      } else {
        res.json(skill);
      }
    });
  });
  

  server.get('/projects', (req, res) => {
    Project.find({}, (err, projects) => {
      if (err) {
        console.error('Lỗi truy vấn dự án: ' + err);
        res.status(500).json({ error: 'Lỗi truy vấn dự án' });
      } else {
        res.json(projects);
      }
    });
  });

  server.post('/projects', (req, res) => {
    const newProject = new Project({
      name: req.body.name,
      content: req.body.content,
      role: req.body.role,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });
  
    newProject.save((err, project) => {
      if (err) {
        console.error('Lỗi thêm dự án mới: ' + err);
        res.status(500).json({ error: 'Lỗi thêm dự án mới' });
      } else {
        res.json(project);
      }
    });
});

server.get('/work-experiences', (req, res) => {
    WorkExperience.find({}, (err, workExperiences) => {
      if (err) {
        console.error('Lỗi truy vấn quá trình làm việc: ' + err);
        res.status(500).json({ error: 'Lỗi truy vấn quá trình làm việc' });
      } else {
        res.json(workExperiences);
      }
    });
  });


  server.post('/work-experiences', (req, res) => {
    const newWorkExperience = new WorkExperience({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      company: req.body.company,
      role: req.body.role
    });
  
    newWorkExperience.save((err, workExperience) => {
      if (err) {
        console.error('Lỗi thêm quá trình làm việc mới: ' + err);
        res.status(500).json({ error: 'Lỗi thêm quá trình làm việc mới' });
      } else {
        res.json(workExperience);
      }
    });
  });

  server.get('/interests', (req, res) => {
    Interest.find({}, (err, interests) => {
      if (err) {
        console.error('Lỗi truy vấn sở thích: ' + err);
        res.status(500).json({ error: 'Lỗi truy vấn sở thích' });
      } else {
        res.json(interests);
      }
    });
  });
  
  // Route để thêm một sở thích mới
  server.post('/interests', (req, res) => {
    const newInterest = new Interest({
      name: req.body.name
    });
  
    newInterest.save((err, interest) => {
      if (err) {
        console.error('Lỗi thêm sở thích mới: ' + err);
        res.status(500).json({ error: 'Lỗi thêm sở thích mới' });
      } else {
        res.json(interest);
      }
    });
  });
  
  // Route để lấy danh sách tất cả mục tiêu cá nhân
  server.get('/goals', (req, res) => {
    Goal.find({}, (err, goals) => {
      if (err) {
        console.error('Lỗi truy vấn mục tiêu cá nhân: ' + err);
        res.status(500).json({ error: 'Lỗi truy vấn mục tiêu cá nhân' });
      } else {
        res.json(goals);
      }
    });
  });
  
  // Route để thêm một mục tiêu cá nhân mới
  server.post('/goals', (req, res) => {
    const newGoal = new Goal({
      description: req.body.description
    });
  
    newGoal.save((err, goal) => {
      if (err) {
        console.error('Lỗi thêm mục tiêu cá nhân mới: ' + err);
        res.status(500).json({ error: 'Lỗi thêm mục tiêu cá nhân mới' });
      } else {
        res.json(goal);
      }
    });
  });


  server.post('/passwords', async (req, res) => {
    try {
      const { username, password, profileId } = req.body;
      const user = new Password({ username, password, profileId });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  
  // Định nghĩa route để lấy thông tin người dùng
  server.get('/passwords/:id', async (req, res) => {
    try {
      const user = await Password.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  });
  
  // Định nghĩa route để cập nhật thông tin người dùng
  server.put('/passwords/:id', async (req, res) => {
    try {
      const { username, password, profileId } = req.body;
      const user = await Password.findByIdAndUpdate(req.params.id, { username, password, profileId }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  
  // Định nghĩa route để xóa người dùng
  server.delete('/passwords/:id', async (req, res) => {
    try {
      const user = await Password.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });


  // Định nghĩa route để tạo người dùng mới
  server.post('/users', async (req, res) => {
    try {
      const { username, password, profileId } = req.body;
      const user = new Password({ username, password, profileId });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });


  server.post('/users/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Password.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
    
      res.json({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
    }
  });
  
  // Định nghĩa route để đăng xuất
  server.post('/users/logout', async (req, res) => {
    try {
     
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log out' });
    }
  });




  server.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  });
  
  // Định nghĩa route để lấy thông tin một người dùng bằng ID
  server.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  });
  
  // Định nghĩa route để tạo người dùng mới
  server.post('/users', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  
  // Định nghĩa route để cập nhật thông tin người dùng bằng ID
  server.put('/users/:id', async (req, res) => {
    try {
      const { username, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, password }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  
  // Định nghĩa route để xóa người dùng bằng ID
  server.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  


  server.listen(3000, () => {
    console.log('Server running on 3000');
  });



mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    server.listen(process.env.PORT, () => console.log("Server is running!"))
  );
