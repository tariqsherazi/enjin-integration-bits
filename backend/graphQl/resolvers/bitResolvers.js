const { emptyFieldValidation } = require("../../validators/customValidators");

const {
  createNFt,
  getNFtsModal,
  mintNft,
  getAllNftsModal,
  getAllNftsForAdmin,
  updateNftStatus,
  getNFtsDetails,
  getTopViewNfts,
} = require("../../model/nftModel");

const jwt = require("jsonwebtoken");

const {
  createUser,
  loginUser,
  getPlayer,
  logoutUser,
  updateUserProfile,
  passwordUpdate,
  emailUpdate,
  addContact,
  sendEmail,
  getProfile,
  getAllUsers,
  deleteProfile,
  addNotesUser,
  getUsersCount,
  allNotifications,
  newRegistration,
} = require("../../model/userModel");
const { environment } = require("../../environment");
const { validateToken } = require("../../validators/tokenValidator");
const { VisitModal } = require("../../schema/visitsSchema");
const {
  createAdminAccount,
  adminLogin,
  getAdminByEmail,
  updateAdminPassword,
  updateAdminName,
} = require("../../model/adminModel");
const {
  updateAdminNotesById,
  deleteNoteById,
  createAdminNotes,
  getAllNoteByAdminId,
  getAllAdminNotes,
} = require("../../model/adminNotes");
const {
  createTopNft,
  getTopNfts,
  updateSerialTopNft,
  editTopNft,
  deleteTopNft,
} = require("../../model/topNftModel");

const bitResolver = {
  query: {
    WebsiteVisit: async (parent) => {
      const totalVisits = await VisitModal.countDocuments();
      const uniqueVisitors = await VisitModal.distinct(
        "ip_adress"
      ).countDocuments();
      return { totalVisits, uniqueVisitors };
    },

    GetProfile: async (parent, args, { ctx }) => {
      try {
        const fields = ["token"];
        const res = await emptyFieldValidation(args, fields);
        if (res === "success") {
          const decoded = jwt.verify(args.token, environment.MY_SECRET);
          const result = await getProfile(decoded.id);
          return result;
        }
      } catch (error) {
        return error;
      }
    },
    GetProfileDetails: async (parent, args, { ctx }) => {
      try {
        const fields = ["id"];
        const res = await emptyFieldValidation(args, fields);
        if (res === "success") {
          const result = await getProfile(args.id);

          return result;
        }
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    LoginUser: async (parent, args, { ctx }) => {
      try {
        const fields = ["email", "password"];
        const res = await emptyFieldValidation(args, fields);
        if (res === "success") {
          const result = await loginUser(args);
          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },
    AdminLogin: async (parent, args, { ctx }) => {
      try {
        console.log("args", args);
        // const fields = ["email", "password"];
        // const res = await emptyFieldValidation(args, fields);
        // if (res === "success") {
        const result = await adminLogin(args);
        if (result?.error) throw result?.error;

        return result;
        // }
      } catch (error) {
        return error;
      }
    },
    GetAdminByEmail: async (parent, args, { ctx }) => {
      try {
        console.log("args", args);
        const result = await getAdminByEmail(args);
        if (result?.error) throw result?.error;

        return result;
        // }
      } catch (error) {
        return error;
      }
    },

    GetPlayer: async (parent, args, { ctx }) => {
      const fields = ["id"];
      const res = await emptyFieldValidation(args, fields);
      if (res === "success") {
        const result = await getPlayer(args);
        if (result?.error) throw result?.error;

        return result;
      }
    },
    GetAllUsers: async (parent) => {
      const result = await getAllUsers();
      if (result?.error) throw result?.error;
      return result;
    },

    allNotifications: async (parent) => {
      const result = await allNotifications();
      if (result?.error) throw result?.error;
      return result;
    },

    GetAllUsersCount: async (parent) => {
      const result = await getUsersCount();
      if (result?.error) throw result?.error;

      const totalVisits = await VisitModal.countDocuments();
      const uniqueVisitors = await VisitModal.distinct(
        "ip_adress"
      ).countDocuments();

      const currentDate = new Date();
      const lastWeekDate = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      ); // 7 days ago
      const lastMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      ); // 1 month ago
      const lastYearDate = new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      ); // 1 year ago

      const lastWeekVisits = await VisitModal.countDocuments({
        timestamp: { $gte: lastWeekDate },
      });

      const lastMonthVisits = await VisitModal.countDocuments({
        timestamp: { $gte: lastMonthDate },
      });

      const lastYearVisits = await VisitModal.countDocuments({
        timestamp: { $gte: lastYearDate },
      });

      const obj = {
        registered: result?.registeredCount,
        active: result?.activeUsersCount,
        totalVisits: totalVisits || 0,
        uniqueVisitors: uniqueVisitors || 0,
        lastWeekVisits: lastWeekVisits || 0,
        lastMonthVisits: lastMonthVisits || 0,
        lastYearVisits: lastYearVisits || 0,
      };
      console.log("result", obj);
      return obj;
    },

    newRegistration: async (parent) => {
      const result = await newRegistration();
      const obj = {
        count: result,
      };
      console.log("result", result);
      return obj;
    },

    getAllNfts: async (parent, args, { ctx }) => {
      try {
        const getNFt = await getNFtsModal(args);
        return getNFt;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    getNftDetails: async (parent, args, { ctx }) => {
      try {
        console.log(args, "ayaaa");
        const getNFt = await getNFtsDetails(args.id, args.user_id);
        return getNFt;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    getTopViewNfts: async (parent, args, { ctx }) => {
      try {
        const getNFt = await getTopViewNfts();
        return getNFt;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    getAllNftsWithoutAddress: async (parent, args, { ctx }) => {
      try {
        const getNFt = await getAllNftsModal();
        return getNFt;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },
    GetAllNftsForAdmin: async () => {
      try {
        const getNFt = await getAllNftsForAdmin();
        return getNFt;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    getAllAdminNotes: async () => {
      try {
        const adminNotes = await getAllAdminNotes();
        return adminNotes;
      } catch (error) {
        console.log("error", error);
        throw new Error("Failed to fetch admin notes");
      }
    },
    getAllNoteByAdminId: async (parent, args) => {
      try {
        const { admin_id } = args;
        const adminNotes = await getAllNoteByAdminId(admin_id);
        return adminNotes;
      } catch (error) {
        throw new Error("Failed to fetch admin notes");
      }
    },

    GetTopNfts: async (parent, args) => {
      try {
        const topNft = await getTopNfts();
        return topNft;
      } catch (error) {
        throw new Error("Failed to fetch top nfs ");
      }
    },
  },

  mutations: {
    createAdminNotes: async (parent, args) => {
      try {
        const { title, description, admin_id, is_public } = args;
        const newNote = await createAdminNotes({
          title,
          description,
          admin_id,
          is_public,
        });
        return newNote;
      } catch (error) {
        throw new Error("Failed to create the admin note");
      }
    },

    deleteNoteById: async (parent, args) => {
      try {
        const { id } = args;
        const deletedNote = await deleteNoteById(id);
        return deletedNote;
      } catch (error) {
        throw new Error("Failed to delete the admin note");
      }
    },
    // updateAdminNotesById: async (parent, args) => {
    //   try {
    //     const { id, title, description, is_public } = args;
    //     const updateData = { title, description, is_public };
    //     const updatedNote = await updateAdminNotesById(id, updateData);
    //     return updatedNote;
    //   } catch (error) {
    //     throw new Error('Failed to update the admin note');
    //   }
    // },

    RecordVisit: async (_, { ip_adress }) => {
      const visit = new VisitModal({ ip_adress });
      await visit.save();
      return visit;
    },
    MintAsset: async (parent, args, { ctx }) => {
      try {
        const result = await mintNft(args);

        if (result?.error) throw result?.error;

        return result;
      } catch (error) {}
    },

    UpdateNftStatus: async (parent, args, { ctx }) => {
      try {
        const result = await updateNftStatus(args);

        if (result?.error) throw result?.error;

        return result;
      } catch (error) {}
    },

    CreateNft: async (parent, args) => {
      try {
        const fields = [
          "name",
          "artist_name1",
          "video",
          "description",
          "metauri",
          "token_id",
          "chainId",
          "supply",
          "wallet_address",
          "royalty",
          "status",
          "user_id",
        ];
        console.log(args, "args");
        const res = await emptyFieldValidation(args, fields);

        if (res === "success") {
          const result = await createNFt(args);

          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },

    CreateUser: async (parent, args) => {
      try {
        const fields = [
          "full_name",
          "user_name",
          "password",
          "phone_number",
          "user_address",
        ];
        const res = await emptyFieldValidation(args, fields);
        console.log("res", res);
        if (res === "success") {
          const result = await createUser(args);
          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },

    UpdateAdminName: async (parent, args) => {
      try {
        console.log("argsargsargs", args);
        const result = await updateAdminName(args);
        if (result?.error) throw result?.error;

        return result;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    CreateSubAdmin: async (parent, args) => {
      try {
        const result = await createAdminAccount(args);
        if (result?.error) throw result?.error;

        return result;
      } catch (error) {
        return error;
      }
    },

    AddContact: async (parent, args) => {
      try {
        console.log("fields", args);

        const fields = ["full_name", "email", "phone_number", "message"];
        console.log("fields", fields);

        const res = await emptyFieldValidation(args, fields);
        console.log("res", res);
        if (res === "success") {
          const result = await addContact(args);
          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },

    UpdateProfile: async (parent, args, { ctx }) => {
      try {
        const res = await validateToken(ctx);
        let result = "";
        if (res === "success") {
          result = await updateUserProfile(args);
          if (result?.error) throw result?.error;
        }

        return result;
      } catch (error) {
        return error;
      }
    },

    Update_password: async (parent, args, { ctx }) => {
      const res = await validateToken(ctx);

      if (res === "success") {
        const res = await emptyFieldValidation(args, [
          "password",
          "new_password",
        ]);

        if (res === "success") {
          const theToken = ctx.request.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(theToken, environment.MY_SECRET);
          const result = await passwordUpdate(
            decoded.id,
            args.password,
            args.new_password
          );

          if (result.modifiedCount === 1)
            return { updatedData: JSON.stringify(args), updated: true };
          else return { updatedData: JSON.stringify(args), updated: false };
        }
      }
    },

    UpdateAdminPassword: async (parent, args, { ctx }) => {
      const res = await emptyFieldValidation(args, [
        "password",
        "new_password",
      ]);
      console.log(
        "ss",

        args.id,
        args.password,
        args.new_password,

        args
      );
      if (res === "success") {
        const result = await updateAdminPassword(
          args.id,
          args.password,
          args.new_password
        );
        console.log("result", result);
        return result[0];
      }
    },

    UpdateEmail: async (parent, args, { ctx }) => {
      const res = await validateToken(ctx);

      if (res === "success") {
        const res = await emptyFieldValidation(args, ["password", "newEmail"]);

        if (res === "success") {
          const theToken = ctx.request.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(theToken, environment.MY_SECRET);
          const result = await emailUpdate(
            decoded.id,
            args.password,
            args.newEmail
          );

          if (result.modifiedCount === 1)
            return { updatedData: JSON.stringify(args), updated: true };
          else return { updatedData: JSON.stringify(args), updated: false };
        }
      }
    },

    DeleteProfile: async (parent, args, { ctx }) => {
      const result = await deleteProfile(args.values.id);

      if (result.modifiedCount === 1) return { is_deleted: true };
      else return { is_deleted: false };
    },

    LogoutUser: async (parent, args) => {
      try {
        const fields = ["address"];
        const res = await emptyFieldValidation(args, fields);
        if (res === "success") {
          const result = await logoutUser(args);
          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },
    SendEmail: async (parent, args) => {
      try {
        const fields = ["to", "from", "subject", "text"];
        const res = await emptyFieldValidation(args, fields);
        if (res === "success") {
          const result = await sendEmail(args);
          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },

    AddNotes: async (parent, args) => {
      try {
        const fields = ["title", "description"];
        const res = await emptyFieldValidation(args.values, fields);
        if (res === "success") {
          const result = await addNotesUser(args);
          if (result?.error) throw result?.error;

          return result;
        }
      } catch (error) {
        return error;
      }
    },

    CreateTopNft: async (parent, args) => {
      try {
        const result = await createTopNft(args);
        if (result?.error) throw result?.error;
        return result;
      } catch (error) {
        return error;
      }
    },
    UpdateSerialTopNft: async (parent, args) => {
      try {
        const result = await updateSerialTopNft(args);

        if (result?.error) throw result?.error;
        return result;
      } catch (error) {
        return error;
      }
    },

    EditTopNft: async (parent, args) => {
      try {
        const result = await editTopNft(args);
        if (result?.error) throw result?.error;
        return result;
      } catch (error) {
        return error;
      }
    },

    DeleteTopNft: async (parent, args) => {
      try {
        const result = await deleteTopNft(args);
        if (result?.error) throw result?.error;
        return result;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = { bitResolver };
