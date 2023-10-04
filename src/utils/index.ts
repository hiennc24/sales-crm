export const isGroupKey = (roomKey: string) => {
  return roomKey.indexOf("group-") == 0
}
export const genareRoomSlug = (length: number): string => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
export * from './pick'