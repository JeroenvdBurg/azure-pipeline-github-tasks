# Azure DevOps pipeline tasks for GitHub

Tasks to manage labels in a GitHub pull request from Azure DevOps Pipeline.

this extension is based on https://github.com/fbeltrao/prvalidationci

## Usage

- Add a label to indicate whether or not a CI build succeeded
- Add a label to indicate that a build is being processed
- read labels from a PR 

## Requirements

- Only for PR triggered builds `condition: eq(variables['Build.Reason'], 'PullRequest')`
- Source code repository is hosted in GitHub
- Labels must already be defined in GitHub. This extension only applies them.

## Examples

see devops pipeline: https://signatoryrocket.visualstudio.com/GithubPRLabels/_build?definitionId=5

### Adding a label

```yaml
- task: githubprlabels
  condition: eq(variables['Build.Reason'], 'PullRequest') # only run step if it is a PR
  displayName: 'GitHub PR label (add ci-succeeded)'
  inputs:
    action: 'add'
    gitHubConnection: myGitHubConnection
    label: ci-succeeded
```

### Removing a label

```yaml
- task: githubprlabels
  condition: eq(variables['Build.Reason'], 'PullRequest') # only run step if it is a PR
  displayName: 'GitHub PR label (remove ci-succeeded)'
  inputs:
    action: 'remove'
    gitHubConnection: myGitHubConnection
    label: ci-succeeded
```

### List labels in PR and save to pipeline variable

```yaml
- task: githubprlabels
  condition: eq(variables['Build.Reason'], 'PullRequest') # only run step if it is a PR
  displayName: 'GitHub PR label'
  inputs:
    action: 'list'
    gitHubConnection: myGitHubConnection
    variable: 'myLabels'
```
