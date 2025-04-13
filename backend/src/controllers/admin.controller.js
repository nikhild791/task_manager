import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { admin_secret_token } from "../config.js";

const prisma = new PrismaClient();

//@ admin kalesh

export async function signup(req, res) {
  try {
    console.log("Received signup request:", {
      username: req.body.username,
      email: req.body.email,
      // Not logging password for security
    });

    const { username, password, email } = req.body;

    // Validate request body
    if (!username || !password || !email) {
      console.log("Validation failed - missing fields");
      return res.status(400).json({
        success: false,
        msg: "Username, password, and email are required",
      });
    }

    // Check if admin already exists
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (admin) {
      // Check which field is duplicate
      if (admin.email === email) {
        console.log(`Duplicate email found: ${email}`);
        return res.status(409).json({
          success: false,
          msg: "An account with this email already exists",
        });
      } else {
        console.log(`Duplicate username found: ${username}`);
        return res.status(409).json({
          success: false,
          msg: "Username is already taken",
        });
      }
    }

    // Hash password and create admin
    const hashedPass = await bcrypt.hash(password, 10);

    console.log("Creating new admin account");
    await prisma.admin.create({
      data: {
        username,
        password: hashedPass,
        email,
      },
    });

    console.log("Admin account created successfully");
    return res.status(201).json({
      success: true,
      msg: "Admin account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Check for specific database errors
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        msg: `This ${error.meta.target[0]} is already taken`,
      });
    }

    return res.status(500).json({
      success: false,
      msg: "Failed to create account",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;
  const admin = await prisma.admin.findFirst({
    where: {
      email,
    },
  });
  if (!admin) {
    return res.status(401).json({ success: false, msg: "Invalid credentials" });
  }
  const adminPass = await bcrypt.compare(password, admin.password);
  if (!adminPass) {
    return res.status(401).json({ success: false, msg: "Invalid credentials" });
  }
  const token = jwt.sign({ adminId: admin.id }, admin_secret_token, {
    expiresIn: "1d",
  });
  return res.status(201).json({ success: true, msg: "user logged in ", token });
}

export async function adminProfile(req, res) {
  const adminId = req.adminId;
  const admin = await prisma.admin.findFirst({
    where: {
      id: adminId,
    },
  });
  const { password, ...adminWithoutPassword } = admin;
  res.status(200).json({
    success: true,
    msg: "user data",
    admin: adminWithoutPassword,
    role: "admin",
  });
}

//@ user kalesh

export async function createUser(req, res) {
  const { username, email } = req.body;
  const adminId = req.adminId;

  // Check if user already exists
  const user = await prisma.user.findFirst({
    where: {
      AND: [{ username }, { adminId }],
    },
  });

  if (user) {
    return res
      .status(405)
      .json({ success: false, msg: "User with this username already exists" });
  }

  // Generate random password
  const alphaNum = "abcdefghijklmnopqrstuvwxyz01234567890";
  const length = 10;
  const randomPassword = Array.from({ length }, () => {
    return alphaNum[Math.floor(Math.random() * alphaNum.length)];
  }).join("");

  try {
    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: randomPassword,
        admin: {
          connect: { id: parseInt(adminId) },
        },
      },
    });

    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: email || "No email provided",
        password: randomPassword,
        createdAt:newUser.createdAt
      },
    });
  } catch (e) {
    console.error("Error creating user:", e);
    return res
      .status(500)
      .json({
        success: false,
        msg: "User cannot be created",
        error: e.message,
      });
  }
}

export async function showUser(req, res) {
  const adminId = req.adminId;
  const users = await prisma.user.findMany({
    where: {
      adminId,
    }
  });

  return res.status(200).json({ success: true, msg: "all the users", users });
}

export async function deleteUser(req, res) {
  const userId = parseInt(req.params.userId);
  const adminId = req.adminId;
  if (!userId) {
    return res.status(404).json({ success: false, msg: "No userId found" });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(404).json({ success: false, msg: "No user found" });
  }
  if (user.adminId != adminId) {
    return res.status(404).json({
      success: false,
      msg: "You don't have authority to delete this user",
    });
  }
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  res.status(200).json({ success: true, msg: "user deleted successfully" });
}

//@task kalesh
export async function createTask(req, res) {
  const adminId = req.adminId;
  const { title, description, status, priority, userId, dueDate, level } =
    req.body;
  const task = await prisma.task.findFirst({
    where: {
      title,
      adminId,
    },
  });
  if (task) {
    return res
      .status(403)
      .json({ success: false, msg: "task with this title already exists" });
  }
  try {
    await prisma.task.create({
      data: {
        title,
        description,
        status,
        level,
        adminId,
        priority,
        dueDate: new Date(dueDate),
        userId: parseInt(userId),
      },
    });
    return res
      .status(201)
      .json({ success: true, msg: "task created successfully" });
  } catch (e) {
    return res
      .status(511)
      .json({ success: false, msg: "task cannot be created", e });
  }
}

export async function showTask(req, res) {
  const adminId = req.adminId;
  const tasks = await prisma.task.findMany({
    where: {
      adminId,
    },
  });

  return res.status(200).json({ success: true, msg: "all the users", tasks });
}

export async function deleteTask(req, res) {
  const taskId = parseInt(req.params.taskId);
  const adminId = req.adminId;
  if (!taskId) {
    return res.status(404).json({ success: false, msg: "No taskId found" });
  }
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!task) {
    return res.status(404).json({ success: false, msg: "No task found" });
  }
  if (task.adminId != adminId) {
    return res.status(404).json({
      success: false,
      msg: "You don't have authority to delete this task",
    });
  }
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  res.status(200).json({ success: true, msg: "task deleted successfully" });
}

export async function assignTask(req, res) {
  const { userId, taskId } = req.body;
  const adminId = req.adminId;
  if (!taskId) {
    return res.status(404).json({ success: false, msg: "No taskId found" });
  }
  if (!userId) {
    return res.status(404).json({ success: false, msg: "No userId found" });
  }
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!task) {
    return res.status(404).json({ success: false, msg: "No task found" });
  }
  if (task.adminId != adminId) {
    return res.status(404).json({
      success: false,
      msg: "You don't have authority to assign this task",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(404).json({ success: false, msg: "No user found" });
  }
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      userId,
    },
  });
  res.status(200).json({ success: true, msg: "task assigned successfully" });
}

export const updateTask = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, status, priority, userId, level, taskId } =
    req.body;

  if (!taskId) {
    return res.status(404).json({ success: false, msg: "No taskId found" });
  }
  if (!userId) {
    return res.status(404).json({ success: false, msg: "No userId found" });
  }
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!task) {
    return res.status(404).json({ success: false, msg: "No task found" });
  }
  if (task.adminId != adminId) {
    return res.status(404).json({
      success: false,
      msg: "You don't have authority to assign this task",
    });
  }

  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        level,
        adminId,
        priority,
        userId: parseInt(userId),
      },
    });
    return res
      .status(201)
      .json({ success: true, msg: "task updated successfully" });
  } catch (e) {
    return res
      .status(511)
      .json({ success: false, msg: "task cannot be updated", e });
  }
};

export async function expelTask(req, res) {
  const { taskId } = req.body;
  const adminId = req.adminId;
  if (!taskId) {
    return res.status(404).json({ success: false, msg: "No taskId found" });
  }
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });
  if (!task) {
    return res.status(404).json({ success: false, msg: "No task found" });
  }
  if (task.adminId != adminId) {
    return res.status(404).json({
      success: false,
      msg: "You don't have authority to assign this task",
    });
  }

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      userId: null,
    },
  });
  res
    .status(200)
    .json({ success: true, msg: "user expelled from task successfully" });
}
