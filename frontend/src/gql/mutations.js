import { gql } from "@apollo/client";

const CREATE_NFT = gql`
  mutation CreateNft(
    $name: String!
    $artistName1: String!
    $video: String!
    $metauri: String!
    $description: String!
    $tokenId: String!
    $chainId: Int!
    $supply: Int!
    $walletAddress: String!
    $status: Boolean!
    $royalty: Int
    $user_id: String!
  ) {
    CreateNft(
      name: $name
      artist_name1: $artistName1
      video: $video
      metauri: $metauri
      description: $description
      token_id: $tokenId
      chainId: $chainId
      supply: $supply
      wallet_address: $walletAddress
      status: $status
      royalty: $royalty
      user_id: $user_id
    ) {
      _id
      description
      artist_name1
      name
      metauri
      supply
      token_id
      chainId
      status
      video
      royalty
    }
  }
`;

const CREATE_USER = gql`
  mutation Mutation(
    $userName: String!
    $email: String!
    $fullName: String!
    $password: String!
    $phoneNumber: String!
    $userAddress: String!
  ) {
    CreateUser(
      user_name: $userName
      email: $email
      full_name: $fullName
      password: $password
      phone_number: $phoneNumber
      user_address: $userAddress
    ) {
      email
      full_name
      password
      phone_number
      user_name
      user_address
      token
    }
  }
`;

const MINT_ASSET = gql`
  mutation MintAsset(
    $assetId: String!
    $mints: [MintInput!]!
    $wallet: EthAddress!
    $send: Boolean!
    $test: Boolean!
  ) {
    MintAsset(
      assetId: $assetId
      mints: $mints
      wallet: $wallet
      send: $send
      test: $test
    ) {
      id
      transactionId
      state
    }
  }
`;
const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFile($file: Upload!) {
    UploadFile(file: $file) {
      filename
    }
  }
`;

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($password: String!, $newPassword: String!) {
    Update_password(password: $password, new_password: $newPassword) {
      updated
      updatedData
    }
  }
`;

const UPDATE_EMAIL = gql`
  mutation UpdateEmail($password: String!, $newEmail: String!) {
    UpdateEmail(password: $password, newEmail: $newEmail) {
      updated
      updatedData
    }
  }
`;

const ADD_CONTACT = gql`
  mutation AddContact(
    $fullName: String!
    $email: String!
    $phoneNumber: String!
    $message: String!
  ) {
    AddContact(
      full_name: $fullName
      email: $email
      phone_number: $phoneNumber
      message: $message
    ) {
      full_name
      email
      phone_number
      message
    }
  }
`;

const MINT_ASSET_MUTATION = gql`
  mutation MintAsset($walletAddress: String!) {
    MintAsset(walletAddress: $walletAddress) {
      status
    }
  }
`;

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

const RECORD_VISIT_MUTATION = gql`
  mutation RecordVisit($ip_adress: String!) {
    RecordVisit(ip_adress: $ip_adress) {
      id
      ip_adress
      timestamp
    }
  }
`;

export {
  CREATE_NFT,
  CREATE_USER,
  UPLOAD_FILE_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  UPDATE_EMAIL,
  ADD_CONTACT,
  MINT_ASSET_MUTATION,
  MINT_ASSET,
  SEND_EMAIL_MUTATION,
  RECORD_VISIT_MUTATION
};
