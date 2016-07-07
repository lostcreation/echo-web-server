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

test("Testing single-character replacing.", (t) => {
  charTests.forEach(([toTest, expected]) => {
    t.equal(escape(toTest), expected, `'${toTest}' should be replaced with '${expected}'`)
  })
  t.end()
})
