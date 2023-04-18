export function exclude<IUser, Key extends keyof IUser>(
  user: IUser,
  keys: Key[]
): Omit<IUser, Key> {
  for (const key of keys) {
    delete user[key]
  }
  return user
}