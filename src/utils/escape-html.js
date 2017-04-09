'use strict'

const map = // [[regexp of character(s) to match, entity to replace with]]
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
 * @return {string} - The original string, properly escaped.
 */
module.exports = (str) => {
  return map.reduce((p, c) => p.replace(...c), str)
}
