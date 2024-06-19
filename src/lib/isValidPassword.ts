export async function isValidPassword(
  password: string,
  hashedPassword: string
) {
  // console.log(await password, hashedPassword(password));
  // return (await hashPassword(password)) === hashedPassword;
  const hashedEnteredPassword = await hashPassword(password);
  // console.log(hashedEnteredPassword, hashedPassword);
  return hashedEnteredPassword === hashedPassword;
}

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
}

// @note bcrypt

// import bcrypt from "bcrypt";

// export async function isValidPassword(password: string, hashedPassword: string) {
//   return await bcrypt.compare(password, hashedPassword);
// }

// export async function hashPassword(password: string) {
//   const saltRounds = 10;
//   return await bcrypt.hash(password, saltRounds);
// }
