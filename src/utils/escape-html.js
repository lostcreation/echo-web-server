const specialCharacters = // [[regexp of character to match, entity to replace with]]
  [ [/&/g  , '&amp;']
  , [/>/g  , '&gt;']
  , [/</g  , '&lt;']
  , [/"/g  , '&quot;']
  , [/'/g  , '&apos;'] // '&#39;'
  , [/\`/g , '&grave;'] // '&#96;'
  ]

/**
 * Properly escapes HTML tags and special characters to prevent mischief.
 * @param {string} str - A string that we don't want to contain any HTML.
 * @return {string} - A string that no longer contains any HTML.
 */
module.exports = (str) => {
  return specialCharacters.reduce((p, c) => p.replace(...c), str)
}
