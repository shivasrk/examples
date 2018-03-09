// if you haven't yet install the Flex.io JS SDK, you'll need to do that
// before running this script. To do so, run `npm install flexio-sdk-js`.
var Flexio = require('flexio-sdk-js')

// insert your API key here to use the Flex.io JS SDK with your account
Flexio.setup('YOUR_API_KEY')

// This is the Flex.io pipe which encapsulates all of the logic
// required to read the CSV files and output them to Elasticsearch
var pipe = Flexio.pipe()
  .list('/tutorial-dropbox/es/*.csv')
    .foreach('file : input',
       Flexio.pipe()
         .read('${file.path}')
         .convert('csv','table')
         .write('/tutorial-elasticsearch/${file.name}')
    )

// You may save this pipe to your Flex.io account, which enables a pipe endpoint to be called using an alias, via our
// REST API or cURL. Note that the alias `examples-batch-csv-to-elasticsearch` below needs to be replaced
// with your own alias in order to save this pipe to your account (e.g. `{username}-batch-csv-to-elasticsearch`)
pipe.save({
  name: 'Copy CSV files to Elasticsearch',
  ename: 'examples-batch-csv-to-elasticsearch'
})
