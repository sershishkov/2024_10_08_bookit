'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

export default async function createRoom(previousState, formData) {
  //Get database instance
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: 'You must be logged in to create a room',
      };
    }

    //Uploading image
    let imageID;
    const image = formData.get('image');

    if (image && image.size > 0 && image.name !== 'undefined') {
      try {
        //Upload
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUKET_ROOMS,
          ID.unique(),
          image
        );
        imageID = response.$id;
      } catch (error) {
        console.log(`Error uploading image:`, error);
        return {
          error: `Error uploading image!`,
        };
      }
    } else {
      console.log('No image file provided or file is invalid');
    }

    //Create room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get('name'),
        description: formData.get('description'),
        sqft: formData.get('sqft'),
        capacity: formData.get('capacity'),
        price_per_hour: formData.get('price_per_hour'),
        address: formData.get('address'),
        location: formData.get('location'),
        availability: formData.get('availability'),
        amenities: formData.get('amenities'),
        image: imageID,
      }
    );
    revalidatePath('/', 'layout');
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response.message || 'An unexpected error has occured';
    return {
      error: errorMessage,
    };
  }
}
