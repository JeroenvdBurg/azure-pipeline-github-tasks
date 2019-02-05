#!/bin/bash
npm install && tsc -p ./task && tfx extension create --manifest-globs vss-extension.json