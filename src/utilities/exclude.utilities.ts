export function exclude<IUser, Key extends keyof IUser>(
  user: IUser,
  keys: Key[]
): Omit<IUser, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}