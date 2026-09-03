import { gql } from "@apollo/client";

const GET_ALL_CONTACTS = gql`
  query GetAllUsers {
    GetAllUsers {
      bio
      email
      country
      id
      token
      profileImg
      user_address
      user_name
      phone_number
    }
  }
`;

const GET_PROFILE_DETAILS_QUERY = gql`
  query GetProfileDetails($getProfileDetailsId: String!) {
    GetProfileDetails(id: $getProfileDetailsId) {
      country
      id
      profileImg
      bio
      user_address
      user_name
      bio
      profileImg
      createdAt
      email
      phone_number
      notes
    }
  }
`;

const GET_ALL_NFTS = gql`
  query getAllNfts($walletAddress: String!) {
    getAllNfts(walletAddress: $walletAddress) {
      _id
      artist_name1
      description
      status
      video
      wallet_address
      token_id
      supply
      name
    }
  }
`;

// dashboard

const GET_USERS_COUNT = gql`
  query GetAllUsersCount {
    GetAllUsersCount {
      registered
      active
      totalVisits
      uniqueVisitors
      lastWeekVisits
      lastMonthVisits
      lastYearVisits
    }
  }
`;

const GET_ALL_NFTS_FOR_ADMIN = gql`
  query GetAllNftsWithoutAddress {
    getAllNftsWithoutAddress {
      _id
      artist_name1
      description
      name
      royalty
      status
      token_id
      video
      wallet_address
      is_blocked
      user_id {
        id
        user_name
        user_address
        profileImg
      }
    }
  }
`;

const ADMIN_LOGIN = gql`
  query AdminLogin($email: String!, $password: String!) {
    AdminLogin(email: $email, password: $password) {
      email
      name
      token
    }
  }
`;
const ADMIN_BY_EMAIL = gql`
  query GetAdminByEmail($email: String!) {
    GetAdminByEmail(email: $email) {
      id
      email
      name
      routes_access
      super_user
      view_only
    }
  }
`;
//notes

const GET_ALL_NOTES_BY_ADMIN_ID = gql`
  query GetAllNoteByAdminId($admin_id: ID!) {
    getAllNoteByAdminId(admin_id: $admin_id) {
      id
      title
      description
      admin_id
      is_public
    }
  }
`;
const GET_ALL_ADMIN_NOTES = gql`
  query GetAllAdminNotes {
    getAllAdminNotes {
      id
      title
      description
      admin_id
      is_public
    }
  }
`;

const GET_ALL_NOTIFICATIONS = gql`
  query allNotifications {
    allNotifications {
      user_name
    }
  }
`;

const GET_NEW_REGISTRATION = gql`
  query newRegistration {
    newRegistration {
      count
    }
  }
`;

const GET_TOP_NFTS = gql`
  query GetTopNfts {
    GetTopNfts {
      id
      duration
      nft_link
      serial_number
      nft_id
    }
  }
`;

export {
  GET_ALL_CONTACTS,
  GET_PROFILE_DETAILS_QUERY,
  GET_ALL_NFTS,
  GET_USERS_COUNT,
  GET_ALL_NFTS_FOR_ADMIN,
  ADMIN_LOGIN,
  ADMIN_BY_EMAIL,
  GET_ALL_NOTES_BY_ADMIN_ID,
  GET_ALL_ADMIN_NOTES,
  GET_ALL_NOTIFICATIONS,
  GET_NEW_REGISTRATION,
  GET_TOP_NFTS,
};
// count={totalRegistered?.GetAllUsersCount?.registered}
