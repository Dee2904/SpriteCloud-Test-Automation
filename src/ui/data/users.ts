export const users = {
  standardUser: {
    username: process.env.SAUCE_USERNAME!,
    password: process.env.SAUCE_PASSWORD!,
  },

  lockedOutUser: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASSWORD!
  },
}
