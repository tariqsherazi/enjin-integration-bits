const AdminNotes = require("../schema/adminNotes");

const getAllAdminNotes = async () => {
  try {
    const adminNotes = await AdminNotes.find({ is_public: true }).populate(
      "admin_id",
      "name"
    );
    return adminNotes;
  } catch (error) {
    // Handle error
    throw new Error("Failed to fetch admin notes");
  }
};

const getAllNoteByAdminId = async (adminId) => {
  try {
    const adminNotes = await AdminNotes.find({ admin_id: adminId }).populate(
      "admin_id",
      "name"
    );
    return adminNotes;
  } catch (error) {
    // Handle error
    throw new Error("Failed to fetch admin notes");
  }
};

const deleteNoteById = async (noteId) => {
  try {
    const deletedNote = await AdminNotes.findByIdAndDelete(noteId);
    return deletedNote;
  } catch (error) {
    // Handle error
    throw new Error("Failed to delete the admin note");
  }
};

const createAdminNotes = async (noteData) => {
  try {
    const newNote = await AdminNotes.create(noteData);
    return newNote;
  } catch (error) {
    console.log("errorerror", error);
    // Handle error
    throw new Error("Failed to create the admin note");
  }
};

const updateAdminNotesById = async (noteId, updateData) => {
  try {
    const updatedNote = await AdminNotes.findByIdAndUpdate(noteId, updateData, {
      new: true,
    });
    return updatedNote;
  } catch (error) {
    // Handle error
    throw new Error("Failed to update the admin note");
  }
};

module.exports = {
  updateAdminNotesById,
  createAdminNotes,
  deleteNoteById,
  getAllNoteByAdminId,
  getAllAdminNotes,
};
