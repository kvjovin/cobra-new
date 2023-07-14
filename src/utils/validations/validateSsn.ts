export default function isValidSsn(ssnData: string) {
  const ssnFormat = new RegExp(
    /^([a-zA-Z]\d{2}|\d{3})-(?!00)\d{2}-(?!0{4})\d{4}$/
  );
  return ssnFormat.test(ssnData);
}
