import linkifyIt from "linkify-it";

export const linkify = linkifyIt();

const IS_VALID_USER_HANDLE_REGEX = /^@[A-Za-z0-9_]{1,15}$/;

const isValidUserHandle = (handle: string) => {
  return IS_VALID_USER_HANDLE_REGEX.test(handle);
};

const isWhitespaceCharacter = (str: string, index: number) => {
  return /\s/.test(str[index]);
};

const validateUserHandle = (text: string, pos: number) => {
  const slice = text.slice(pos - 1);
  const handle = slice.split(/\s/)[0] ?? slice;

  if (!isValidUserHandle(handle)) return false;
  if (pos >= 2 && !isWhitespaceCharacter(text, pos - 2)) {
    return false;
  }
  return handle.length - 1;
};

linkify.add("@", {
  validate: validateUserHandle,
  normalize: (match) => {
    match.url = "tifapp://user/" + match.url.replace(/^@/, "");
  },
});
