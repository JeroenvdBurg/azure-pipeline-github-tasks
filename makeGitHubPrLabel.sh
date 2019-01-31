#!/bin/bash
tsc -p GitHubPRLabel/ && tfx extension create --manifest-globs extensionManifest.json