"use server"
import dbConnect from "@/lib/dbConnect";
import UserSchema from "@/models/UserSchema";
import bcrypt from "bcrypt"
import { getToken } from "next-auth/jwt";

export async function createUser({name,email,phone,password,role  }) {

    try {
      await dbConnect();
  
      // Check if username is already taken
      const existingUser = await UserSchema.findOne({email});
  
      // return error if user Exist Already
      if (existingUser) {
        return "User is already Exist.";
      }
      // hash password by bcrypt
      const hashpassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = new UserSchema({
        name: name,
        email: email,
        phone:phone,
        password: hashpassword,
        role: role,
      });
  
      // Save the user
      const savedUser = await user.save();
  
      return { success: true, data: JSON.parse(JSON.stringify(savedUser)) };
    } catch (err) {
      console.error("Error creating user:", err);
      return { success: false, message: err.message };
    }
  }
  
  export const fetchUserByEmail = async (email) => {
    try {
      await dbConnect()
      const user = await UserSchema.findOne({ email }); // Find the user by email
      if (!user) {
        throw new Error('User not found');
      }
      return { success: true, data: JSON.parse(JSON.stringify(user)) };
    } catch (error) {
      console.error('Error fetching user by email:', error.message);
      return { success: false, error: error.message };
    }
  };

  export async function getSessionofuser() {
    const token = await getToken(); // Assuming you're fetching the token with next-auth

    // Fetch user data or other authentication-related info
    const userData = await fetchUserByEmail(token.email); // Fetch user data based on token
    return JSON.parse(JSON.stringify(userData)); // Return the data here
  }



  export async function getAllUsers(page = 1, searchQuery = "") {
    try {
      await dbConnect();
      const usersPerPage = 5; // Number of users per page

      // Build the search filter if a search query is provided
      const searchFilter = searchQuery
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for name
              { email: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for email
            ],
          }
        : {};
      // Count total number of users matching the filter
      const totalUsers = await UserSchema.countDocuments(searchFilter);
  
      if (totalUsers === 0) {
        console.warn("No users found matching the criteria.");
        return { success: true, data: [], totalPages: 0, currentPage: page };
      }
  
      // Calculate total number of pages
      const totalPages = Math.ceil(totalUsers / usersPerPage);
  
      // Fetch users for the specified page, including the `password` field
      const users = await UserSchema
        .find(searchFilter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * usersPerPage) // Skip users for previous pages
        .limit(usersPerPage); // Limit results to the number of users per page
      return {
        success: true,
        data: JSON.parse(JSON.stringify(users)),
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return { success: false, message: "Error fetching users", error: error.message };
    }
  }

  export async function getUserById(userId) {
    try {
      // Ensure the database is connected
      await dbConnect();
  
      // Fetch the user with populated attendance details and return a plain JavaScript object
      const user = await UserSchema
        .findById(userId)
        .populate('attendance')
        .lean(); // Use .lean() to return a plain JS object
  
     
      // Return the user data directly (no need for JSON.parse/JSON.stringify)
      return { success: true, data: JSON.parse(JSON.stringify(user)) };
    } catch (error) {
      console.error('Error fetching user by ID:', {
        error: error.message,
        stack: error.stack,
        userId,
      });
  
      // Return a more detailed error response
      return {
        success: false,
        message: 'Error fetching user by ID',
        error: error.message,
      };
    }
  }
  

  export async function getUserByEmail(email) {
    try {
      await dbConnect();
      const user = await UserSchema.findOne({ email }).populate('attendance'); // Populate attendance details
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      return { success: true, data: JSON.parse(JSON.stringify(user)) };
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return { success: false, message: 'Error fetching user by email', error: error.message };
    }
  }


export async function updateUserRole(userId, newRole) {
  try {
    // Connect to the database
    await dbConnect();

    // Validate new role
    const allowedRoles = ['admin', 'manager', 'associate'];
    if (!allowedRoles.includes(newRole)) {
      return {
        success: false,
        message: `Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`,
      };
    }

    // Update user's role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedUser) {
      return {
        success: false,
        message: "User not found. Unable to update role.",
      };
    }

    return {
      success: true,
      message: "User role updated successfully.",
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      message: "An error occurred while updating the user role.",
      error: error.message,
    };
  }
}


export const deleteUserById = async (userId) => {
  try {

      await dbConnect();
    
    // Delete the customer by ID
    const deleteduser = await UserSchema.findByIdAndDelete(userId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    return { success: false, error: error.message };
  }
};


export async function updateUser({ id, name, email, phone, password, role }) {
  try {
    await dbConnect();

    // Find the user by ID (or email if you prefer)
    const user = await UserSchema.findById(id);
    
    // Return error if user does not exist
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    // Check if email has changed and is already taken
    if (email !== user.email) {
      const existingUser = await UserSchema.findOne({ email });
      if (existingUser) {
        return { success: false, message: 'Email is already taken.' };
      }
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;

    // If password is provided, hash and update it
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    const updatedUser = await user.save();

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };

  } catch (err) {
    console.error('Error updating user:', err);
    return { success: false, message: err.message };
  }
}

export async function getAdminUsers(page = 1, searchQuery = "") {
  try {
    await dbConnect();
    const usersPerPage = 5; // Number of users per page

    // Build the search filter for admins with optional search query
    const searchFilter = {
      role: "admin",
      ...(searchQuery && {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      }),
    };

    const totalUsers = await UserSchema.countDocuments(searchFilter);
    if (totalUsers === 0) {
      return { success: true, data: [], totalPages: 0, currentPage: page };
    }

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const users = await UserSchema
      .find(searchFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * usersPerPage)
      .limit(usersPerPage);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching admin users:", error.message);
    return { success: false, message: "Error fetching admin users", error: error.message };
  }
}


export async function login(credentials) {
  // console.log(credentials.email,"credentials-------------------->");
  const email=credentials.email
  try {
    await dbConnect();
      const user = await UserSchema.findOne({email});
  // console.log(user,"user--------------------");

      if (!user) throw new Error("Invalid username or password");
      
      const isCorrect = await bcrypt.compare(credentials.password,user.password);
  // console.log(user);

      if (!isCorrect) throw new Error("Invalid username or password");

      return JSON.parse(JSON.stringify(user));
  } catch (error) {
      console.error("Login error:", error.message);
      throw new Error("Authentication failed");
  }
}