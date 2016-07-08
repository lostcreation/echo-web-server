const charMap = // [[regexp of character to match, entity to replace with]]
[ [/&/g, '&amp;'],
  [/>/g, '&gt;'],
  [/</g, '&lt;'],
  [/"/g, '&quot;'],
  [/'/g, '&apos;'],
  [/`/g, '&grave;']
]

/**
 * Properly escapes HTML tags and special characters to prevent mischief.
 * @param {string} str - A string that we don't want to contain any HTML or special characters.
 * @return {string} - A string that properly escapes any HTML and special characters.
 */

module.exports = (str) => {
  return charMap.reduce((p, c) => p.replace(...c), str)
}
