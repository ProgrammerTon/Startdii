import base10ToBase36 from './guilds.base10ToBase36';

const genInviteCode = () => {
  const now = new Date();
  const timestamp = now.getTime().toString();

  const substrings = [];
  const substringLength = 3;
  for (
    let i = 1;
    i < timestamp.length - substringLength;
    i += substringLength
  ) {
    substrings.push(timestamp.slice(i, i + substringLength));
  }

  let inviteCode = '';
  for (const substring of substrings) {
    inviteCode += base10ToBase36(substring);
  }

  return inviteCode;
};

export default genInviteCode;
