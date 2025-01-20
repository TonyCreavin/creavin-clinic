'use server';

import User from '@/models/user-models';
import { currentUser } from '@clerk/nextjs/server';
import { IUser } from '@/interfaces';
import { revalidatePath } from 'next/cache';

export const createUser = async () => {
  try {
    const user = await currentUser();
    const mongoDbUserObj = {
      name: `${user?.firstName} ${user?.lastName}`,
      clerkUserId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
      profilePicture: user?.imageUrl,
      isApproved: false,
      isSuperAdmin: false,
    };
    const newUser = new User(mongoDbUserObj);
    await newUser.save();
    return {
      success: true,
      message: 'User created successfully',
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    console.log('🔥Error creating user', error);
    return {
      success: false,
      message: 'Error creating user',
    };
  }
};
export const getUser = async () => {
  try {
    const user = await currentUser();

    // Check if user exist and return user data
    const userObj = await User.findOne({ clerkUserId: user?.id });
    if (userObj) {
      return {
        success: true,
        message: 'User found',
        data: JSON.parse(JSON.stringify(userObj)),
      };
    }
    // If user does not exist, create a new user
    const newUser = await createUser();
    if (newUser.success) {
      return {
        success: true,
        message: 'User created successfully',
        data: newUser.data,
      };
    }
  } catch (error: any) {
    console.log('🔥Error getting user', error);
    return {
      success: false,
      message: 'Error getting user',
    };
  }
};
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const updateUser = async ({
  userId,
  updatedData,
}: {
  userId: string;
  updatedData: Partial<IUser>;
}) => {
  try {
    await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    revalidatePath('/admin/users');
    return {
      success: true,
      message: 'User successfully updated',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
