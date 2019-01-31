#!/bin/bash
tsc -p GitHubPRLabel/ && tfx extension create --manifest-globs GitHubPRLabelManifest.json