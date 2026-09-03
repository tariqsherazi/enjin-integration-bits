import { gql } from "@apollo/client";

const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail(
    $to: String!
    $from: String!
    $subject: String!
    $text: String!
  ) {
    SendEmail(to: $to, from: $from, subject: $subject, text: $text) {
      message
      status
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteProfile($values: DeleteInput) {
    DeleteProfile(values: $values) {
      is_deleted
    }
  }
`;

const ADD_NOTES_MUTATION = gql`
  mutation AddNotes($values: AddNotesInput) {
    AddNotes(values: $values) {
      description
      title
    }
  }
`;

const UPDATE_NFT_STATUS = gql`
  mutation UpdateNftStatus($id: String!) {
    UpdateNftStatus(id: $id) {
      is_blocked
    }
  }
`;

const CREATE_SUB_ADMIN = gql`
  mutation CreateSubAdmin($values: CreateAdminInput!) {
    CreateSubAdmin(values: $values) {
      email
    }
  }
`;

const UPDATE_ADMIN_PASSWORD = gql`
  mutation UpdateAdminPassword(
    $id: String!
    $password: String!
    $new_password: String!
  ) {
    UpdateAdminPassword(
      id: $id
      password: $password
      new_password: $new_password
    ) {
      id
      email
    }
  }
`;

const UPDATE_ADMIN_NAME = gql`
  mutation UpdateAdminName($id: String!, $name: String!) {
    UpdateAdminName(id: $id, name: $name) {
      id
      email
      name
      super_user
      routes_access
    }
  }
`;

const DELETE_NOTE_BY_ID = gql`
  mutation deleteNoteById($id: String!) {
    deleteNoteById(id: $id) {
      id
      title
      description
      admin_id
      is_public
    }
  }
`;

const CREATE_ADMIN_NOTES = gql`
  mutation createAdminNotes(
    $title: String!
    $description: String!
    $admin_id: String!
    $is_public: Boolean!
  ) {
    createAdminNotes(
      title: $title
      description: $description
      admin_id: $admin_id
      is_public: $is_public
    ) {
      id
      title
      description
      admin_id
      is_public
    }
  }
`;

const CREATE_TOP_NFT = gql`
  mutation CreateTopNft($nft_id: String!, $duration: Int!, $nft_link: String!) {
    CreateTopNft(nft_id: $nft_id, duration: $duration, nft_link: $nft_link) {
      id
      nft_id
      duration
      nft_link
      serial_number
    }
  }
`;

const UPDATE_TOP_NFT_LIST = gql`
  mutation UpdateSerialTopNft($nftArray: [topNftsTypeInput]) {
    UpdateSerialTopNft(nftArray: $nftArray) {
      id
      nft_id
      duration
      nft_link
      serial_number
    }
  }
`;

const EDIT_TOP_NFT = gql`
  mutation EditTopNft(
    $id: String
    $nft_id: String!
    $duration: Int!
    $nft_link: String!
  ) {
    EditTopNft(
      id: $id
      nft_id: $nft_id
      duration: $duration
      nft_link: $nft_link
    ) {
      id
      nft_id
      duration
      nft_link
      serial_number
    }
  }
`;

const DELETE_TOP_NFT = gql`
  mutation DeleteTopNft($id: String!) {
    DeleteTopNft(id: $id) {
      id
      nft_id
      duration
      nft_link
      serial_number
    }
  }
`;

export {
  SEND_EMAIL_MUTATION,
  DELETE_MUTATION,
  ADD_NOTES_MUTATION,
  UPDATE_NFT_STATUS,
  CREATE_SUB_ADMIN,
  UPDATE_ADMIN_PASSWORD,
  UPDATE_ADMIN_NAME,
  DELETE_NOTE_BY_ID,
  CREATE_ADMIN_NOTES,
  CREATE_TOP_NFT,
  UPDATE_TOP_NFT_LIST,
  EDIT_TOP_NFT,
  DELETE_TOP_NFT,
};
