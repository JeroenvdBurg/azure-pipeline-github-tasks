# Azure DevOps pipeline tasks for GitHub

Tasks to manage labels in a GitHub pull request from Azure DevOps Pipeline.

## Usage

- Add a label to indicate whether or not a CI build succeeded
- Add a label to indicate that a build is being processed

## Requirements

- Only for PR triggered builds `condition: eq(variables['Build.Reason'], 'PullRequest')`
- Source code repository is hosted in GitHub
- Labels must already be defined in GitHub. This extension only applies them.

## Examples

### Adding a label

```yaml
- task: fbeltrao.GitHubPRLabel.custom-build-release-task.GitHubPRLabel@0
  condition: eq(variables['Build.Reason'], 'PullRequest') # only run step if it is a PR
  displayName: 'GitHub PR label (add ci-succeeded)'
  inputs:
    action: 'add'
    gitHubConnection: myGitHubConnection
    label: ci-succeeded
```

### Removing a label

```yaml
- task: fbeltrao.GitHubPRLabel.custom-build-release-task.GitHubPRLabel@0
  condition: eq(variables['Build.Reason'], 'PullRequest') # only run step if it is a PR
  displayName: 'GitHub PR label (remove ci-succeeded)'
  inputs:
    action: 'remove'
    gitHubConnection: myGitHubConnection
    label: ci-succeeded
```

### Checking if a label exists using bash

```yaml
  # Find out if full ci is enabled for Pull Request validation
  - bash: |
     echo "Looking for label at https://api.github.com/repos/$BUILD_REPOSITORY_ID/issues/$SYSTEM_PULLREQUEST_PULLREQUESTNUMBER/labels"
     if curl -s "https://api.github.com/repos/$BUILD_REPOSITORY_ID/issues/$SYSTEM_PULLREQUEST_PULLREQUESTNUMBER/labels" | grep '"name": "fullci"'
     then
       echo "##vso[task.setvariable variable=prWithCILabel;isOutput=true]true"
       echo "fullci label found!"
     fi
    displayName: Check for CI label build on PR
    condition: eq(variables['Build.Reason'], 'PullRequest')
    name: checkPrCILabel
```