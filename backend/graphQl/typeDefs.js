const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Object
  scalar Date
  scalar DateTime
  scalar BigInt
  scalar EthAddress
  scalar Upload

  type userData {
    id: ID!
    name: String
  }

  type userCount {
    registered: Int!
    active: Int!
    totalVisits: Int!
    uniqueVisitors: Int!
    lastWeekVisits: Int!
    lastMonthVisits: Int!
    lastYearVisits: Int!
  }

  type AdminAccount {
    id: String
    name: String
    email: String
    password: String
    super_user: Boolean
    view_only: Boolean
    routes_access: [String]
  }

  type AdminAccountInfo {
    name: String!
    email: String!
    token: String
  }

  type emailType {
    status: String
    message: String
  }

  type tokenData {
    accessToken: String
    expiresIn: Int
  }

  type getPlayer {
    id: String
    wallet: Object
    linkingInfo: Object
    createdAt: Date
    updatedAt: Date
    accessToken: String!
    expiresIn: Int!
  }

  type getUser {
    id: ID
    token: String
    full_name: String
    user_address: String
    country: String
    bio: String
    profileImg: String
  }

  type profileDetails {
    id: ID
    token: String
    user_name: String
    user_address: String
    country: String
    full_name: String
    bio: String
    profileImg: String
    createdAt: Date
    email: String
    phone_number: String
    notes: Object
  }

  type getAllUser {
    id: ID
    email: String
    token: String
    user_name: String
    user_address: String
    country: String
    bio: String
    profileImg: String
    phone_number: Int
  }

  type Updated {
    updated: Boolean
    updatedData: String
  }

  input CreateAdminInput {
    name: String!
    email: String!
    routes: [String]
    view_only: Boolean
  }

  input DeleteInput {
    id: String!
  }

  input AddNotesInput {
    id: String!
    title: String!
    description: String!
    noteImg: String
  }

  type userDeleted {
    is_deleted: Boolean!
  }

  type token {
    accessToken: String
  }

  type Auth {
    accessToken: String
    expiresIn: Int
  }

  type MinNft {
    id: ID
    name: String
    price: String
    description: String
  }

  input playerName {
    userName: String
  }

  type notesType {
    title: String
    description: String
  }

  type asset {
    value: String
    id: Int
    transactionId: String
    title: String
    state: Boolean
    project: Object
  }

  type Transaction {
    status: Boolean
  }

  type Wallet {
    ethAddress: String
    enjAllowance: Float
    enjBalance: Float
    ethBalance: Float
    transactions: [Transaction]
  }

  type GetAllAssets {
    id: String!
    name: String!
    wallet: Wallet!
  }

  input MintInput {
    to: EthAddress!
    value: BigInt!
  }

  type AllListing {
    data: Object
  }

  type WebsiteStats {
    totalVisits: Int!
    uniqueVisitors: Int!
  }

  type Visit {
    id: ID!
    ip_adress: String!
    timestamp: String!
  }

  type mintingType {
    _id: Object
    name: String!
    artist_name1: String!
    video: String!
    description: String!
    metauri: String!
    token_id: String!
    chainId: Int
    supply: Int
    wallet_address: String!
    status: Boolean!
    royalty: String
    user_id: getAllUser
    is_blocked: Boolean
  }

  input CreateUserInput {
    user_name: String!
    full_name: String!
    password: String!
    phone_number: String!
    token: String!
  }

  type CreateUserType {
    user_name: String!
    email: String!
    full_name: String!
    password: String!
    phone_number: String!
    user_address: String!
    country: String
    bio: String
    profileImg: String
    token: String!
  }

  type topNftType {
    id: ID
    nft_id: String
    duration: Int
    nft_link: String
    serial_number: Int
  }
  type topNftsType {
    id: ID
    nft_id: Object
    duration: Int
    nft_link: String
    serial_number: Int
  }

  input topNftsTypeInput {
    id: ID
    serial_number: Int
  }

  type contactType {
    id: ID
    full_name: String!
    email: String!
    phone_number: Int!
  }

  type AdminNote {
    id: ID!
    title: String!
    description: String!
    admin_id: Object
    is_public: Boolean!
  }
  type newRegistrationCount {
    count: Int!
  }

  type getAllUsers {
    id: ID
    email: String
    token: String
    user_name: String
    user_address: String
    country: String
    bio: String
    profileImg: String
    phone_number: Int
  }
  type nftDetails {
    _id: ID
    artist_name1: String
    video: String
    description: String
    metauri: String
    token_id: String
    chainId: Int
    supply: Int
    wallet_address: String
    status: Boolean
    royalty: String
    user_id: getAllUsers
    is_blocked: Boolean
    name: String
    view_count: Int
  }

  type Query {
    LoginUser(email: String!, password: String!): getUser
    GetProfile(token: String!): getUser
    GetProfileDetails(id: String!): profileDetails
    newRegistration: newRegistrationCount
    GetAllUsers: [getAllUser]
    allNotifications: [getAllUser]
    GetPlayer(id: String!): getPlayer
    getMintingAssets: [MinNft]
    getAllNfts(walletAddress: String!): [mintingType]
    getAllNftsWithoutAddress: [mintingType]
    GetAllNftsForAdmin: [mintingType]
    AdminLogin(email: String!, password: String!): AdminAccountInfo
    GetAdminByEmail(email: String!): AdminAccount
    getAllPlayers: [getPlayer]
    createAuthPlayer(id: String!): tokenData
    GetAllUsersCount: userCount
    WebsiteVisit: WebsiteStats!
    getAllAdminNotes: [AdminNote!]!
    getAllNoteByAdminId(admin_id: ID!): [AdminNote!]!
    GetTopNfts: [topNftsType]
    getNftDetails(id: ID, user_id: String): nftDetails
    getTopViewNfts: [nftDetails]
  }

  type Mutation {
    deleteNoteById(id: String!): AdminNote
    createAdminNotes(
      title: String!
      description: String!
      admin_id: String!
      is_public: Boolean
    ): AdminNote
    RecordVisit(ip_adress: String!): Visit!
    UpdateNftStatus(id: String!): mintingType
    CreatePlayer(id: String!): token
    CreateNft(
      name: String!
      artist_name1: String!
      video: String!
      description: String!
      metauri: String!
      token_id: String!
      chainId: Int!
      supply: Int!
      wallet_address: String!
      status: Boolean
      royalty: Int
      user_id: String!
    ): mintingType
    CreateSubAdmin(values: CreateAdminInput!): AdminAccount!
    UpdateAdminName(id: String!, name: String!): AdminAccount!
    MintAsset(walletAddress: String!): Transaction
    DeletePlayer(id: String!): Boolean
    CreateUser(
      user_name: String!
      email: String!
      full_name: String!
      password: String!
      phone_number: String!
      user_address: String!
    ): CreateUserType
    UpdateProfile(
      id: String!
      full_name: String
      user_address: String
      country: String
      bio: String
      profileImg: String
      token: String
    ): CreateUserType!
    Update_password(password: String!, new_password: String!): Updated
    UpdateAdminPassword(
      id: String!
      password: String!
      new_password: String!
    ): AdminAccount
    UpdateEmail(password: String!, newEmail: String!): Updated
    LogoutUser(address: EthAddress!): String!
    DeleteProfile(values: DeleteInput): userDeleted!
    AddContact(
      full_name: String!
      email: String!
      phone_number: String!
      message: String!
    ): contactType
    SendEmail(
      to: String!
      from: String!
      subject: String!
      text: String!
    ): emailType
    AddNotes(values: AddNotesInput): notesType

    CreateTopNft(nft_id: String, duration: Int, nft_link: String): topNftType
    EditTopNft(
      id: String
      nft_id: String
      duration: Int
      nft_link: String
    ): topNftType
    UpdateSerialTopNft(nftArray: [topNftsTypeInput]): topNftType
    DeleteTopNft(id: String): topNftType
  }
`;

module.exports = { typeDefs };
