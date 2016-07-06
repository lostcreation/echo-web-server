const escape = require('../../../src/utils/escape-html.js')
const test   = require('blue-tape')

const charTests = // [[ toTest, expected ]]
  [ ['&', '&amp;'  ]
  , ['>', '&gt;'   ]
  , ['<', '&lt;'   ]
  , ['"', '&quot;' ]
  , ["'", '&apos;' ]
  , ['`', '&grave;']
  ]

charTests.forEach(([toTest, expected]) => {
  test((t) => {
    t.equal(escape(toTest), expected, `'${toTest}' should be replaced with '${expected}'`)
    t.end()
  })
})
