# GitHub Pull Request label management

Unnoficial extension to add or remove labels to PRs.

## Usages

- Add a label to indicate whether or not a CI build succeeded
- Add a label to indicate that a build is being processed

## Requirements

- Only use in PR builds
- Repository is hosted in GitHub
- Labels are already defined in GitHub. This extension only applies them.

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
