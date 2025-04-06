import dbConnect from "@/lib/dbConnect";
import UserSchema from "@/models/UserSchema";
import { createUser } from "@/utils/User";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await dbConnect();

    // Parse incoming request data
    const { name,email,phone,password } = await req.json();

    // Check if user already exists with email or phone
    const exists = await UserSchema.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return NextResponse.json(
        { message: "User with this email or phone already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    
    // Call the utility function to create a new user
    const newUser = await createUser({ name, email:"R@gmail.com", phone, password, role:"admin" });

    return NextResponse.json(
      { message: "User Registered Successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while registering the user", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}