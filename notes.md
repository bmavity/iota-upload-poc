
Baseline starts with setup described here
https://github.com/verekia/js-stack-from-scratch/blob/master/tutorial/02-babel-es6-eslint-flow-jest-husky.md#readme


Removed node_modules/protobufjs/src/bower.json due to flow error causing commit to fail. Will explore this later as it will cause issues for people downloading.

Had to add babel-preset-stage-0 to allow for state = {} functionality in classes.

To load css
https://github.com/webpack-contrib/css-loader

Need an iota.wallet.config
